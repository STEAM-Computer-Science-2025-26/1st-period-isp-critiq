"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  // Convert pathname to readable page name
  const getPageName = () => {
    const routes = {
      "/": "Home",
      "/Categories": "Dashboard",
      "/Categories/Hotels": "Hotels",
      "/Categories/Restaurants": "Restaurants",
      "/profile": "Profile",
      "/settings": "Settings",
      "/login": "Login",
      "/signup": "Sign Up",
      "/verify": "Verify",
      "/password": "Password",
    };
    return routes[pathname] || pathname.split("/").filter(p => p).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ") || "Home";
  };

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
      <Link href="/">
        <img
          src="/Critiq.svg"
          alt="critiq.js logo"
          width={100}
          height={30}
          className="bg-white p-3 rounded-lg px-2"
        />
      </Link>
      {/* Page Name */}
      <div className="text-xl font-bold text-white border-1 border-white rounded-xl px-3 py-2 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg border border-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.37)">
        {getPageName()}
      </div>

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
                className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50 backdrop-blur-sm"
                onClick={() => setShowSettingsPopup(false)}
              >
                <div 
                  className="max-h-screen bg-white rounded-xl shadow-lg p-8 flex flex-col gap-8 overflow-y-auto w-full max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  
                  {/* Settings */}
                  <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

                  {/* Account */}
                  <div>
                    <h2 className="text-2xl font-semibold text-black mb-4">Account</h2>
                    <div className="flex flex-col gap-3">
                      <button className="w-full text-left text-black px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100">Change Password</button>
                      <button className="w-full text-left text-black px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100">Change Email</button>
                    </div>
                  </div>

                  {/* NOTIFICATION SETTINGS */}
                  <div>
                    <h2 className="text-2xl font-semibold text-black mb-4">Notifications</h2>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-2 text-black">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span>Recieve Notifications</span>
                      </label>
                      <label className="flex items-center gap-2 text-black">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span>Review Replies</span>
                      </label>
                    </div>
                  </div>

                  {/* Public or Private */}
                  <button
                    onClick={() => setIsPublic(!isPublic)}
                    className={`relative w-36 h-9 rounded-full transition-colors duration-300 ${
                      isPublic ? "bg-gray-500" : "bg-red-500"
                    }`}
                    aria-label="Toggle profile visibility"
                  >
                    {/* Toggle Button */}
                    <span
                      className={`absolute top-1 w-16 h-7 bg-black rounded-full shadow transition-transform duration-300 ${
                        isPublic ? "translate-x-[-4.25rem]" : "translate-x-1"
                      }`}
                    />

                    {/* Labels */}
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold transition-colors duration-300 ${isPublic ? "text-blue-100" : "text-white"}`}>
                      Private
                    </span>
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold transition-colors duration-300 ${isPublic ? "text-white" : "text-green-100"}`}>
                      Public
                    </span>
                  </button>

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