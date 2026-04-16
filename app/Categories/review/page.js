"use client";
import { useState } from "react";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  async function submitReview() {
    console.log("submit"); // placeholder
  }

  return (
<div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

  {/* LEFT - REVIEWS FEED */}
  <div className="md:col-span-2 flex flex-col gap-4">

    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
      Recent Reviews
    </h2>

    {reviews.length === 0 ? (
      <p className="text-gray-500">No reviews yet.</p>
    ) : (
      reviews.map((r) => (
        <div
          key={r.id}
          className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {r.title}
            </h3>
            <span className="text-red-500 font-bold">
              {"★".repeat(r.rating)}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {r.content}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            by {r.username || "Anonymous"}
          </p>
        </div>
      ))
    )}
  </div>

  {/* RIGHT - REVIEW FORM */}
  <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-xl shadow-md h-fit sticky top-6">

    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
      Write a Review
    </h2>

    {/* Stars */}
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
      className="w-full mb-3 p-2 rounded bg-white dark:bg-gray-800"
      onChange={(e)=>setTitle(e.target.value)}
    />

    <textarea
      placeholder="Write your review..."
      className="w-full mb-3 p-2 rounded bg-white dark:bg-gray-800"
      onChange={(e)=>setContent(e.target.value)}
    />

    <button
      onClick={submitReview}
      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
    >
      Submit Review
    </button>

  </div>
</div>);
}