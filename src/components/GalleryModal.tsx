"use client";


import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";


import { GalleryImage } from "../types/gallery";

interface GalleryModalProps {
  open: boolean;
  image?: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}



export default function GalleryModal({ open, image, onClose, onPrev, onNext }: GalleryModalProps) {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    trackMouse: true,
  });

  if (!image) return null;

  // Accessibility: trap focus in modal, close on Escape, ARIA roles
  // (For full focus trap, consider a11y libraries in production)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  };

  const handleDownload = () => {
    const url = image.type === "video" ? image.videoUrl : image.imageUrl;
    if (!url) return;
    const ext = image.type === "video" ? ".mp4" : ".jpg";
    const link = document.createElement("a");
    link.href = url;
    link.download = image.title.replace(/\s+/g, "_") + ext;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          {...swipeHandlers}
        >
          <div
            className="relative bg-gray-900 rounded-xl shadow-2xl p-4 sm:p-8 max-w-lg w-full flex flex-col items-center"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label={image.title}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white text-2xl bg-gray-800 rounded-full p-1 hover:bg-red-600 focus:outline-none"
              aria-label="Close"
            >
              ×
            </button>
            <div className="w-full flex flex-col items-center">
              {image.type === "image" ? (
                <Image
                  src={image.imageUrl || ""}
                  alt={image.title}
                  width={480}
                  height={320}
                  className="rounded-lg max-h-80 w-auto object-contain mb-4"
                  loading="lazy"
                />
              ) : (
                <video
                  ref={undefined}
                  src={image.videoUrl}
                  poster={image.thumbnailUrl || image.imageUrl}
                  controls
                  className="rounded-lg max-h-80 w-auto object-contain mb-4"
                  aria-label={image.title}
                />
              )}
              <h3 className="text-xl font-bold text-blue-300 mb-2">{image.title}</h3>
              <p className="text-gray-300 mb-2 text-center">{image.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {image.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-800 text-blue-200 rounded-full text-xs">{tag}</span>
                ))}
              </div>
              <div className="text-sm text-gray-400 mb-2">By {image.artist} • {new Date(image.date).toLocaleDateString()}</div>
              <div className="flex gap-4 mt-2">
                <button onClick={onPrev} aria-label="Previous" className="text-white text-2xl hover:text-blue-400">←</button>
                <button onClick={onNext} aria-label="Next" className="text-white text-2xl hover:text-blue-400">→</button>
                <button onClick={handleDownload} aria-label="Download" className="text-white text-xl hover:text-green-400">⤓</button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: image.title, url: image.type === "video" ? image.videoUrl : image.imageUrl });
                    } else {
                      window.open(image.type === "video" ? image.videoUrl : image.imageUrl, '_blank');
                    }
                  }}
                  aria-label="Share"
                  className="text-white text-xl hover:text-blue-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 inline">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M8.93 8.93l.01.01M15.07 8.93l.01.01M15.07 15.07l.01.01M8.93 15.07l.01.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
