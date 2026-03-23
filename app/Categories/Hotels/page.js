import clsx from "clsx";

function Button({text, textColor, bgColor, w, h})
{
  return (<button className={clsx(`mr-0 h-${h} w-${w} rounded-2xl bg-${bgColor} px-5 text-${textColor} transition-colors md:w-[158px] hover:scale-[1.5] duration-300 hover:bg-red-600 cursor-pointer`)}>{text}</button>)
}

function CategoryCard({imageSrc, title, description, rating})
{
  return (
    <div className="max-w-sm h-full flex flex-col justify-between rounded-3xl overflow-hidden shadow-lg ring-3 ring-gray-500 cursor-pointer transition-transform hover:scale-[1.05] duration-200 hover:brightness-75 dark:ring-gray-100">
      <img
        src={imageSrc}
        alt={`${title} Image`}
        // constrain to card width and allow height to adjust, using contain to avoid cropping
        className="w-full max-h-48 object-contain dark:border-white/[.145] dark:bg-white dark:hover:bg-[#e6e6e6] dark:rounded-sm"
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 dark:text-white">{title}</div>
          <p className="text-gray-700 text-base dark:text-white">
            {description}
          </p>
          <div className="flex items-center mt-2">
            {Array.from({length: 5}, (_, i) => {
              const isFull = i < Math.floor(rating);
              const isHalf = i === Math.floor(rating) && rating % 1 !== 0;
              const isEmpty = i >= Math.ceil(rating);
              return (
                <span key={i} className="relative inline-block">
                  <span className={isFull ? "text-yellow-500" : "text-gray-300"}>★</span>
                  {isHalf && (
                    <span className="absolute inset-0 text-yellow-500 overflow-hidden w-1/2">★</span>
                  )}
                </span>
              );
            })}
          </div>
          <div>{rating}</div>
        </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans dark:bg-black">
      {/*Sidebar*/}
      <aside className="w-50 min-h-screen bg-gray-100 dark:bg-zinc-900 px-6 py-10 flex flex-col gap-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white text-red-500 hover:text-black transition-colors">Navigate</h2>
        <nav className="flex flex-col gap-3">
          <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">Main</a>
          <a href="/login" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">Login</a>
          <a href="/signup" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">Signup</a>
          <a href="/change-password" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">Change Password</a>
          <a href="/Categories/Hotels" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">Hotels</a>
          <a href="/Categories/Restaurants" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">Restaurants</a>
          <a href="/Categories/Gyms" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">Gyms</a>
          <a href="/Categories/Parks" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">Parks</a>
          <a href="/Categories/Museums" className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">Museums</a>
        </nav>
      </aside>

      {/*Main stuff*/}
      <main className="flex-5 min-h-screen w-full flex-col items-center justify-top py-0 px-0 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">

          <h1 className="flex h-25 w-full m-1 text-5xl font-bold leading-0 tracking-tight items-center justify-center text-white dark:text-zinc-50 border-1 px-14 py-5 bg-zinc-800  hover:bg-gray-800 transition-colors ">
          Hotels
          </h1>
          {/*First Row*/}
          <div className="flex flex-wrap items-stretch justify-left gap-4 my-5 mx-5 px-4 overflow-visible h-auto">
            {/*Card 1*/}
            <div>
              <CategoryCard
                imageSrc="/HotelImage.svg"
                title="Hotel del Coronado, San Diego"
                rating={5}
                className="m-4"
              />
            </div>
            
            {/*Card 2*/}
            <div>
              <CategoryCard
                imageSrc="/PalmHouse.svg"
                title="Palm House, Palm Beach"
                rating={4.5}
              />
            </div>

            {/*Card 3*/}
            <div>
              <CategoryCard
                imageSrc="/BabAlShams.svg"
                title="Bab Al Shams, Dubai"
                rating={5}
              />
            </div>

            {/*Card 4*/}
            <div>
              <CategoryCard
                imageSrc="/HotelImage.svg"
                title="Hotels"
                rating={3}
              />
            </div>

            {/*Card 5*/}
            <div>
              <CategoryCard
                imageSrc="/HotelImage.svg"
                title="Hotels"
                rating={4.2}
                />
            </div>    
          </div>
        </div>
      </main>
    </div>
  );
}