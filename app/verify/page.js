import clsx from "clsx";
import Link from 'next/link';
function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx(`mr-8 h-${h} w-${w} rounded-full bg-${bgColor} px-5 text-${textColor} transition-colors md:w-[158px]`)}>{text}</button>)
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center py-32 px-16 bg-white">
        <div className="flex w-full max-w-3xl flex-col items-center py-10 px-10 bg-white sm:items-center">
          <img
            src="/Critiq.svg"
            alt="critiq.js logo"
            width={100}
            height={30}
          />   
        </div>
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-5xl font-semibold leading-10 tracking-tight text-black">
            Verify Your Account
          </h1>
          <h2 className="max-w-xs text-lg text-zinc-500">
            If you did not receive the code, please check your spam folder or request a new one.
          </h2>
          <form className="flex flex-col gap-6 w-full max-w-md">
            <input
              type="text"
              placeholder="Verification Code"
              className="h-14 px-4 rounded-full border border-zinc-300 bg-white text-black "
              required
            />
            <button
              type="submit"
              className="h-14 w-full rounded-full bg-red-500 px-5 text-white transition-colors hover:bg-red-600"
            >
              Verify
            </button>
            <button
              type="button"
              className="h-14 w-full rounded-full bg-zinc-200 px-5 text-black transition-colors hover:bg-zinc-300"
            >
              Resend Code
            </button>
            <div className="m-8 flex flex-col gap-4 text-base font-medium sm:flex-row justify-center">
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] md:w-[158px]"
            href="/signup"
          >
            Sign Up
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center whitespace-nonwrap rounded-full border border-solid border-black/[.08] px-8 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-auto"
            href="/login"
          >
            Back to Log In
          </Link>
        </div>
          </form>
        </div>
      </main>
    </div>
  );
}   