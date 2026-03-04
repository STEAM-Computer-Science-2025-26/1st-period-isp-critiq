import clsx from "clsx";

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
      {/**/}
      
      <main className="flex min-h-screen w-full flex-col items-center justify-top py-10 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">

          <h1 className="max-w-s text-5xl font-bold leading-10 tracking-tight text-white dark:text-zinc-50 border-1 px-14 py-5 rounded-xl bg-red-600 hover:bg-red-500 transition-colors ring ring-1 ring-offset-3 ring-offset-black ring-white-600 hover:ring-white-500 cursor-pointer">
          Browse All Categories
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-7 mx-5">
            {/*hotel card*/}
            <div>
              <CategoryCard
                imageSrc="/HotelImage.svg"
                title="Hotels"
                description="Hotel Del Coronado, San Diego"
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
                imageSrc="/ParkCard.svg"
                title="Parks"
                description="Central Park, New York City"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-7 mx-5">
            {/*gym card*/}
            <div>
              <CategoryCard
                className="object-fill"
                imageSrc="/GymCard.svg"
                title="Gyms"
                description="Planet Fitness, Los Angeles"
              />
            </div>

            {/*museum card*/}
            <div>
              <CategoryCard
                imageSrc="/MuseumCard.svg"
                title="Museums"
                description="Wadsworth Anthenem, Hartford "
              />
            </div>  
          </div>
        </div>
      </main>
    </div>
  );
}