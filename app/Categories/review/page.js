"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      title: "Great experience",
      content: "Everything was clean and the service was amazing.",
      rating: 5,
      username: "JohnDoe"
    },
    {
      id: 2,
      title: "Pretty good",
      content: "Nice place but a bit expensive.",
      rating: 4,
      username: "JaneSmith"
    }
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  async function submitReview() {
    console.log("submit");
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">

      {/* 🔥 BUSINESS HEADER */}
      <div className="bg-gray-100 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center">

          {/* IMAGE PLACEHOLDER */}
          <div className="w-40 h-40 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
            Image
          </div>

          {/* BUSINESS INFO */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              Business Name
            </h1>

            {/* AVG RATING */}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-red-500 text-xl">★★★★☆</span>
              <span className="text-gray-600 text-sm">
                4.2 average rating
              </span>
            </div>

            <p className="text-gray-500 text-sm">
              Category • Location placeholder
            </p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT - REVIEWS */}
        <div className="md:col-span-2 flex flex-col gap-4">

          <h2 className="text-xl font-semibold text-gray-800">
            Recent Reviews
          </h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div
                key={r.id}
                className="bg-gray-100 p-5 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {r.title}
                  </h3>
                  <span className="text-red-500 font-bold">
                    {"★".repeat(r.rating)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm">
                  {r.content}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  by {r.username || "Anonymous"}
                </p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT - FORM */}
        <div className="bg-gray-200 p-6 rounded-xl shadow-md h-fit sticky top-6">

          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Write a Review
          </h2>

          {/* ⭐ STARS (your animation kept) */}
          <div className="flex gap-1 mb-4">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition-transform ${
                  star <= rating ? "text-red-500 scale-110" : "text-gray-400"
                } hover:scale-125`}
              >
                {star <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>

          <input
            placeholder="Review title"
            className="w-full mb-3 p-2 rounded bg-white"
            onChange={(e)=>setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your review..."
            className="w-full mb-3 p-2 rounded bg-white"
            onChange={(e)=>setContent(e.target.value)}
          />

          <button
            onClick={submitReview}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}