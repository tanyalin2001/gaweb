'use client';
import { useAuth } from '@/hooks/useAuth';

export default function CommunityPage() {
  const auth = useAuth();

  if (!auth) {
    return <p className="text-red-600">請先登入後才能查看玩家投稿區。</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">玩家投稿區</h1>
      <p>投稿將會經過審核後顯示於此頁面。</p>
    </div>
  );
}
