import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RocketMobster Software",
  description: "Building modern, nerdy, and fun software for creators, hobbyists, and small businesses.",
  icons: {
    icon: [
      { url: '/favicon.ico' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full bg-gray-950/90 border-b border-gray-800 shadow-lg sticky top-0 z-50">
          <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
            <Link href="/rocketmob-web/" className="text-2xl font-extrabold tracking-tight text-pink-400 hover:text-pink-300 transition-colors">
              🚀 RocketMobster
            </Link>
            <ul className="flex gap-4 md:gap-8 text-lg font-semibold">
              <li><Link href="/rocketmob-web/apps" className="hover:text-pink-400 transition-colors">Apps</Link></li>
              <li><Link href="/rocketmob-web/gallery" className="hover:text-blue-400 transition-colors">Gallery</Link></li>
              <li><Link href="/rocketmob-web/captains-log" className="hover:text-green-400 transition-colors">The Captain&apos;s Log</Link></li>
              <li><Link href="/rocketmob-web/about" className="hover:text-yellow-400 transition-colors">About</Link></li>
              <li><Link href="/rocketmob-web/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
              <li><Link href="/rocketmob-web/admin" className="hover:text-red-400 transition-colors">Admin</Link></li>
            </ul>
          </nav>
        </header>
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
