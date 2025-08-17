
"use client";

import HeroBanner from "../components/HeroBanner";
import { SITE_VERSION } from "../siteVersion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-2 py-8 sm:px-4 sm:py-12">
      <HeroBanner />
      <section className="w-full max-w-2xl text-center space-y-6 mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
          RocketMobster Software
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-300">
          Building modern, nerdy, and fun software for creators, hobbyists, and small businesses. Explore our apps, join the community, and check out our AI art gallery!
        </p>
      </section>
      <section className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-in delay-100">
        <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow hover:scale-105 transition-transform">
          <span className="text-2xl mb-2">🛠️</span>
          <h3 className="font-bold text-lg mb-1">App Highlights</h3>
          <p className="text-gray-400 text-sm">Discover our latest tools and projects for mobile and web.</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow hover:scale-105 transition-transform">
          <span className="text-2xl mb-2">🎨</span>
          <h3 className="font-bold text-lg mb-1">AI Art Gallery</h3>
          <p className="text-gray-400 text-sm">Browse and filter unique AI-generated art from the community.</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow hover:scale-105 transition-transform">
          <span className="text-2xl mb-2">🤖</span>
          <h3 className="font-bold text-lg mb-1">Join the Community</h3>
          <p className="text-gray-400 text-sm">Connect on Discord, get early access, and share feedback.</p>
        </div>
      </section>
      <footer className="mt-8 text-gray-400 text-sm animate-fade-in delay-200">
        &copy; {new Date().getFullYear()} RocketMobster Software. All rights reserved. <span className="ml-2">Site version {SITE_VERSION}</span>
      </footer>
    </main>
  );
}
