"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/ui/footer";

export default function GAWebsiteGuide() {
  const websites = [
    {
      title: "官方網站",
      url: "https://www.gatcg.com/",
      description:
        "查規則、最新商品、設計者筆記、B&R 清單與官方賽事資訊的首選網站。也能搜尋關鍵字找出規則細節。",
    },
    {
      title: "Omnidex",
      url: "https://omni.gatcg.com/",
      description:
        "報名比賽、查戰績、送卡表、看Leaderboard與資格套賽積分的官方賽事系統。還能找店家與活動資訊。",
    },
    {
      title: "Luxera's Map",
      url: "https://luxerasmap.com/",
      description:
        "提供清楚排版的大型賽事Top 8卡表與英雄統計，適合查歷史比賽資料。更新速度較慢。",
    },
    {
      title: "Fractal of Insight",
      url: "https://fractalofin.site/",
      description:
        "收錄各地大小賽事卡表與統計資料，包含Meta使用率、對局勝率分析與相似卡組推薦，是最全面的卡組資料庫。",
    },
    {
      title: "Silvie.gg",
      url: "https://silvie.gg/",
      description:
        "強大非官方統計網站，含圓餅圖、英雄與聖遺物使用率，還有Creator影片與最新卡表整合，非常適合觀察環境趨勢。",
    },
    {
      title: "Silvie.org",
      url: "https://silvie.org/",
      description:
        "非官方組牌網站，可搜尋卡牌並建立Main/Material/Side，支援匯出卡表到Omnidex與TTS。",
    },
    {
      title: "Shout At Your Decks",
      url: "https://shoutatyourdecks.com/",
      description:
        "另一個可用來組牌的網站，已支援HVN新牌，搜尋與加卡功能直覺。",
    },
    {
      title: "TCG Player",
      url: "https://www.tcgplayer.com/",
      description:
        "查詢英文卡牌價格與交易的美國主流平台，支援歷史成交價格與價格走勢圖。",
    },
  ];

  return (
    <>
      <main className="relative min-h-screen text-white font-sans">
        <div className="fixed inset-0 z-[-2]">
          <Image
            src="/extricatingTouch-bg.png"
            alt="Background"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 space-y-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#F28C7C] drop-shadow mb-4">
            GA 實用網站導覽
          </h1>
          <p className="text-center text-white max-w-6xl mx-auto pt-4">
            如果你是剛入坑的 Grand Archive
            玩家，或是想要快速掌握環境資訊、組牌工具與卡價查詢，那這些網站一定不能錯過！
          </p>

          <div className="aspect-video max-w-4xl mx-auto">
            <iframe
              src="https://www.youtube.com/embed/Vc696V6v-OM?si=QMfMhzY8LuzQBqe-"
              title="GA實用網站導覽影片"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl border border-white/10"
            />
          </div>

          <ul className="space-y-8">
            {websites.map((site) => (
              <li
                key={site.title}
                className="bg-[#1a1a1a]/90 border border-[#ffffff22] rounded-2xl px-6 py-4 hover:border-[#F28C7C] transition cursor-pointer"
              >
                <Link
                  href={site.url}
                  target="_blank"
                  className="block w-full h-full"
                >
                  <h2 className="text-xl font-bold text-[#F28C7C] mb-2">
                    {site.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {site.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
