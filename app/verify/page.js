import clsx from "clsx";

function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx(`mr-8 h-${h} w-${w} rounded-full bg-${bgColor} px-5 text-${textColor} transition-colors md:w-[158px]`)}>{text}</button>)
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">

        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Verify Your Account
          </h1>
          <form className="flex flex-col gap-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Verification Code"
              className="h-12 px-4 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              required
            />
            <button
              type="submit"
              className="h-12 w-full rounded-full bg-red-500 px-5 text-white transition-colors hover:bg-red-600"
            >
              Verify
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}   