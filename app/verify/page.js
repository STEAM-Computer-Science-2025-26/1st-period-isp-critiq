import clsx from "clsx";
function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx(`mr-8 h-${h} w-${w} rounded-full bg-${bgColor} px-5 text-${textColor} transition-colors md:w-[158px]`)}>{text}</button>)
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">

        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Password sent to your email!
          </h1>
          <h1 className="max-w-xs text-1xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Did not receive an email?
            Click the button below to resend the password reset email.
          </h1>
          <form className="flex flex-col gap-4 w-full max-w-md">
            <button
              type="submit"
              className="h-12 w-full rounded-full bg-red-500 px-5 text-white transition-colors hover:bg-red-600"
            >
              Reset Password
            </button>
          </form>
        </div>
        <div className="m-8 flex flex-col gap-4 text-base font-medium sm:flex-row justify-center">
          <a
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://bookish-cod-rq5jpjqvjg524p6-3000.app.github.dev/login"
          >
            Log In
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://bookish-cod-rq5jpjqvjg524p6-3000.app.github.dev/signup"
          >
            Sign Up
          </a>
        </div>
      </main>
    </div>
  );
}   