import clsx from "clsx";
import Link from "next/link";
import Navbar from "./components/Navbar.js";

function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx("mr-8", `h-${h}`, `w-${w}`, `rounded-full bg-${bgColor}`, `px-6`, `text-${textColor}`, "transition-colors md:w-[158px]")}>{text}</button>)
}

function CategoryCard({imageSrc, title, w, h})
{
  return (
    <div className="overflow-hidden shadow-lg ring-3 ring-gray-500 bg-white w-full">
      <img
        src={imageSrc}
        alt={`${title} Image`}
        width={w}
        height={h}
        className="flex w-full h-auto aspect-video object-cover"
      />
    </div>
  );
}

// vertical continuous scrolling side panels
function SideScrollPanel({ categories, side = "left" }) {
  const list = [...categories, ...categories];
  const positionClass = side === "left" ? "left-0" : "right-0";

  return (
    <div className={`absolute inset-y-0 w-72 overflow-hidden py-0 ${positionClass} z-0`}>
      <div className="animate-scrollDown flex flex-col gap-0">
        {list.map((card, index) => (
          <div key={`${side}-${index}`} className="overflow-hidden shadow-lg bg-white ring-1 ring-gray-200">
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
  <Navbar />
  const sideCategories = [
    {
      imageSrc: "/HotelImage.svg"
    },
    {
      imageSrc: "/RestaurantCard.svg"
    },
    {
      imageSrc: "/ParkCard.svg"
    },
    {
      imageSrc: "/GymCard.svg"
    },
    {
      imageSrc: "/MuseumCard.svg"
    },
    {
      imageSrc: "/GymCard.svg",
      title: "Gyms",
      description: "Stay fit and healthy.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen items-center justify-center bg-white font-sans">
        <SideScrollPanel className = "mr-5" categories={sideCategories} side="left"/>
        <SideScrollPanel className = "mr-5" categories={sideCategories} side="right"/>
        <SideScrollPanel className = "mr-5" categories={sideCategories} side="left"/>
        <SideScrollPanel className = "mr-5" categories={sideCategories} side="right"/>
        
      <main className="relative z-10 flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-10 px-4 sm:px-8 md:px-10 lg:px-10 mx-auto bg-white sm:items-center">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
        </h1><div className="flex flex-col items-center gap-6 text-center sm:items-center sm:text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            
            {/*Red Critiq Button*/}
            <Button text="Critiq" textColor="white" bgColor="red-500" w="full" h="12"></Button>
            
            Discover hidden gems, and share your honest reviews.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600">
            Rate and review your favorite places including {" "}
            <Link
              href="/Categories/Hotels"
              className="font-medium text-zinc-950"
            >
              Hotels
            </Link>{" "}
            and {" "}
            <Link
              href="/Categories/Restaurants"
              className="font-medium text-zinc-950"
            >
              Restaurants
            </Link>{" "}
            or browse all {" "}
            <Link
              href="/Categories"
              className="font-medium text-zinc-950"
            >
              Categories
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row justify-center pt-6">
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full bg-black text-white px-5 transition-colors hover:bg-black/[.80] md:w-[158px]"
            href="/signup"
          >
            Sign Up
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-[158px]"
            href="/login"
          >
            Log In
          </Link>
        </div>
      </main>
    </div>
    </>
  );
}
