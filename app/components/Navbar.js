"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
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
        
        <Link href="/profile" className="px-4 py-2 text-white rounded">
          Profile
        </Link>

              <div className="relative">
              <button
                onClick={() => {
                setShowSettingsPopup(!showSettingsPopup);
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