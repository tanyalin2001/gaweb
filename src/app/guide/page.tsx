'use client'

export default function GuidePage() {
  return (
    <main className="relative min-h-screen text-white font-sans">
      {/* 背景圖層 */}
      <div className="absolute inset-0 z-[-2]">
        <img
          src="/bg.png"
          alt="Guide Background"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[-1]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#F28C7C] text-center">
          Grand Archive 新手入門指南
        </h1>

        {/* 以下為各教學段落 */}
        <section>
        <h2 className="text-2xl font-bold mb-2">遊戲目標</h2>
        <p>在 Grand Archive 中，每位玩家操控一名「英雄」，目標是擊敗對手的英雄。當英雄受到的傷害累積達到其生命值時，就會死亡。誰先讓對方英雄死亡，就贏得比賽。</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">套牌構成</h2>

        <h3 className="text-xl font-semibold mt-4">物質牌組（Material Deck）</h3>
        <ul className="list-disc list-inside">
          <li>僅包含英雄（Champion）與神器（Regalia）</li>
          <li>每個名稱最多一張</li>
          <li>最多 12 張牌</li>
          <li>至少包含一張 0 級英雄</li>
        </ul>
        <p className="text-sm text-gray-600">※ 物質牌組是隱藏資訊，但你可以隨時查看</p>

        <h3 className="text-xl font-semibold mt-4">主牌組（Main Deck）</h3>
        <ul className="list-disc list-inside">
          <li>每張牌最多可放 4 張</li>
          <li>至少 60 張牌，無上限</li>
          <li>包含友軍（Ally）、攻擊（Attack）、行動（Action）等</li>
        </ul>
        <p className="text-sm text-gray-600">※ 主牌組不可自由查看或重新排序</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">遊戲開始</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>擲骰決定先後</li>
          <li>雙方從物質牌組中選擇一張 0 級英雄進場 → 進場時抽 7 張牌（On enter: Draw 7 cards）</li>
          <li>先手跳過抽牌階段，直接開始主要階段</li>
          <li>後手從第一回合開始就能抽 1 張牌</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">元素系統</h2>
        <ul className="list-disc list-inside">
          <li>每張牌右上角會有元素符號</li>
          <li>你只能打出與你英雄啟用的元素相符的牌</li>
          <li>初始啟用「規範元素」（Generic）</li>
          <li>英雄升級後會解鎖更多元素</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">支付預留費用（從手牌出牌）</h2>
        <p>手牌左上角的黃色數字為預留費用（Reserve Cost），使用方式如下：</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>宣告要打出的牌</li>
          <li>從手牌中將等量的牌背面放入記憶區（Memory Zone）作為費用</li>
          <li>記憶區的牌會在「回憶階段」（Recollection Phase）回到手牌</li>
        </ol>
        <p className="text-sm text-gray-600">※ 每回合可以打出任意張數的牌，只要付得出費用</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">牌類型介紹</h2>

        <h3 className="text-xl font-semibold mt-4">友軍（Ally）</h3>
        <ul className="list-disc list-inside">
          <li>打出後置於主戰場，有攻擊力與生命值</li>
          <li>可以攻擊，攻擊後會橫置（休息）</li>
        </ul>
        <p>使用條件：</p>
        <ul className="list-disc list-inside ml-4">
          <li>是你的主要階段</li>
          <li>堆疊上無其他效果</li>
          <li>單位是清醒狀態</li>
          <li>有有效攻擊目標（對手的單位）</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">攻擊牌（Attack）</h3>
        <ul className="list-disc list-inside">
          <li>讓你的英雄發動攻擊</li>
          <li>傷害數值等同於牌右下角的力量屬性</li>
          <li>額外條件：英雄需橫置</li>
          <li>解決後的攻擊牌會在該戰鬥階段結束時送入墓地</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">武器（Weapon）</h3>
        <ul className="list-disc list-inside">
          <li>給英雄裝備使用，具有力量與耐久</li>
          <li>攻擊時消耗 1 耐久</li>
          <li>耐久歸 0 時武器會被犧牲</li>
        </ul>
        <p className="text-sm text-gray-600">補充：可以與攻擊牌一同使用，攻擊力會疊加</p>

        <h3 className="text-xl font-semibold mt-4">行動牌（Action）</h3>
        <ul className="list-disc list-inside">
          <li>單次使用的效果牌，用完即送入墓地</li>
          <li>分為兩種速度：</li>
          <ul className="list-disc list-inside ml-6">
            <li>慢速：僅能在主要階段使用，且堆疊為空</li>
            <li>快速：可以在任意時間打出，包含對手的回合</li>
          </ul>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">回合流程（共七個階段）</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>喚醒階段</strong>：直立你控制的單位</li>
          <li><strong>物化階段</strong>：從物質牌組中實現一張牌（需支付記憶費用）</li>
          <li><strong>回憶階段</strong>：將記憶區的牌全部收回手牌</li>
          <li><strong>抽牌階段</strong>：抽 1 張牌</li>
          <li><strong>主要階段</strong>：可以出牌、宣布攻擊</li>
          <li><strong>戰鬥階段</strong>（可重複）：執行戰鬥流程</li>
          <li><strong>結束階段</strong>：移除臨時傷害與結束效果</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">支付記憶費用（從物質牌組出牌）</h2>
        <p>物質牌組牌的左上角為藍色記憶費用（Memory Cost），支付方式如下：</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>宣告要實現的牌</li>
          <li>隨機除外記憶區中等量的牌作為費用 → 可用骰子或讓對手隨機選擇</li>
        </ol>
        <p className="text-sm text-gray-600">※ 除外後的牌無法回收，請謹慎選擇</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">升級英雄</h2>
        <ul className="list-disc list-inside">
          <li>從等級低一階的英雄升級（如從 1 級升 2 級）</li>
          <li>符合血統需求（Lineage Release） → 例如 Lorraine, Blademaster 必須從一階 Lorraine 升上去</li>
          <li>支付記憶費用</li>
        </ul>
        <p className="mt-2">升級後英雄保有其血統元素，你可以打出所有符合其啟用元素的牌（前提是符合各自牌片條件）</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">關鍵詞與術語</h2>
        <ul className="list-disc list-inside">
          <li><strong>物體（Object）</strong>：英雄、友軍、武器、物品、領域</li>
          <li><strong>單位（Unit）</strong>：英雄與友軍</li>
          <li><strong>職業獎勵（Class Bonus）</strong>：當你的英雄職業與牌片對應時，才會觸發額外效果</li>
        </ul>
      </section>

        {/* 職業介紹區塊 */}
        <section className="space-y-6 border-t border-[#F28C7C]/50 pt-10">
          <h2 className="text-3xl font-bold text-[#F28C7C]">🧙‍♂️ 職業介紹</h2>
          <p className="text-gray-300">每位英雄都有職業屬性，例如：劍士（Blademaster）、魔導士（Magus）、守護者（Guardian）等，這些職業影響特定效果觸發與卡牌限制。</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-200">
            <li className="bg-[#1f1f1f] p-4 rounded-xl">⚔️ <strong>Blademaster</strong>：偏好使用武器，強調攻擊與裝備互動</li>
            <li className="bg-[#1f1f1f] p-4 rounded-xl">🪄 <strong>Magus</strong>：以行動牌與元素傷害為主，擅長控制與爆發</li>
            <li className="bg-[#1f1f1f] p-4 rounded-xl">🛡 <strong>Guardian</strong>：具備守護與減傷能力，專精防守</li>
            <li className="bg-[#1f1f1f] p-4 rounded-xl">🐾 <strong>Tamer</strong>：搭配野獸友軍，產生連動效果</li>
          </ul>
        </section>

        {/* 英雄介紹區塊（圖文並排） */}
        <section className="space-y-6 border-t border-[#F28C7C]/50 pt-10">
          <h2 className="text-3xl font-bold text-[#F28C7C]">🦸‍♀️ 英雄介紹</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1f1f1f] p-4 rounded-xl shadow-md">
              <img src="/lorraine.png" alt="Lorraine" className="rounded mb-4 w-full object-cover h-60" />
              <h3 className="text-xl font-bold text-white mb-1">Lorraine, Blademaster</h3>
              <p className="text-gray-300 text-sm">操作感強、能用武器疊攻，適合喜歡 tempo 操控與壓制力的玩家。</p>
            </div>
            <div className="bg-[#1f1f1f] p-4 rounded-xl shadow-md">
              <img src="/zander.png" alt="Zander" className="rounded mb-4 w-full object-cover h-60" />
              <h3 className="text-xl font-bold text-white mb-1">Zander, Wind Magus</h3>
              <p className="text-gray-300 text-sm">資源型控制型英雄，擅長用瞬間回應對手行動，能彈能解，變化靈活。</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
