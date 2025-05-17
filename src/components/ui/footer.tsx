"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black py-10 border-t border-white/10 text-white text-center text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
        {/* 社群連結 */}
        <div className="flex flex-wrap justify-center gap-6 text-xl">
          <Link
            href="https://facebook.com/profile.php?id=61557528853813"
            target="_blank"
            className="hover:text-[#F28C7C] flex items-center gap-2"
          >
            <FaFacebook className="text-[#F28C7C]" />
            Facebook
          </Link>
          <Link
            href="https://instagram.com/sparkle_sis_life"
            target="_blank"
            className="hover:text-[#F28C7C] flex items-center gap-2"
          >
            <FaInstagram className="text-[#F28C7C]" />
            Instagram
          </Link>
          <Link
            href="https://x.com/TheSparkleSis"
            target="_blank"
            className="hover:text-[#F28C7C] flex items-center gap-2"
          >
            <FaTwitter className="text-[#F28C7C]" />X
          </Link>
          <Link
            href="https://youtube.com/@sparklesislife"
            target="_blank"
            className="hover:text-[#F28C7C] flex items-center gap-2"
          >
            <FaYoutube className="text-[#F28C7C]" />
            YouTube
          </Link>
        </div>

        {/* 頁尾資訊 */}
        <p className="text-white/70 mt-4">
          © 2025 SparkleGA — Grand Archive 中文社群資源平台
        </p>
      </div>
    </footer>
  );
}
