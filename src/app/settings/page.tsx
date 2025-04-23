"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsPage() {
  const { email, username, role, refresh } = useAuth();

  const [newUsername, setNewUsername] = useState(username);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUsernameChange = async () => {
    if (!newUsername || newUsername === username) return;

    setLoading(true);
    setUsernameError("");
    setUsernameMessage("");

    const res = await fetch("/api/settings/update-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ newUsername }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      refresh?.();
      setUsernameMessage("✅ 使用者名稱已更新");
      window.location.reload();
    } else {
      setUsernameError(data.message || "名稱更新失敗");
    }

    setLoading(false);
  };

  const handlePasswordChange = async () => {
    setPasswordError("");
    setPasswordMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("請填寫所有欄位");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("新密碼至少需 8 碼");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("請確認兩次新密碼一致");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/settings/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setPasswordMessage("✅ 密碼已更新");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPasswordError(data.message || "密碼更新失敗");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded-lg shadow-md bg-white space-y-8">
      <h1 className="text-2xl font-bold">帳號設定</h1>

      {/* 使用者名稱 */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          使用者名稱
        </label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        {usernameError && (
          <p className="text-sm text-red-600 mt-1">{usernameError}</p>
        )}
        <button
          onClick={handleUsernameChange}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-40"
          disabled={newUsername === username || !newUsername || loading}
        >
          儲存使用者名稱
        </button>
        {usernameMessage && (
          <p className="text-green-600 text-sm mt-2">{usernameMessage}</p>
        )}
      </div>

      {/* Email / 角色 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">角色</label>
          <input
            type="text"
            value={role}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>
      </div>

      {/* 密碼變更 */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">舊密碼</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-2"
        />

        <label className="block font-medium text-gray-700 mb-1">新密碼</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-2"
        />

        <label className="block font-medium text-gray-700 mb-1">
          確認新密碼
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-2"
        />

        {passwordError && (
          <p className="text-sm text-red-600 mt-1">{passwordError}</p>
        )}
        <button
          onClick={handlePasswordChange}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-40"
          disabled={loading}
        >
          儲存密碼
        </button>
        {passwordMessage && (
          <p className="text-green-600 text-sm mt-2">{passwordMessage}</p>
        )}
      </div>
    </div>
  );
}
