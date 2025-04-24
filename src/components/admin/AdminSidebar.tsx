"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "投稿管理", href: "/admin/posts" },
  { label: "公告管理", href: "/admin/info" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 h-screen sticky top-0 left-0 bg-[#1c1c1c] border-r border-[#333] shadow-md p-6 text-white pt-32">
      <h1 className="text-2xl font-bold text-[#F28C7C] mb-8 drop-shadow-sm">
        SparkGA Admin
      </h1>
      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded transition ${
              pathname.startsWith(item.href)
                ? "bg-[#F28C7C]/20 text-[#F28C7C] font-semibold"
                : "text-gray-300 hover:bg-[#333] hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
