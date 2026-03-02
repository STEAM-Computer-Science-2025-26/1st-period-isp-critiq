import clsx from "clsx";
import Link from "next/link";
function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx("mr-8", `h-${h}`, `w-${w}`, `rounded-full bg-${bgColor}`, `px-6`, `text-${textColor}`, "transition-colors md:w-[158px]")}>{text}</button>)
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans  dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-10 px-10 bg-white dark:bg-black sm:items-center">
        <img
          src="/Critiq.svg"
          alt="critiq.js logo"
          width={100}
          height={30}
          className="dark:border-white/[.145] dark:bg-white dark:hover:bg-[#e6e6e6] dark:rounded-sm px-2"
        />    

        <div className="flex flex-col items-center gap-6 text-center sm:items-center sm:text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            
            {/*Red Hello Button*/}
            <Button text="Critiq" textColor="white" bgColor="red-500" w="full" h="12"></Button>
            
            A place to speak freely about those bumpy or seamless experiences.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Start Reviewing places including, {" "}
            <Link
              href="/Categories"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Hotels
            </Link>{" "}
            and {" "}
            <Link
              href="/Categories"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Restaurants,
            </Link>{" "}
            or go to all {" "}
            <Link
              href="/Categories"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Categories
            </Link> {" "}

          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/signup"
          >
            Sign Up
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:bg-white dark:hover:bg-[#e6e6e6] md:w-[158px]"
            href="/login"
          >
            Log In
          </Link>
        </div>
      </main>
    </div>
  );
}
