
import { useRef, useState, useEffect } from "react";
import { GalleryImage } from "../types/gallery";


interface GalleryImageCardProps {
  item: GalleryImage;
}

export default function GalleryImageCard({ item }: GalleryImageCardProps) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Accessibility: add alt text, lazy loading, and ARIA roles
  const handleMouseEnter = () => {
    if (item.type === "video") {
      setIsPreviewing(true);
      videoRef.current?.play();
    }
  };
  const handleMouseLeave = () => {
    if (item.type === "video") {
      setIsPreviewing(false);
      videoRef.current?.pause();
      videoRef.current?.currentTime && (videoRef.current.currentTime = 0);
    }
  };
  const handleTouchStart = () => {
    if (item.type === "video") {
      setIsPreviewing(true);
      videoRef.current?.play();
    }
  };
  const handleTouchEnd = () => {
    if (item.type === "video") {
      setIsPreviewing(false);
      videoRef.current?.pause();
      videoRef.current?.currentTime && (videoRef.current.currentTime = 0);
    }
  };

  // Limit preview to 5 seconds
  useEffect(() => {
    if (item.type !== "video" || !isPreviewing || !videoRef.current) return;
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      if (video.currentTime >= 3) {
        video.pause();
        video.currentTime = 0;
        setIsPreviewing(false);
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isPreviewing, item.type]);
  return (
    <div
      className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer group transition-transform hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      aria-label={item.title}
      role="button"
    >
      {item.type === "image" ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
          loading="lazy"
        />
      ) : (
        <div className="relative w-full h-48 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={item.videoUrl}
            poster={item.thumbnailUrl || item.imageUrl}
            className="w-full h-48 object-cover rounded"
            muted
            loop
            playsInline
            style={{ display: isPreviewing ? "block" : "none" }}
            tabIndex={-1}
            aria-label={item.title}
          />
          {!isPreviewing && (
            <img
              src={item.thumbnailUrl || item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover rounded opacity-80"
              loading="lazy"
            />
          )}
          <span className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded">Video</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2">
        <div className="font-bold text-white text-lg truncate">{item.title}</div>
        <div className="text-xs text-blue-200 truncate">{item.artist}</div>
      </div>
    </div>
  );
  };
