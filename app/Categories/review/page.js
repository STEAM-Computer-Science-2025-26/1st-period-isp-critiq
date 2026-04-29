"use client";

import { useState, useEffect } from "react";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  // 🔥 FETCH REVIEWS
  useEffect(() => {
    fetch("https://bookish-cod-rq5jpjqvjg524p6-5001.app.github.dev/reviews")
      .then(res => res.json())
      .then(data => {
        console.log("GET REVIEWS:", data);
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error("FETCH ERROR:", err));
  }, []);

  // 🔥 SUBMIT REVIEW
  async function submitReview() {
    try {
      console.log("SUBMIT CLICKED");

      const res = await fetch("https://bookish-cod-rq5jpjqvjg524p6-5001.app.github.dev/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          rating,
          category: "general",
        }),
      });

      const data = await res.json();

      console.log("POST RESPONSE:", data);

      if (res.ok) {
        setReviews(prev => [data, ...prev]);

        setTitle("");
        setContent("");
        setRating(0);
      } else {
        console.error("POST FAILED:", data);
      }

    } catch (err) {
      console.error("SUBMIT ERROR:", err);
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">

      {/* HEADER */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-40 h-40 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">
            Image
          </div>

          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Business Name
            </h1>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-red-500 text-xl">★★★★☆</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Avg rating
              </span>
            </div>

            <p className="text-gray-500 text-sm">
              Category • Location
            </p>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT */}
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
                className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl shadow-sm"
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
              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-xl shadow-md h-fit sticky top-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Write a Review
          </h2>

          {/* STARS */}
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
            value={title}
            placeholder="Review title"
            className="w-full mb-3 p-2 rounded bg-white dark:bg-gray-800"
            onChange={(e)=>setTitle(e.target.value)}
          />

          <textarea
            value={content}
            placeholder="Write your review..."
            className="w-full mb-3 p-2 rounded bg-white dark:bg-gray-800"
            onChange={(e)=>setContent(e.target.value)}
          />

          <button
            onClick={submitReview}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 hover:scale-105 transition-transform">
            Submit Review
          </button>
        </div>

      </div>
    </div>
  );
}