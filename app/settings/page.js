"use client";

import Navbar from "../components/Navbar.js";

export default function Settings() {
  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <div className="flex flex-col gap-4 max-w-md">
          <input
            type="text"
            placeholder="Change username"
            className="p-3 border rounded"
          />

          <input
            type="password"
            placeholder="New password"
            className="p-3 border rounded"
          />

          <button className="bg-blue-500 text-white p-3 rounded">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}