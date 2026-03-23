import clsx from "clsx";
import Link from "next/link";

function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx("mr-8", `h-${h}`, `w-${w}`, `rounded-full bg-${bgColor}`, `px-6`, `text-${textColor}`, "transition-colors md:w-[158px]")}>{text}</button>)
}

function CategoryCard({imageSrc, title, description, w, h})
{
  return (
    <div className="rounded-3xl overflow-hidden shadow-lg ring-3 ring-gray-500 dark:ring-gray-100 bg-white w-full">
      <img
        src={imageSrc}
        alt={`${title} Image`}
        width={w}
        height={h}
        className="flex w-full h-auto aspect-video object-cover rounded-3xl dark:border-white/[.145] dark:bg-white dark:hover:bg-[#e6e6e6]"
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 dark:text-white">{title}</div>
          <p className="text-gray-700 text-base dark:text-white">
            {description}
          </p>
        </div>
    </div>
  );
}

// utility component for the two side panels
function ScrollingSide({ categories, side = "left" }) {
  const list = [...categories, ...categories];
  const positionClass = side === "left" ? "left-0" : "right-0";

  // both sides use upwards scrolling
  const animationClass = "animate-scrollUp";

  return (
    <div
      className={clsx(
        "absolute top-0 h-full w-64 overflow-hidden",
        positionClass,
        // make sure the panels sit behind the main content
        "z-0"
      )}
    >
      <div className={`${animationClass} flex flex-col`}> 
        {list.map((card, index) => (
          <div key={index} className="m-7 px-1 py-1 bg-white bg-rounded-lg overflow-hidden rounded-lg shadow-md">
            <CategoryCard
              imageSrc={card.imageSrc}
              title={card.title}
              description={card.description}
              w="full"
              h="32"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  // shared data for both sides
  const sideCategories = [
    {
      imageSrc: "/HotelImage.svg",
      title: "Hotels",
      description: "Find the best places to stay.",
    },
    {
      imageSrc: "/RestaurantCard.svg",
      title: "Restaurants",
      description: "Discover amazing dining spots.",
    },
    {
      imageSrc: "/ParkCard.svg",
      title: "Parks",
      description: "Find the best places under the sun.",
    },
    {
      imageSrc: "/GymCard.svg",
      title: "Gyms",
      description: "Stay fit and healthy.",
    },
    {
      imageSrc: "/GymCard.svg",
      title: "Gyms",
      description: "Stay fit and healthy.",
    },
    {
      imageSrc: "/GymCard.svg",
      title: "Gyms",
      description: "Stay fit and healthy.",
    },
  ];

  const leftCategories = sideCategories;
  const rightCategories = sideCategories;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white font-sans">
      {/* left scroll panel */}
      <ScrollingSide className = "mr-5" categories={leftCategories} side="left"/>
      
      <main className="relative z-10 flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-10 px-4 sm:px-8 md:px-10 lg:px-10 mx-auto bg-white dark:bg-red-300 sm:items-center">
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
              href="/Categories/Hotels"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Hotels
            </Link>{" "}
            and {" "}
            <Link
              href="/Categories/Restaurants"
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
      {/* right scroll panel */}
      <ScrollingSide categories={rightCategories} side="right" />
    </div>
  );
}
