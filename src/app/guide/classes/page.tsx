"use client";

import GuideLayout from "../layout";
import Image from "next/image";

export default function ClassesPage() {
  return (
    <GuideLayout>
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-[#F28C7C]">英雄介紹</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <Image
              src="/lorraine.png"
              alt="Lorraine"
              width={500}
              height={360}
              className="rounded mb-4 w-full h-60 object-cover"
            />
            <h3 className="text-xl font-bold text-white mb-1">Lorraine</h3>
            <p className="text-gray-300 text-sm">
              劍術與正義的化身，從戰場與靈魂中汲取力量，是劍士中的領導者。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <Image
              src="/zander.png"
              alt="Zander"
              width={500}
              height={360}
              className="rounded mb-4 w-full h-60 object-cover"
            />
            <h3 className="text-xl font-bold text-white mb-1">Zander</h3>
            <p className="text-gray-300 text-sm">
              冷靜沉著的刺客，擅長預判與瞬間消失，總是比敵人早一步行動。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Allen</h3>
            <p className="text-gray-300 text-sm">
              音樂與野獸的朋友，能以旋律召喚各種動物並與其並肩作戰。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Arisanna</h3>
            <p className="text-gray-300 text-sm">
              沉迷鍊金與實驗的學者，擁有強大藥劑與毒物的操控能力。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Diana</h3>
            <p className="text-gray-300 text-sm">
              熱血的年輕獵人，弓箭與火力武裝並用，是遠距壓制專家。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Diao Chan</h3>
            <p className="text-gray-300 text-sm">
              美貌與命運交纏的牧師，試圖超越外表與命運展現真正的實力。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Jin</h3>
            <p className="text-gray-300 text-sm">
              理性卻決絕的戰士，為了命運與所愛之人而選擇踏上成神之路。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Kongming</h3>
            <p className="text-gray-300 text-sm">
              總想證明自己的軍師型法師，在三國的陰影中釋放禁忌的力量。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Mordred</h3>
            <p className="text-gray-300 text-sm">
              劍術狂人，講求極致技巧與效率，用連擊壓制對手反應。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Nico</h3>
            <p className="text-gray-300 text-sm">
              攻守兼備的女王副官，以魅惑與皮鞭控制敵人與群眾。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Polkhawk</h3>
            <p className="text-gray-300 text-sm">
              熱愛爆炸的火砲狂人，以砲火毀滅戰場並享受美學。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Rai</h3>
            <p className="text-gray-300 text-sm">
              魔法天才少年，擅長穩紮穩打，累積強大法術爆發。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Silvie</h3>
            <p className="text-gray-300 text-sm">
              與動物有天然連結的少女，能召喚各地神獸共同作戰。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Tonoris</h3>
            <p className="text-gray-300 text-sm">
              歷經滄桑的守護者，願為同伴承受一切，強硬而不屈。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Tristan</h3>
            <p className="text-gray-300 text-sm">
              冷血刺客，為金而殺，等待一擊必殺的最完美時機。
            </p>
          </div>

          <div className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-md border border-[#F28C7C]/10">
            <h3 className="text-xl font-bold text-white mb-1">Vanitas</h3>
            <p className="text-gray-300 text-sm">
              神秘領袖，以言語魅力與力量收服他人，是最大的不確定因子。
            </p>
          </div>
        </div>
      </section>
    </GuideLayout>
  );
}
