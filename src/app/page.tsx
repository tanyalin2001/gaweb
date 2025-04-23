'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="text-white font-sans">

      {/* 全頁背景 */}
      <div className="fixed inset-0 -z-50">
        <Image src="/shira-bg.png" alt="Background" fill className="object-cover brightness-50" priority />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* HERO 區塊 */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-16">
        <div className="text-center max-w-4xl mx-auto z-[1]">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-white drop-shadow-xl mb-6"
          >
            Spark your <span className="text-[#F28C7C]">Archive Adventure</span>
          </motion.h1>
          <p className="text-base md:text-lg text-gray-300 mb-10">
            A stylish portal for deck tech, meta shifts, and creative chaos — all things Grand Archive.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/register">
              <button className="bg-[#F28C7C] text-black px-6 py-3 rounded-full font-bold text-lg shadow-md hover:scale-105 hover:bg-[#f6a999] transition">
                Join Now
              </button>
            </Link>
            <Link href="/guide">
              <button className="border border-[#F28C7C] text-[#F28C7C] px-6 py-3 rounded-full font-bold text-lg hover:bg-[#F28C7C] hover:text-black transition">
                Beginner Guide
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="py-20 px-6 md:px-16 bg-black/70 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F28C7C] mb-12 text-center">🔥 Featured Decks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {["Fractal of Rain", "Creative Shock", "Snow Fairy"].map((name, i) => (
              <motion.div 
                key={i} 
                className="bg-[#1a1a1a]/90 rounded-2xl overflow-hidden border border-neutral-600 hover:shadow-xl hover:scale-[1.015] transition-all"
                whileHover={{ y: -4 }}
              >
                <Image
                  src={`/cards/${name.toLowerCase().replace(/\s/g, '-')}.jpg`}
                  alt={name}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#F28C7C] mb-1">{name}</h3>
                  <p className="text-sm text-gray-400">Deck Highlight</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 md:px-16 bg-black/70 backdrop-blur">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="/photos/community-event.jpg"
            alt="About"
            width={640}
            height={400}
            className="rounded-xl shadow-xl object-cover"
          />
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#F28C7C]">About SparkGA</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Built by players, for players — SparkGA is where the Grand Archive community gathers to learn, create, and compete.
            </p>
            <Link href="/info" className="text-[#F28C7C] underline hover:text-[#f6a999] text-base font-semibold">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="py-24 px-6 md:px-16 bg-black/70 backdrop-blur text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-[#F28C7C] mb-4">🎥 Video Highlights</h2>
          <p className="text-gray-400 mb-8 text-lg">Unboxings, breakdowns, and brutal matchups — fresh from our channel.</p>
          <div className="flex justify-center">
            <Image
              src="/logos/sparkga-avatar.jpg"
              alt="YouTube"
              width={220}
              height={220}
              className="rounded-full shadow-xl border-4 border-[#F28C7C] object-cover"
            />
          </div>
          <Link
            href="https://youtube.com/@sparklesislife"
            target="_blank"
            className="inline-block mt-6 bg-[#F28C7C] text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-[#f6a999] transition"
          >
            Visit Channel
          </Link>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 px-6 md:px-16 bg-gradient-to-br from-[#F28C7C] to-[#e67462] text-black text-center">
        <h2 className="text-4xl font-black mb-4">Ready to Spark the Game?</h2>
        <p className="text-lg mb-6">Join tournaments, share your builds, and grow with the community.</p>
        <Link href="/register">
          <button className="bg-black text-[#F28C7C] font-bold px-8 py-3 rounded-full text-lg hover:bg-[#222] hover:text-[#f6a999] transition">
            Join SparkGA
          </button>
        </Link>
      </section>
    </main>
  );
}
