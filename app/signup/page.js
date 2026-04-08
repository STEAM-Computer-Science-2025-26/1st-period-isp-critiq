"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Button({ text, textColor, bgColor, w, h }) {
  return (
    <button
      className={clsx(
        `mr-8 h-${h} w-${w} rounded-full bg-${bgColor} px-5 text-${textColor} transition-colors md:w-[158px]`
      )}
    >
      {text}
    </button>
  );
}

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();


  async function handleSubmit(e) {
    e.preventDefault();

    console.log("SUBMIT CLICKED");
    setMessage("Loading...");

    try {
      console.log("SENDING REQUEST"); 

      const res = await fetch(
        "https://bookish-cod-rq5jpjqvjg524p6-5001.app.github.dev/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      console.log("RESPONSE STATUS:", res.status); 
      console.log("RES.OK:", res.ok); 

      const data = await res.json();
      console.log("RESPONSE DATA:", data); 

      if (!res.ok) {
        setMessage(data.error || "Signup failed");
        //this above is returning duplicate key value violates unique constraint "user_base_email_key"
        return;
      }

      setMessage("Signup successful");
      router.push("/login");

    } catch (err) {
      console.error("FETCH ERROR:", err); 
      setMessage("Backend not running");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white">
        <div className="flex w-full max-w-3xl flex-col items-center py-10 px-10 bg-white sm:items-center">
          <img
            className = "rounded-lg p-2"
            src="/Critiq.svg"
            alt="critiq.js logo"
            width={100}
            height={30}
          />
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-5xl font-semibold leading-10 tracking-tight text-black">
            Sign Up
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <input
              type="Text"
              placeholder="Username"
              required
              className="h-14 px-6 rounded-full border border-zinc-300 bg-white text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              required
              className="h-14 px-6 rounded-full border border-zinc-300 bg-white text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="h-14 px-6 rounded-full border border-zinc-300 bg-white text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="h-14 w-full rounded-full bg-red-500 px-5 text-white transition-colors hover:bg-red-600"
            >
              Sign Up
            </button>

            {message && (
              <p className="text-sm text-black">
                {message}
              </p>
            )}
          </form>
        </div>

        <div className="m-8 flex flex-col gap-4 text-base font-medium sm:flex-row justify-center">
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] md:w-[158px]"
            href="/login"
          >
            Log In
          </Link>

          <Link
            className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full border border-solid border-black/[.08] px-8 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-auto"
            href="/password"
          >
            Forgot Password?
          </Link>
        </div>
      </main>
    </div>
  );
}