"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black backdrop-blur-md border-t border-white/10 text-white z-10">
      {/* 頂部亮線（可選） */}
      <div className="h-[2px] bg-gradient-to-r from-[#f28c7c]/0 via-[#f28c7c] to-[#f28c7c]/0" />

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-6 text-center">
        {/* 社群連結 */}
        <div className="flex flex-wrap justify-center gap-6 text-2xl">
          <SocialLink
            href="https://facebook.com/profile.php?id=61557528853813"
            icon={<FaFacebook />}
            label="Facebook"
          />
          <SocialLink
            href="https://instagram.com/sparkle_sis_life"
            icon={<FaInstagram />}
            label="Instagram"
          />
          <SocialLink
            href="https://x.com/TheSparkleSis"
            icon={<FaTwitter />}
            label="X"
          />
          <SocialLink
            href="https://youtube.com/@sparklesislife"
            icon={<FaYoutube />}
            label="YouTube"
          />
        </div>

        {/* 頁尾資訊 */}
        <p className="text-white/70 text-sm">
          © 2025 SparkleGA — Grand Archive 中文社群資源平台
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center gap-2 hover:text-[#F28C7C] transition duration-200"
    >
      <span className="text-[#F28C7C] text-xl">{icon}</span>
      <span className="text-base">{label}</span>
    </Link>
  );
}
