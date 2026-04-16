import clsx from "clsx";
import Navbar from "@/app/components/Navbar";

function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx(`mr-0 h-${h} w-${w} rounded-2xl bg-${bgColor} px-5 text-${textColor} transition-colors md:w-[158px] hover:scale-[1.5] duration-300 hover:bg-red-600 cursor-pointer`)}>{text}</button>)
}

function CategoryCard({imageSrc, title, description})
{
  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg ring-3 ring-gray-500 cursor-pointer transition-transform hover:scale-[1.05] duration-200 hover:brightness-75 dark:ring-gray-100">
      <img
        src={imageSrc}
        alt={`${title} Image`}
        width={400}
        height={30}
        className="flex dark:border-white/[.145] dark:bg-white dark:hover:bg-[#e6e6e6] dark:rounded-sm"
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

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans dark:bg-black">

      {/*Main stuff*/}
      <Navbar />
      <main className="flex-5 min-h-screen w-full flex-col items-center justify-top py-0 px-0 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">

          <h1 className="flex h-25 w-full m-1 text-5xl font-bold leading-0 tracking-tight items-center justify-center text-white dark:text-zinc-50 border-1 px-14 py-5 bg-zinc-800  hover:bg-gray-800 transition-colors ">
          Restaurants
          </h1>
          {/*First Row*/}
          <div className="flex flex-wrap items-center justify-left gap-4 mt-7 mx-5">
            {/*restaurant card*/}
            <div>
              <CategoryCard
                imageSrc="/RestaurantCard.svg"
                title="Restaurants"
                description="Amara At Paraiso, Miami"
              />
            </div>
            
            {/*restaurant card*/}
            <div>
              <CategoryCard
                imageSrc="/RestaurantCard.svg"
                title="Restaurants"
                description="Amara At Paraiso, Miami"
              />
            </div>

            {/*park card*/}
            <div>
              <CategoryCard
                imageSrc="/RestaurantCard.svg"
                title="Restaurants"
                description="Amara At Paraiso, Miami"
              />
            </div>
        
            {/*gym card*/}
            <div>
              <CategoryCard
                imageSrc="/RestaurantCard.svg"
                title="Restaurants"
                description="Amara At Paraiso, Miami"
              />
            </div>

            {/*museum card*/}
            <div>
              <CategoryCard
                imageSrc="/RestaurantCard.svg"
                title="Restaurants"
                description="Amara At Paraiso, Miami"
              />
            </div>

            {/*museum card*/}
            <div>
              <CategoryCard
                imageSrc="/RestaurantCard.svg"
                title="Restaurants"
                description="Amara At Paraiso, Miami"
              />
            </div>     
          </div>
        </div>
      </main>
    </div>
  );
}