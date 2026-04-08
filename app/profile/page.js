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
    <div className="min-h-screen bg-red-200 font-sans flex justify-center py-10 px-4">
      <main className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 flex flex-col gap-8">
        
        {/* CLOSE BUTTON */}
        <Link href="/" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        {/* PROFILE HEADER */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/profileImage.svg"
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-5 border-gray-300"
          />
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{user?.username}</h1>
            <p className="text-gray-600 max-w-md">
              Enter Bio Here
            </p>
          </div>
        </div>

        {/* REVIEW SUMMARY */}
        <div className="flex flex-wrap justify-between gap-4 bg-gray-50 rounded-xl p-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900">_</span>
            <span className="text-gray-600 ">Reviews Written</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900">_</span>
            <span className="text-gray-600">Average Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-500">_</span>
            <span className="text-gray-600">Badges/Achievements</span>
          </div>
        </div>

        {/* RECENT REVIEWS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Reviews</h2>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((review) => (
              <div key={review} className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">Review Title #{review}</h3>
                  <span className="text-yellow-400 font-bold">_</span>
                </div>
                <p className="text-gray-600">
                  This is a short snippet of the review content to give readers a quick idea of the opinion...
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAVORITE CATEGORIES */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Favorite Categories</h2>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3"].map((cat) => (
              <span key={cat} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* SOCIAL / CONTACT LINKS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connect</h2>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-pink-600 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8" fill="white" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className = "flex flex-col gap-4 text-base font-medium sm:flex-row justify-center pt-6">
            <Button text="Edit Profile" textColor="black" bgColor="gray-200" w="50" h="12"></Button>
        </div>
      </main>
    </div>
  );
}