export interface InfoEntry {
  _id: string;
  title: string;
  content: string;
  coverUrl?: string;
  createdAt: string;
  tags?: string[];
}

export const hardcodedPosts: InfoEntry[] = [
  {
    _id: "1",
    title: "賽季結算公告",
    content: "我們將於下週進行賽季結算，請玩家提前完成賽事相關操作。",
    coverUrl: "/covers/season-end.jpg",
    createdAt: "2025-04-22T10:00:00Z",
    tags: ["公告", "賽事"],
  },
  {
    _id: "2",
    title: "擴充包發售日公布",
    content: "最新擴充包《Coronation》將於 5 月 10 日全球同步發售！",
    coverUrl: "/covers/coronation-release.jpg",
    createdAt: "2025-04-18T12:30:00Z",
    tags: ["商品資訊", "Coronation"],
  },
  {
    _id: "3",
    title: "伺服器維護通知",
    content:
      "4 月 30 日凌晨 2 點至 4 點將進行例行維護，期間網站將暫時無法訪問。",
    coverUrl: "/covers/maintenance.jpg",
    createdAt: "2025-04-20T03:00:00Z",
    tags: ["系統"],
  },
];
