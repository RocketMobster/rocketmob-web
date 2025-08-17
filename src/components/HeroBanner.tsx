"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// TODO: Integrate this hero image rotator with the admin backend.
// Features to support:
//   - Add and remove slides (text or image background)
//   - Edit slide text, styling, and order
//   - Use images as slide backgrounds
//   - Control rotation speed
//   - Toggle slide markers (dots) and select marker style
//
// Consider making all slide content, order, and settings editable via admin UI.
//
// TODO: Consider a homepage editor in the admin backend for easy content changes using blocks (text, headlines, bullet lists, hero block, etc).

// --- Slide data ---
const banners = [
  {
    type: "image",
    imageSrc: "/rocketmob-web/RocketMobster_Avatar.jpeg",
    alt: "RocketMobster Avatar",
    color: "from-blue-900 to-purple-700",
    title: "RocketMobster Software",
    subtitle: "Innovating at the intersection of fun, creativity, and technology.",
  },
  {
    type: "emoji",
    title: "Welcome to RocketMobster Software!",
    subtitle: "Fun, nerdy, and modern apps for creators and hobbyists.",
    color: "from-pink-600 to-yellow-400",
    emoji: "🚀",
  },
  {
    type: "emoji",
    title: "Showcase Your Apps!",
    subtitle: "Discover our latest tools and projects for mobile and web.",
    color: "from-blue-600 to-green-400",
    emoji: "🛠️",
  },
  {
    type: "emoji",
    title: "Join Our Community!",
    subtitle: "Connect on Discord, get early access, and share feedback.",
    color: "from-purple-600 to-pink-400",
    emoji: "🤖",
  },
  {
    type: "emoji",
    title: "Explore the AI Art Gallery!",
    subtitle: "Browse and filter unique AI-generated art.",
    color: "from-yellow-400 to-pink-600",
    emoji: "🎨",
  },
  {
    type: "emoji",
    title: "Stay Updated!",
    subtitle: "Read our blog for news, devlogs, and tips.",
    color: "from-green-400 to-blue-600",
    emoji: "📰",
  },
];

// HeroBanner: Animated hero image/text rotator for homepage
// TODO: Refactor to use admin-configurable data and settings
export default function HeroBanner() {
  // Current slide index
  const [index, setIndex] = useState(0);

  // TODO: Make rotation speed configurable via admin backend
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // TODO: Make slide markers (dots) toggleable and style-configurable via admin backend
  return (
    <div className="relative w-full max-w-3xl mx-auto h-48 sm:h-56 md:h-64 mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r ${banners[index].color} shadow-xl text-white p-6 sm:p-10`}
        >
          {banners[index].type === "image" ? (
            <>
              <Image
                src={banners[index].imageSrc || "/RocketMobster_Avatar.jpeg"}
                alt={banners[index].alt || "RocketMobster Avatar"}
                fill
                className="object-cover rounded-2xl object-top md:object-center"
                style={{ objectPosition: 'center 30%' }}
                priority
              />
              {/* Overlay to lighten/grey the image */}
              <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 rounded-2xl z-10" />
              {/* Overlay content from Welcome slide */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg text-center">Nerdy, Creative, and Professional Tools for Every Niche</h2>
              </div>
            </>
          ) : (
            <>
              <span className="text-4xl sm:text-5xl mb-2 animate-bounce drop-shadow">{banners[index].emoji}</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg">{banners[index].title}</h2>
              <p className="text-lg sm:text-xl font-medium drop-shadow-sm">{banners[index].subtitle}</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      {/* Slide indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? "bg-white/90 scale-110" : "bg-white/40"}`}
            style={{ display: "inline-block" }}
          />
        ))}
      </div>
    </div>
  );
}
