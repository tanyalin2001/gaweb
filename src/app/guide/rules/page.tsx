"use client";

import GridLayout from "../layout";
import Image from "next/image";

export default function RulesPage() {
  return (
    <GridLayout>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#F28C7C] text-center drop-shadow-[0_1px_0_rgba(0,0,0,0.9)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] mb-10">
        新手入門指南
      </h1>
      <div className="bg-[#1a1a1a]/80 rounded-2xl p-6 md:p-10 shadow-lg border border-[#333]">
        {/* Section: 遊戲目標 */}
        <section className="border-b border-[#444]/40 pb-12 mb-12 last:border-0">
          <h2 className="text-3xl font-bold text-[#F28C7C] mb-4">遊戲目標</h2>
          <p>
            在 Grand Archive
            中，每位玩家操控一名「英雄」，目標是擊敗對手的英雄。當英雄受到的傷害累積達到其生命值時，就會死亡。誰先讓對方英雄死亡，就贏得比賽。
          </p>
          <div className="mt-6 flex justify-center gap-6 flex-wrap">
            <Image
              src="/guide/lorraine-lv1.png"
              alt="Lorraine Lv1"
              width={310}
              height={300}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/guide/tonoris-lv1.png"
              alt="Tonoris Lv1"
              width={310}
              height={300}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/guide/guojia-lv1.png"
              alt="Guo Jia Lv1"
              width={310}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
          <p className="mt-4 mb-4">
            每個英雄右下角都會有血量。當英雄受到傷害的時候，就會在他身上放那麼多點傷害指示物。當他的傷害指示物等於或超過血量，英雄死亡。
          </p>
          <Image
            src="/guide/Champion_Taking_Damage.gif"
            alt="Guo Jia Lv1"
            width={1000}
            height={300}
            className="rounded-lg shadow-md mb-8"
          />
        </section>

        <section className="border-b border-[#444]/40 pb-12 mb-12 last:border-0">
          <h2 className="text-3xl font-bold text-[#F28C7C] mb-4">套牌構成</h2>
          <p className="text-base text-white mt-2 mb-8">
            每位玩家會有兩副牌組，一副是物質牌組（Material
            Deck），一副是主牌組（Main Deck）。
          </p>
          <Image
            src="/guide/setup.png"
            alt="Guo Jia Lv1"
            width={1000}
            height={300}
            className="rounded-lg shadow-md mb-8"
          />

          <h3 className="text-xl font-semibold mb-2">
            物質牌組（Material Deck）
          </h3>
          <ul className="list-disc list-inside">
            <li>左上角是藍色記憶費用的牌</li>
            <li>僅包含英雄（Champion）與神器（Regalia）</li>
            <li>每個名稱最多 1 張</li>
            <li>最多 12 張牌</li>
            <li>至少包含一張 0 級英雄</li>
          </ul>
          <p className="text-base text-[#fff9c4] mt-2 mb-8">
            ※ 物質牌組是隱藏資訊，但你可以隨時查看
          </p>

          <h3 className="text-xl font-semibold mb-2">主牌組（Main Deck）</h3>
          <ul className="list-disc list-inside">
            <li>左上角是黃色預留費用的牌</li>
            <li>每個名稱最多可放 4 張</li>
            <li>至少 60 張牌，無上限</li>
            <li>包含友軍（Ally）、攻擊（Attack）、行動（Action）等</li>
          </ul>
          <p className="text-base text-[#fff9c4] mt-2 mb-8">
            ※ 主牌組不可自由查看或重新排序
          </p>
          <Image
            src="/guide/cost.png"
            alt="Guo Jia Lv1"
            width={1000}
            height={300}
            className="rounded-lg shadow-md mb-8"
          />
        </section>

        <section className="border-b border-[#444]/40 pb-12 mb-12 last:border-0">
          <h2 className="text-3xl font-bold text-[#F28C7C] mb-4">遊戲開始</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>擲骰決定先後</li>
            <li>
              雙方從物質牌組中選擇一張 0 級英雄進場 → 進場時抽 7 張牌（On enter:
              Draw 7 cards）
            </li>
            <li>先手跳過抽牌階段，直接開始主要階段</li>
            <li>後手從第一回合開始就能抽 1 張牌</li>
          </ol>
          <div className="mt-6 flex justify-center gap-6 flex-wrap mb-8">
            <Image
              src="/guide/spiritofwater.png"
              alt="Lorraine Lv1"
              width={310}
              height={300}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/guide/spiritofwind.png"
              alt="Tonoris Lv1"
              width={310}
              height={300}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/guide/spiritoffire.png"
              alt="Guo Jia Lv1"
              width={310}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </section>

        <section className="border-b border-[#444]/40 pb-12 mb-12 last:border-0">
          <h2 className="text-3xl font-bold text-[#F28C7C] mb-4">元素系統</h2>
          <ul className="list-disc list-inside">
            <li>每張牌右上角會有元素符號</li>
            <li>你只能打出與你英雄啟用的元素相符的牌</li>
            <li>預設啟用「普通元素」（Norm）</li>
            <li>英雄升級後會解鎖更多元素</li>
            <li>升級後仍保留原本的元素，可以使用英雄血統內元素的牌</li>
            <p className="text-base text-[#fff9c4] mt-2 ">
              ※ 舉例來說，0 等出了一個 Spirit of
              Wind，這時候就解鎖兩個元素：風、普通。
            </p>
            <p className="text-base text-[#fff9c4] mt-2 mb-8">
              ※ 升到 1 等普通元素的Lorraine，仍然可以使用這兩個屬性的牌
            </p>
          </ul>
          <div className="mt-6 flex justify-center gap-6 flex-wrap mb-8">
            <Image
              src="/guide/fracturize.png"
              alt="fracturize"
              width={310}
              height={300}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/guide/scatteressence.png"
              alt="scatteressence"
              width={310}
              height={300}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/guide/incendiary.png"
              alt="incendiary"
              width={310}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#F28C7C] mb-4">
            支付預留費用（從手牌出牌）
          </h2>
          <p className="mb-4">手牌左上角的黃色數字為預留費用（Reserve Cost）</p>

          <Image
            src="/guide/reservecost.png"
            alt="Guo Jia Lv1"
            width={1000}
            height={300}
            className="rounded-lg shadow-md mb-8"
          />
          <p>使用方式如下：</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>宣告要打出的牌</li>
            <li>從手牌中將等量的牌背面放入記憶區（Memory Zone）作為費用</li>
            <li>記憶區的牌會在「回憶階段」（Recollection Phase）回到手牌</li>
          </ol>
          <p className="text-base text-[#fff9c4] mt-2 mb-8">
            ※ 每回合可以打出任意張數的牌，只要付得出費用
          </p>
          <Image
            src="/guide/Paying_For_Reserve.gif"
            alt="Guo Jia Lv1"
            width={1000}
            height={300}
            className="rounded-lg shadow-md mb-8"
          />
        </section>

        <section className="border-b border-[#444]/40 pb-12 mb-12 last:border-0">
          {/* 🟦 Ally 卡片段落：左右排版（圖左文右） */}
          <div className="flex flex-col md:flex-row md:items-start md:gap-4 mb-10">
            {/* 圖片放左邊 */}
            <div className="md:mr-4 md:flex-shrink-0">
              <Image
                src="/guide/honorable-vanguard.png"
                alt="honorable-vanguard"
                width={250}
                height={350}
                className="rounded-lg shadow-md mb-6 md:mb-0"
              />
            </div>

            {/* 文字放右邊 */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold">友軍（Ally）</h3>
              <ul className="list-disc list-inside mt-2 mb-2">
                <li>打出後置於主戰場，有攻擊力與生命值</li>
                <li>可以攻擊，代價為橫置（休息）</li>
                <li>每回合移除身上的傷害指示物（血量重置）</li>
              </ul>

              <p className="font-semibold mt-4">攻擊條件：</p>
              <ul className="list-disc list-inside ml-4">
                <li>是你的主要階段（慢速slow）</li>
                <li>堆疊上無其他效果</li>
                <li>單位是醒來狀態</li>
                <li>有有效攻擊目標（對手的單位）</li>
              </ul>
            </div>
          </div>
          {/* 🟧 攻擊宣告圖片段落 */}
          <Image
            src="/guide/Declaring_an_Attack_Ally.gif"
            alt="Declaring an attack"
            width={1000}
            height={300}
            className="rounded-lg shadow-md mb-6"
          />

          <div className="flex flex-col md:flex-row md:items-start md:gap-4 mb-10">
            {/* 圖片放左邊 */}
            <div className="md:mr-4 md:flex-shrink-0">
              <Image
                src="/guide/suddensteel.png"
                alt="suddensteel"
                width={250}
                height={350}
                className="rounded-lg shadow-md mb-6 md:mb-0"
              />
            </div>

            {/* 文字放右邊 */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mt-4">攻擊牌（Attack）</h3>
              <ul className="list-disc list-inside mt-2">
                <li>讓你的英雄發動攻擊（皆為慢速slow）</li>
                <li>傷害數值等同於右下角的力量屬性</li>
                <li>額外條件：橫置英雄</li>
                <li>結算後的攻擊牌會在該戰鬥階段結束時送入墓地</li>
              </ul>
            </div>
          </div>
          <Image
            src="/guide/Champion_Taking_Damage.gif"
            alt="Guo Jia Lv1"
            width={1000}
            height={300}
            className="rounded-lg shadow-md mb-8"
          />

          {/* 🟩 武器區塊 */}
          <div className="flex flex-col md:flex-row md:items-start md:gap-4 mb-10">
            <div className="md:mr-4 md:flex-shrink-0">
              <Image
                src="/guide/clarent.png"
                alt="clarent"
                width={250}
                height={350}
                className="rounded-lg shadow-md mb-6 md:mb-0"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mt-4">武器（Weapon）</h3>
              <ul className="list-disc list-inside mt-2">
                <li>給英雄使用，具有力量與耐久</li>
                <li>場上沒有武器數量限制</li>
                <li>攻擊時消耗 1 耐久</li>
                <li>耐久歸 0 時武器會被犧牲，進除外區</li>
                <p className="text-base text-[#fff9c4] mt-2">
                  ※ 可以與攻擊牌一同使用，攻擊力會疊加
                </p>
              </ul>
            </div>
          </div>

          {/* 🟧 行動牌區塊 */}
          {/* 🔴 Fireball（快速）區塊 */}
          <div className="flex flex-col md:flex-row md:items-start md:gap-4 mb-8">
            <div className="md:mr-4 md:flex-shrink-0">
              <Image
                src="/guide/fireball.png"
                alt="Fireball"
                width={250}
                height={350}
                className="rounded-lg shadow-md mb-6 md:mb-0"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mt-4">
                行動牌（Action）：快速 Fast
              </h3>
              <ul className="list-disc list-inside mt-2">
                <li>單次使用的效果牌，用完即送入墓地</li>
                <li>快速牌可以在任意時間打出，包括對手的回合</li>
                <li>可進行堆疊</li>
              </ul>
              <p className="text-sm text-gray-300 mt-2">
                範例：<strong>Fireball</strong> 可在任何時機對單位造成傷害。
              </p>
            </div>
          </div>

          {/* 🔵 Scry the Skies（慢速）區塊 */}
          <div className="flex flex-col md:flex-row md:items-start md:gap-4 mb-10">
            <div className="md:mr-4 md:flex-shrink-0">
              <Image
                src="/guide/scry.png"
                alt="Scry the Skies"
                width={250}
                height={350}
                className="rounded-lg shadow-md mb-6 md:mb-0"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mt-4">
                行動牌（Action）：慢速 Slow
              </h3>
              <ul className="list-disc list-inside mt-2">
                <li>單次使用的效果牌，用完即送入墓地</li>
                <li>慢速牌只能在你的主要階段使用，且堆疊為空時才可使用</li>
              </ul>
              <p className="text-sm text-gray-300 mt-2">
                範例：<strong>Scry the Skies</strong>{" "}
                可以讓你預視並調整牌庫頂端。
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#444]/40 pb-12 mb-12 last:border-0">
          <h2 className="text-3xl font-bold text-[#F28C7C] mb-4">
            回合流程（共七個階段）
          </h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              <strong>喚醒階段</strong>
              ：直立你控制的所有物件（英雄、友軍、物品...）
            </li>

            <li>
              <strong>物質化階段</strong>
              ：從物質牌組中物質化一張牌（需支付記憶費用）
            </li>
            <Image
              src="/guide/Deciding_to_Materialize.gif"
              alt="Guo Jia Lv1"
              width={1000}
              height={300}
              className="rounded-lg shadow-md mb-8"
            />

            <li>
              <strong>回憶階段</strong>：將記憶區的牌全部收回手
            </li>
            <li>
              <strong>抽牌階段</strong>：抽 1 張牌
            </li>
            <li>
              <strong>主要階段</strong>：可以出牌、宣布攻擊
            </li>
            <li>
              <strong>戰鬥階段</strong>（可重複）：執行戰鬥流程
            </li>
            <li>
              <strong>結束階段</strong>：移除臨時傷害與結束效果
            </li>
          </ol>
        </section>

        <section className="border-b border-[#444]/40 pb-12 mb-12 last:border-0">
          <h2 className="text-3xl font-bold text-[#F28C7C] mt-8 mb-4">
            支付記憶費用（從物質牌組出牌）
          </h2>
          <Image
            src="/guide/memory-cost.png"
            alt="Guo Jia Lv1"
            width={1000}
            height={300}
            className="rounded-lg shadow-md mb-8"
          />

          <p>物質牌組牌的左上角為藍色記憶費用（Memory Cost），支付方式如下：</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>宣告要物質化的牌</li>
            <li>隨機除外記憶區中等量的牌作為費用 → 可用骰子或讓對手隨機選擇</li>
          </ol>
          <p className="text-base text-[#fff9c4] mt-2 mb-8">
            ※ 除外後的牌在非特殊情況下無法回收，請謹慎選擇
          </p>
          <Image
            src="/guide/Paying_for_Memory.gif"
            alt="Guo Jia Lv1"
            width={1000}
            height={300}
            className="rounded-lg shadow-md mb-8"
          />
        </section>

        <section className="border-b border-[#444]/40 pb-12 mb-12 last:border-0">
          <h2 className="text-3xl font-bold text-[#F28C7C] mb-4">升級英雄</h2>
          <ul className="list-disc list-inside">
            <li>從等級低一階的英雄升級（如從 1 級升 2 級）</li>
            <li>
              符合血統需求（Lineage Release） → 例如 Lorraine, Blademaster
              必須從一階 Lorraine 升上去
            </li>
            <li>支付記憶費用</li>
            <p className="text-base text-[#fff9c4] mt-2">
              ※
              升級後英雄保有其血統元素，你可以打出所有符合其啟用元素的牌（前提是符合各自牌片條件）
            </p>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#F28C7C] mt-8 mb-4">
            關鍵詞與術語
          </h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>物體（Object）</strong>：英雄、友軍、武器、物品、領域
            </li>
            <li>
              <strong>單位（Unit）</strong>：英雄與友軍
            </li>
            <li>
              <strong>職業獎勵（Class Bonus）</strong>
              ：當你的英雄職業與卡牌對應時，才會觸發該效果
            </li>
          </ul>
        </section>
      </div>
    </GridLayout>
  );
}
