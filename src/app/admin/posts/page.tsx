"use client";

import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  author: string;
  status: string;
  createdAt: string;
}

export default function AdminPostPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#ff5a5f] mb-6">📝 投稿管理</h1>
      <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-[#fff2f2] text-[#ff5a5f] font-semibold">
            <tr>
              <th className="text-left px-4 py-3">標題</th>
              <th className="text-left px-4 py-3">作者</th>
              <th className="text-left px-4 py-3">狀態</th>
              <th className="text-left px-4 py-3">建立時間</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{post.title}</td>
                <td className="px-4 py-3 text-gray-600">{post.author}</td>
                <td className="px-4 py-3">{post.status}</td>
                <td className="px-4 py-3 text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button className="text-sm text-blue-600 hover:underline">
                    查看
                  </button>
                  {" / "}
                  <button className="text-sm text-red-600 hover:underline">
                    刪除
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-6">
                  尚無投稿紀錄
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
