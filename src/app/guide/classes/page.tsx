"use client";

import Image from "next/image";
import GuideLayout from "../layout";

const roles = [
  {
    title: "戰士 (Warrior)",
    description: "強調近戰與物理攻擊，能夠突破防線並承受大量傷害。",
    heroes: ["lorraine", "merlin", "jin", "mordred"],
  },
  {
    title: "法師 (Mage)",
    description: "擅長使用高傷害法術進行爆發輸出。",
    heroes: ["kongming", "rai", "merlin"],
  },
  {
    title: "守護者 (Guardian)",
    description: "具備高防禦與守護能力，血量多，很坦。",
    heroes: ["nico", "tonoris"],
  },
  {
    title: "遊俠 (Ranger)",
    description: "擅長遠距離攻擊，使用槍械。",
    heroes: ["diana", "polkhawk"],
  },
  {
    title: "刺客 (Assassin)",
    description: "擁有高爆發與潛行能力，專精快速擊殺目標，具有極高靈活性。",
    heroes: ["zander", "tristan"],
  },
  {
    title: "馴獸師 (Tamer)",
    description: "與野獸或召喚物並肩作戰，創造強大場面優勢。",
    heroes: ["allen", "guo-jia", "silvie"],
  },
  {
    title: "牧師 (Cleric)",
    description: "擅長治療與支援法術，提供穩定的續航力與反制能力。",
    heroes: ["arisanna", "diao-chan", "vanitas"],
  },
];

export default function HeroesPage() {
  return (
    <GuideLayout>
      <section className="space-y-8 leading-relaxed text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F28C7C] text-center drop-shadow-[0_1px_0_rgba(0,0,0,0.9)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
          職業介紹
        </h1>

        <p className="text-white text-center">
          每位英雄都有職業屬性，而 GA 目前總共有 7
          種職業，分別是：戰士、法師、守護者、遊俠、刺客、馴獸師、牧師。
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {roles.map(({ title, description, heroes }) => (
            <li
              key={title}
              className="bg-[#1f1f1f]/90 p-6 rounded-xl shadow-xl border border-[#F28C7C]/20 space-y-4"
            >
              <div>
                <strong className="text-[#F28C7C] text-xl">{title}</strong>
                <p className="mt-1 text-white">{description}</p>
              </div>
              <div className="flex flex-wrap items-start gap-3 min-h-[136px]">
                {heroes.map((name) => (
                  <div
                    key={name}
                    className="flex flex-col items-center w-[100px] mt-4"
                  >
                    <Image
                      src={`/champions/${name}.png`}
                      alt={name}
                      width={96}
                      height={120}
                      className="rounded-md shadow-md"
                    />
                    <span className="text-lg text-center mt-1 capitalize text-[#fff2b2] leading-tight mt-4">
                      {name.replace(/-/g, " ")}
                    </span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </GuideLayout>
  );
}
