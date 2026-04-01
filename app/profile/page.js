"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

// Reusable Button Component
function Button({ text, textColor, bgColor, w, h }) {
  return (
    <button
      className={clsx(
        `h-${h}`,
        `w-${w}`,
        `rounded-full bg-${bgColor}`,
        `px-6 text-${textColor}`,
        "transition-colors hover:brightness-110"
      )}
    >
      {text}
    </button>
  );
}

export default function UserProfile() {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function checkUser() {
      const res = await fetch("https://bookish-cod-rq5jpjqvjg524p6-5001.app.github.dev/me", {
      credentials: "include"
      });

      const data = await res.json();
      setUser(data);
      console.log(data);

      if (!res.ok) {
        // not logged in → redirect
        window.location.href = "/login";
      }
    }

    checkUser();
  }, []);
  return (
    <div className="min-h-screen bg-red-200 dark:bg-gray-900 font-sans flex justify-center py-10 px-4">
      <main className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col gap-8">
        
        {/* PROFILE HEADER */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/profileImage.svg"
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-5 border-gray-300 dark:border-gray-600"
          />
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">{user?.username}</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Enter Bio Here
            </p>
          </div>
        </div>

        {/* REVIEW SUMMARY */}
        <div className="flex flex-wrap justify-between gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">_</span>
            <span className="text-gray-600 dark:text-gray-300">Reviews Written</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">_</span>
            <span className="text-gray-600 dark:text-gray-300">Average Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-500">_</span>
            <span className="text-gray-600 dark:text-gray-300">Badges/Achievements</span>
          </div>
        </div>

        {/* RECENT REVIEWS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Recent Reviews</h2>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((review) => (
              <div key={review} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50">Review Title #{review}</h3>
                  <span className="text-yellow-400 font-bold">_</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  This is a short snippet of the review content to give readers a quick idea of the opinion...
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAVORITE CATEGORIES */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Favorite Categories</h2>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3"].map((cat) => (
              <span key={cat} className="px-4 py-2 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* SOCIAL / CONTACT LINKS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Connect</h2>
          <div className="flex gap-4">
            <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Twitter</Link>
            <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Instagram</Link>
            <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Website</Link>
          </div>
        </div>
      </main>
    </div>
  );
}