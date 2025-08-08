import React from "react";
import Image from "next/image";

// TODO: Make this page editable via the admin backend

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center px-4 py-8 max-w-3xl mx-auto">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl shadow-lg p-8 mb-8 text-white animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">About RocketMobster Software</h1>
        <p className="text-lg mb-4 text-center max-w-2xl">Innovating at the intersection of fun, creativity, and technology.</p>
        <div className="w-32 h-32 relative mb-2">
          {/* Hero image updated */}
          <Image src="/RocketMobster_Avatar.jpeg" alt="RocketMobster Logo" fill className="object-contain rounded-full border-4 border-white" />
        </div>
      </section>

      {/* Main About Section */}
      <section className="w-full mb-8">
        <div className="text-justify text-gray-800 text-lg leading-relaxed bg-white/80 rounded-lg shadow p-6">
          {/* TODO: Replace with real company info via admin backend */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam vitae nisi sit amet lorem accumsan porta. Proin ac dictum erat. Mauris euismod, sapien eu commodo cursus, sapien sapien cursus sapien, euismod euismod sapien sapien euismod.
          </p>
        </div>
      </section>

      {/* Bio Card Section */}
      <section className="w-full flex flex-col items-center">
        <div className="flex flex-row items-center bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-600 rounded-xl shadow-2xl p-6 w-full max-w-2xl animate-fade-in-up border-2 border-blue-400">
          <div className="w-24 h-24 relative mr-8 flex-shrink-0 shadow-lg border-4 border-white rounded-full overflow-hidden">
            {/* Bio image updated */}
            <Image src="/My Head.jpg" alt="Craig Bickford" fill className="object-cover" />
          </div>
          <div className="flex-1 text-justify">
            {/* TODO: Replace with real bio via admin backend */}
            <h2 className="text-2xl font-extrabold mb-1 text-white drop-shadow-lg tracking-wide">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">Craig Bickford</span>
              <span className="text-base text-blue-200 ml-2 font-semibold">(aka RocketMobster)</span>
            </h2>
            <p className="text-blue-100 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
