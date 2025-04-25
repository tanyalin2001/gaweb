"use client";

import GuideLayout from "../layout";
import Image from "next/image";

export default function ClassesPage() {
  return (
    <GuideLayout>
      <section className="space-y-10">
        <h2 className="text-3xl font-bold text-[#F28C7C]">英雄介紹</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Lorraine",
              image: "lorraine.png",
              desc: "劍術與正義的化身，從戰場與靈魂中汲取力量，是劍士中的領導者。",
            },
            {
              name: "Zander",
              image: "zander.png",
              desc: "冷靜沉著的刺客，擅長預判與瞬間消失，總是比敵人早一步行動。",
            },
            {
              name: "Allen",
              image: "allen.png",
              desc: "音樂與野獸的朋友，能以旋律召喚各種動物並與其並肩作戰。",
            },
            {
              name: "Arisanna",
              image: "arisanna.png",
              desc: "沉迷鍊金與實驗的學者，擁有強大藥劑與毒物的操控能力。",
            },
            {
              name: "Diana",
              image: "diana.png",
              desc: "熱血的年輕獵人，弓箭與火力武裝並用，是遠距壓制專家。",
            },
            {
              name: "Diao Chan",
              image: "diao-chan.png",
              desc: "美貌與命運交纏的牧師，試圖超越外表與命運展現真正的實力。",
            },
            {
              name: "Jin",
              image: "jin.png",
              desc: "理性卻決絕的戰士，為了命運與所愛之人而選擇踏上成神之路。",
            },
            {
              name: "Kongming",
              image: "kongming.png",
              desc: "總想證明自己的軍師型法師，在三國的陰影中釋放禁忌的力量。",
            },
            {
              name: "Mordred",
              image: "mordred.png",
              desc: "劍術狂人，講求極致技巧與效率，用連擊壓制對手反應。",
            },
            {
              name: "Nico",
              image: "nico.png",
              desc: "攻守兼備的女王副官，以魅惑與皮鞭控制敵人與群眾。",
            },
            {
              name: "Polkhawk",
              image: "polkhawk.png",
              desc: "熱愛爆炸的火砲狂人，以砲火毀滅戰場並享受美學。",
            },
            {
              name: "Rai",
              image: "rai.png",
              desc: "魔法天才少年，擅長穩紮穩打，累積強大法術爆發。",
            },
            {
              name: "Silvie",
              image: "silvie.png",
              desc: "與動物有天然連結的少女，能召喚各地神獸共同作戰。",
            },
            {
              name: "Tonoris",
              image: "tonoris.png",
              desc: "歷經滄桑的守護者，願為同伴承受一切，強硬而不屈。",
            },
            {
              name: "Tristan",
              image: "tristan.png",
              desc: "冷血刺客，為金而殺，等待一擊必殺的最完美時機。",
            },
            {
              name: "Vanitas",
              image: "vanitas.png",
              desc: "神秘領袖，以言語魅力與力量收服他人，是最大的不確定因子。",
            },
          ].map((champ) => (
            <div
              key={champ.name}
              className="p-6 rounded-2xl transition duration-300 transform hover:scale-[1.02]"
            >
              <div className="h-[360px] flex items-center justify-center">
                <Image
                  src={`/champions/${champ.image}`}
                  alt={champ.name}
                  width={400}
                  height={360}
                  className="object-contain max-h-full w-auto mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-white text-center mt-4">
                {champ.name}
              </h3>
              <p className="text-gray-300 text-sm text-center mt-2">
                {champ.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </GuideLayout>
  );
}
