"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  }

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-black text-white">
      {/* LEFT */}
      <h1 className="text-xl font-bold">Critiq</h1>

      {/* RIGHT */}
      <div className="flex gap-4 items-center">
        <Link href="/Categories">Dashboard</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/settings">Settings</Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}