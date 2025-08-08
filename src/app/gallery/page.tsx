"use client";

// --- GALLERY PAGE MARKER CONFIG ---
// TODO: In the future, these options should be settable via the admin panel UI.
// Admin should be able to choose:
// - showPageMarkers: true/false (show nothing or show a marker)
// - pageMarkerStyle: "arrow" | "line" | "tick" (choose marker type)
// - showPageCount: true/false (show or hide page number label with marker)
// These options are currently hardcoded for demo/testing.
import React from "react";
// Gallery UI config (to be controlled by admin panel in the future)
const galleryUIConfig = {
  showPageMarkers: true, // Set to false for no markers
  pageMarkerStyle: "arrow" as "arrow" | "line" | "tick", // Marker type: "arrow", "line", or "tick"
  showPageCount: true, // Set to false to hide page count label
};
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import GalleryImageCard from "../../components/GalleryImageCard";
import GalleryModal from "../../components/GalleryModal";
import { galleryImages } from "../../data/galleryImages";
import { AnimatePresence, motion } from "framer-motion";

// TODO: In the future, galleryPagingMode will be set from the admin panel/backend
type PagingMode = 'infinite' | 'pagination';
const galleryPagingMode: PagingMode = 'infinite'; // default

function GalleryPage() {
  // Scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress effect
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);
  const [sort, setSort] = useState("newest");
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  // For pagination mode
  const [page, setPage] = useState(1);
  const pageSize = 9;
  // For infinite scroll
  const [infiniteCount, setInfiniteCount] = useState(pageSize);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const allTags = useMemo(() => Array.from(new Set(galleryImages.flatMap(img => img.tags))), []);
  const allArtists = useMemo(() => Array.from(new Set(galleryImages.map(img => img.artist))), []);

  const filtered = useMemo(() => {
    let imgs = galleryImages;
    if (selected !== "All") imgs = imgs.filter(img => img.category === selected);
    if (tag) imgs = imgs.filter(img => img.tags.includes(tag));
    if (artist) imgs = imgs.filter(img => img.artist === artist);
    if (search) {
      const s = search.toLowerCase();
      imgs = imgs.filter(img => img.title.toLowerCase().includes(s) || img.description.toLowerCase().includes(s));
    }
    if (sort === "newest") imgs = imgs.slice().sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "oldest") imgs = imgs.slice().sort((a, b) => a.date.localeCompare(b.date));
    return imgs;
  }, [selected, tag, artist, search, sort]);

  // Infinite scroll effect
  useEffect(() => {
    if (galleryPagingMode !== 'infinite') return;
    const current = loadMoreRef.current;
    if (!current) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInfiniteCount((count) => Math.min(filtered.length, count + pageSize));
        }
      },
      { threshold: 1 }
    );
    observer.observe(current);
    return () => {
      observer.disconnect();
    };
  }, [filtered.length, galleryPagingMode, pageSize, loadMoreRef.current]);

  const pagedImages = useMemo(() => {
    if (galleryPagingMode === 'pagination') {
      const start = (page - 1) * pageSize;
      return filtered.slice(start, start + pageSize);
    }
    // Infinite mode: show up to infiniteCount
    return filtered.slice(0, infiniteCount);
  }, [filtered, galleryPagingMode, page, pageSize, infiniteCount]);

  const openModal = (idx: number) => setModalIdx(idx);
  const closeModal = () => setModalIdx(null);
  const showPrev = () => setModalIdx((idx) => (idx !== null ? (idx - 1 + filtered.length) % filtered.length : null));
  const showNext = () => setModalIdx((idx) => (idx !== null ? (idx + 1) % filtered.length : null));


  // Swipe support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (modalIdx !== null) {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") closeModal();
    }
  };

  return (
    <main
      className="container mx-auto py-8 px-2"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="main"
      aria-label="AI Art Gallery Main Content"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400 drop-shadow">AI Art Gallery</h1>
      <div className="flex flex-wrap gap-2 justify-center mb-4" role="tablist" aria-label="Gallery Categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full font-semibold border transition-colors text-sm ${selected === cat ? "bg-blue-600 text-white border-blue-400" : "bg-gray-900 text-blue-300 border-gray-700 hover:bg-blue-800 hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm focus:outline-none focus:ring focus:border-blue-400"
        />
        <select value={tag ?? ""} onChange={e => setTag(e.target.value || null)} className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm">
          <option value="">All Tags</option>
          {allTags.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={artist ?? ""} onChange={e => setArtist(e.target.value || null)} className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm">
          <option value="">All Artists</option>
          {allArtists.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {/* Scroll progress bar and arrows */}
      <div className="fixed left-2 top-1/4 z-40 flex flex-col items-center" style={{height: '50vh'}}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`mb-2 p-1 rounded-full bg-gray-800 text-white shadow transition ${scrollProgress > 0.01 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}
          aria-label="Scroll to top"
        >
          ↑
        </button>
        <div className="w-2 h-full bg-gray-700 rounded-full relative flex items-end">
          <div
            className="bg-blue-400 rounded-full w-2 absolute bottom-0 left-0"
            style={{ height: `${Math.round(scrollProgress * 100)}%`, transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </div>
        <button
          onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
          className={`mt-2 p-1 rounded-full bg-gray-800 text-white shadow transition ${scrollProgress < 0.99 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}
          aria-label="Scroll to bottom"
        >
          ↓
        </button>
      </div>
      <AnimatePresence>
        <motion.div
          key={pagedImages.length}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          role="grid"
          aria-label="Gallery Images"
        >
          {pagedImages.map((img, idx) => {
            // Insert a marker row after every pageSize images, except after the last image
            const markerNeeded = galleryUIConfig.showPageMarkers && (idx + 1) % pageSize === 0 && idx !== pagedImages.length;
            const pageNum = Math.floor(idx / pageSize) + 1;
            const totalPages = Math.ceil(filtered.length / pageSize);
            return [
              // Gallery image card
              <motion.div
                key={img.title + '-' + idx}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => openModal(galleryPagingMode === 'pagination' ? (page - 1) * pageSize + idx : idx)}
                tabIndex={0}
                role="gridcell"
                aria-label={`Open details for ${img.title}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') openModal(galleryPagingMode === 'pagination' ? (page - 1) * pageSize + idx : idx);
                }}
              >
                <GalleryImageCard item={img} />
              </motion.div>,
              // Page marker row (full width, between image rows)
              markerNeeded && (
                <div
                  key={`page-marker-${idx}`}
                  className="col-span-full flex justify-center items-center my-2"
                >
                  {/* Render marker style and page count label based on config */}
                  {galleryUIConfig.pageMarkerStyle === "line" && (
                    <>
                      <div className="h-8 w-1 bg-white rounded-full opacity-70 shadow-lg mx-2" title="Page End" />
                      {galleryUIConfig.showPageCount && (
                        <span className="ml-2 text-xs text-white bg-gray-900 bg-opacity-70 px-2 py-0.5 rounded shadow mt-1">
                          Page {pageNum + 1} of {totalPages}
                        </span>
                      )}
                    </>
                  )}
                  {(galleryUIConfig.pageMarkerStyle === "arrow" || galleryUIConfig.pageMarkerStyle === "tick") && (
                    <div className="flex flex-col items-center">
                      {galleryUIConfig.showPageCount && (
                        <span className="mb-0.5 text-xs text-white bg-gray-900 bg-opacity-70 px-2 py-0.5 rounded shadow">
                          Page {pageNum + 1} of {totalPages}
                        </span>
                      )}
                      <span
                        className="text-white text-2xl drop-shadow-lg opacity-80 select-none"
                        title="Page End"
                        aria-label="Page End"
                      >
                        {galleryUIConfig.pageMarkerStyle === "arrow" ? "↓" : "✓"}
                      </span>
                    </div>
                  )}
                </div>
              )
            ];
          })}
        </motion.div>
      </AnimatePresence>
      {/* Infinite scroll sentinel */}
      {galleryPagingMode === 'infinite' && pagedImages.length < filtered.length && (
        <div ref={loadMoreRef} className="h-12 flex items-center justify-center text-blue-400 font-bold animate-pulse">
          Loading more...
        </div>
      )}

      {/* Pagination controls (only show if pagination mode) */}
      {galleryPagingMode === 'pagination' && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-blue-400 font-bold">Page {page}</span>
          <button
            onClick={() => setPage((p) => (p * pageSize < filtered.length ? p + 1 : p))}
            disabled={page * pageSize >= filtered.length}
            className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      <GalleryModal
        open={modalIdx !== null}
        image={modalIdx !== null ? filtered[modalIdx] : undefined}
        onClose={closeModal}
        onPrev={showPrev}
        onNext={showNext}
      />
    </main>
  );
}

export default GalleryPage;
