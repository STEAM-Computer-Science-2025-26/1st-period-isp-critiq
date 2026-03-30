"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

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
      <img
          src="/Critiq.svg"
          alt="critiq.js logo"
          width={100}
          height={30}
          className="bg-white p-3 rounded-lg px-2"
        />

      {/* RIGHT */}
      <div className="flex gap-8 items-center font-bold relative">
        <Link href="/Categories">Dashboard</Link>
        
        <div className="relative">
            <button
              onClick={() => {
                setShowProfilePopup(!showProfilePopup);
                setShowSettingsPopup(false);
                }}
                className="px-4 py-2 text-white rounded"
              >
                Profile
              </button>

              {showProfilePopup && (
                <div>
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="max-h-screen bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col gap-8 overflow-y-auto w-full max-w-4xl">
                      
                      {/* PROFILE HEADER */}
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <img
                          src="/profileImage.svg"
                          alt="User Avatar"
                          className="w-32 h-32 rounded-full border-5 border-gray-300 dark:border-gray-600"
                        />
                        <div className="flex flex-col gap-2 text-center sm:text-left">
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Username</h1>
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

                      {/* CLOSE BUTTON */}
                      <button 
                        onClick={() => setShowProfilePopup(false)}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
              </div>

              <div className="relative">
              <button
                onClick={() => {
                setShowSettingsPopup(!showSettingsPopup);
                setShowProfilePopup(false);
              }}
              className="px-0 py-2 text-white rounded"
            >
              Settings
            </button>

            {showSettingsPopup && (
              <div 
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 backdrop-blur-sm"
                onClick={() => setShowSettingsPopup(false)}
              >
                <div 
                  className="max-h-screen bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col gap-8 overflow-y-auto w-full max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  
                  {/* SETTINGS HEADER */}
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Settings</h1>

                  {/* ACCOUNT SETTINGS */}
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Account</h2>
                    <div className="flex flex-col gap-3">
                      <button className="w-full text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">Change Password</button>
                      <button className="w-full text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">Email Preferences</button>
                    </div>
                  </div>

                  {/* NOTIFICATION SETTINGS */}
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Notifications</h2>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span>Email Notifications</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span>Review Replies</span>
                      </label>
                    </div>
                  </div>

                  {/* PRIVACY SETTINGS */}
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Privacy</h2>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span>Public Profile</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Show Reviews Publicly</span>
                      </label>
                    </div>
                  </div>

                  {/* CLOSE BUTTON */}
                  <button 
                    onClick={() => setShowSettingsPopup(false)}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
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