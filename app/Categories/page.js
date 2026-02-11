import clsx from "clsx";

function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx(`mr-8 h-${h} w-${w} rounded-full bg-${bgColor} px-5 text-${textColor} transition-colors md:w-[158px]`)}>{text}</button>)
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-top bg-zinc-500 font-sans dark:bg-black">
      {/**/}
      <main className="flex min-h-screen w-full flex-col items-center justify-top py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center columns-3">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          All Categories
          </h1>
          <div className="flex flex-col gap-4 w-50 max-w-md columns-3">
            <Button text="Hotels" textColor="white" bgColor="red-500" w="50" h="12"></Button>
          </div>
          <div className="flex flex-col gap-4 w-50 max-w-md columns-3">
            <Button text="Restaurants" textColor="white" bgColor="red-500" w="50" h="12"></Button>
          </div>
            <Button text="Movie Theaters" textColor="white" bgColor="red-500" w="50" h="12"></Button>
          <div className="flex flex-col gap-4 w-50 max-w-md columns-3">
            <Button text="Apartments" textColor="white" bgColor="red-500" w="50" h="12"></Button>
          </div>
        </div>
      </main>
    </div>
  );
}