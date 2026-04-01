"use client";

import clsx from "clsx";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";

function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx(`mr-8 h-${h} w-${w} rounded-full bg-${bgColor} px-5 text-${textColor} transition-colors md:w-[158px]`)}>{text}</button>)
}

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("SUBMIT CLICKED");
    setMessage("Loading...");

    try {
      console.log("SENDING REQUEST"); 
      
      const res = await fetch(
        "https://bookish-cod-rq5jpjqvjg524p6-5001.app.github.dev/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("RESPONSE STATUS:", res.status); 
      console.log("RES.OK:", res.ok); 

      const data = await res.json();
      console.log("RESPONSE DATA:", data); 

      if (!res.ok) {
        setMessage(data.error || "Login failed");
        return;
      }

      setMessage("Login successful");
      router.push("/profile");

    } catch (err) {
      console.error("FETCH ERROR:", err); 
      setMessage("Backend not running");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex w-full max-w-3xl flex-col items-center py-10 px-10 bg-white dark:bg-black sm:items-center">
          <img
            className = "dark:bg-white rounded-lg p-2"
            src="/Critiq.svg"
            alt="critiq.js logo"
            width={100}
            height={30}
          />   
        </div>
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-5xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Log In
          </h1>

          <form 
          onSubmit = {handleSubmit}
          className="flex flex-col gap-4 w-full max-w-lg"
          >
            <input
              type="email"
              placeholder="Email"
              className="h-14 px-6 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="h-14 px-6 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="h-14 w-full rounded-full bg-red-500 px-5 text-white transition-colors hover:bg-red-600"
            >
              Log In
            </button>

            {/* msg for under display */}
            {message && (
              <p className = "mt-4 text-sm text-black dark:text-white">
                {message}
              </p>
            )}
          </form>
        </div>
        <div className="m-8 flex flex-col gap-4 text-base font-medium sm:flex-row justify-center">
          <Link
            href="/signup"
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          >
            Sign Up
          </Link>

          <Link
            href="/password"
            className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full dark:bg-white border border-solid border-black/[.08] px-8 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-auto"
          >
            Forgot Password?
          </Link>
        </div>
      </main>
    </div>
  );
}