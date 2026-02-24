import clsx from "clsx";
import Link from 'next/link';
function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx(`mr-8 h-${h} w-${w} rounded-full bg-${bgColor} px-5 text-${textColor} transition-colors md:w-[158px]`)}>{text}</button>)
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex w-full max-w-3xl flex-col items-center py-10 px-10 bg-white dark:bg-black sm:items-center">
          <img
            src="/Critiq.svg"
            alt="critiq.js logo"
            width={100}
            height={30}
          />   
        </div>
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-5xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Sign Up
          </h1>
          <form className="flex flex-col gap-4 w-full max-w-md">
            <input
              type="email"
              placeholder="Email"
              className="h-14 px-6 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="h-14 px-6 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              required
            />
            <button
              type="submit"
              className="h-14 w-full rounded-full bg-red-500 px-5 text-white transition-colors hover:bg-red-600"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="m-8 flex flex-col gap-4 text-base font-medium sm:flex-row justify-center">
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/login"
          >
            Log In
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center whitespace-nonwrap rounded-full border border-solid border-black/[.08] px-8 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-auto"
            href="/password"
          >
            Forgot Password?
          </Link>
        </div>
      </main>
    </div>
  );
}