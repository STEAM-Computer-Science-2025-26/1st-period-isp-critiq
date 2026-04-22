import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import clsx from "clsx";

function CategoryCard({imageSrc, title, description, rating})
{
  return (
    <div className="max-w-sm h-full flex flex-col justify-between rounded-3xl overflow-hidden shadow-lg ring-3 ring-gray-500 cursor-pointer transition-transform hover:scale-[1.05] duration-200 hover:brightness-75 dark:ring-gray-100">
      <img
        src={imageSrc}
        alt={`${title} Image`}
        // constrain to card width and allow height to adjust, using contain to avoid cropping
        className="w-full max-h-48 object-contain"
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">
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
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans">
      {/*Main stuff*/}
      <main className="flex-5 min-h-screen w-full flex-col items-center justify-top py-0 px-0 bg-white">
        <Navbar />
        <div className="flex flex-col items-center gap-0 text-center">
          {/* Most Reviewed Hotels */}
          <div className="w-full px-5 py-5">
            <h2 className="text-3xl font-bold text-left mb-4">Top Rated Hotels</h2>
            <div className="flex flex-wrap items-stretch justify-left gap-4 overflow-visible h-auto">
              <Link href="/Categories/review">
              <div>
                <CategoryCard
                  imageSrc="/HotelCard.svg"
                  title="Hotel del Coronado, San Diego"
                  rating={5}
                />
              </div>
              </Link>
              <div>
                <CategoryCard
                  imageSrc="/PalmHouse.svg"
                  title="Palm House, Palm Beach"
                  rating={4.5}

                />
              </div>
              <div>
                <CategoryCard
                  imageSrc="/BabAlShams.svg"
                  title="Bab Al Shams, Dubai"
                  rating={5}
                />
              </div>
            </div>
          </div>

          {/* Popular in Your Area */}
          <div className="w-full px-5 py-5">
            <h2 className="text-3xl font-bold text-left mb-4">Popular in Your Area</h2>
            <div className="flex flex-wrap items-stretch justify-left gap-4 overflow-visible h-auto">
              <div>
                <CategoryCard
                  imageSrc="/DallasHotel1.svg"
                  title="Dallas Omni Hotel"
                  rating={4.2}
                />
              </div>
              <div>
                <CategoryCard
                  imageSrc="/DallasHotel2.svg"
                  title="Thompson Dallas, by Hyatt"
                  rating={4.0}
                />
              </div>
              <div>
                <CategoryCard
                  imageSrc="/DallasHotel3.svg"
                  title="The Madison, Dallas"
                  rating={4.8}
                />
              </div>
            </div>
          </div>

          {/* Top Rated Hotels */}
          <div className="w-full px-5 py-5">
            <h2 className="text-3xl font-bold text-left mb-4">Budget Friendly</h2>
            <div className="flex flex-wrap items-stretch justify-left gap-4 overflow-visible h-auto">
              <div>
                <CategoryCard
                  imageSrc="/HotelCard.svg"
                  title="Luxury Resort X"
                  rating={5}
                />
              </div>
              <div>
                <CategoryCard
                  imageSrc="/PalmHouse.svg"
                  title="Boutique Hotel Y"
                  rating={4.9}
                />
              </div>
              <div>
                <CategoryCard
                  imageSrc="/BabAlShams.svg"
                  title="Historic Inn Z"
                  rating={4.7}
                />
              </div>
            </div>
          </div>

          {/*First Row*/}
          <div className="flex flex-wrap items-stretch justify-left gap-4 my-5 mx-5 px-4 overflow-visible h-auto">
            
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
                imageSrc="/HotelCard.svg"
                title="Hotels"
                rating={3}
              />
            </div>

            {/*Card 5*/}
            <div>
              <CategoryCard
                imageSrc="/HotelCard.svg"
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