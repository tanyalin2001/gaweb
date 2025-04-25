"use client";

import Image from "next/image";
import GuideLayout from "../layout";

export default function HeroesPage() {
  return (
    <GuideLayout>
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-[#F28C7C]">職業介紹</h2>
        <p className="text-gray-300">
          每位英雄都有職業屬性，而 GA 目前總共有 7
          種職業，分別是：戰士、法師、守護者、遊俠、刺客、馴獸師、牧師。
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-200">
          <li className="bg-[#1f1f1f]/90 p-4 rounded-xl shadow-sm border border-[#F28C7C]/10">
            <strong>戰士</strong>
            ：強調近戰與物理攻擊，能夠突破防線並承受大量傷害。
            <br />
            <span className="text-sm text-gray-400">
              代表英雄：Lorraine、Merlin、Jin、Mordred
            </span>
          </li>
          <li className="bg-[#1f1f1f]/90 p-4 rounded-xl shadow-sm border border-[#F28C7C]/10">
            <strong>法師</strong>：擅長使用高傷害法術進行爆發輸出。
            <br />
            <span className="text-sm text-gray-400">
              代表英雄：Kongming、Rai、Merlin
            </span>
          </li>
          <li className="bg-[#1f1f1f]/90 p-4 rounded-xl shadow-sm border border-[#F28C7C]/10">
            <strong>守護者</strong>：具備高防禦與守護能力，血量多，很坦。
            <br />
            <span className="text-sm text-gray-400">
              代表英雄：Nico、Tonoris
            </span>
          </li>
          <li className="bg-[#1f1f1f]/90 p-4 rounded-xl shadow-sm border border-[#F28C7C]/10">
            <strong>遊俠</strong>：擅長遠距離攻擊，使用槍械。
            <br />
            <span className="text-sm text-gray-400">
              代表英雄：Diana、Polkwahk
            </span>
          </li>
          <li className="bg-[#1f1f1f]/90 p-4 rounded-xl shadow-sm border border-[#F28C7C]/10">
            <strong>刺客</strong>
            ：擁有高爆發與潛行能力，專精快速擊殺目標，具有極高靈活性。
            <br />
            <span className="text-sm text-gray-400">
              代表英雄：Zander、Tristan
            </span>
          </li>
          <li className="bg-[#1f1f1f]/90 p-4 rounded-xl shadow-sm border border-[#F28C7C]/10">
            <strong>馴獸師</strong>：與野獸或召喚物並肩作戰，創造強大場面優勢。
            <br />
            <span className="text-sm text-gray-400">
              代表英雄：Allen、Guo Jia、Silvie
            </span>
          </li>
          <li className="bg-[#1f1f1f]/90 p-4 rounded-xl shadow-sm border border-[#F28C7C]/10">
            <strong>牧師</strong>
            ：擅長治療與支援法術，提供穩定的續航力與反制能力。
            <br />
            <span className="text-sm text-gray-400">
              代表英雄：Arisanna、Diao Chan、Vanitas
            </span>
          </li>
        </ul>
      </section>
    </GuideLayout>
  );
}
