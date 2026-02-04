export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">

        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Log In
          </h1>
          <form className="flex flex-col gap-4 w-full max-w-md">
            <input
              type="email"
              placeholder="Email"
              className="h-12 px-4 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="h-12 px-4 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              required
            />
            <button
              type="submit"
              className="h-12 w-full rounded-full bg-red-500 px-5 text-white transition-colors hover:bg-red-600"
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="#"
          >
            Sign Up
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </main>
    </div>
  );
}