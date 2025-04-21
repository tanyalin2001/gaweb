'use client';
import { useAuth } from '@/hooks/useAuth';

export default function AdminPage() {
  const auth = useAuth();

  if (!auth) {
    return <p className="text-red-600">請先登入才能進入後台管理頁面。</p>;
  }

  if (auth.role !== 'admin') {
    return <p className="text-red-600">你沒有管理員權限。</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">後台審核頁</h1>
      <p>僅限管理員使用，用來管理投稿、上傳牌組等。</p>
    </div>
  );
}