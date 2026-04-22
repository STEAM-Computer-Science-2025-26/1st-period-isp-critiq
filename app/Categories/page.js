"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";

function CategoryCard({imageSrc, title, description})
{
  return (
    <div className="w-80 h-[18rem] rounded-3xl overflow-hidden shadow-lg ring-3 ring-gray-500 cursor-pointer transition-transform hover:scale-[1.05] duration-200 hover:brightness-75 flex flex-col">
      <img
        src={imageSrc}
        alt={`${title} Image`}
        className="w-full h-48 object-cover"
      />

      <div className="flex-1 px-6 py-4 flex flex-col">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base flex-1">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans">
      {/*Main stuff*/}
      <main className="flex-5 min-h-screen w-full flex-col items-center justify-top bg-white">
        <Navbar />
        
        <div className="flex flex-col items-center gap-0 text-center">

          <div className="flex flex-wrap items-center justify-center gap-4 mt-7 mx-5">
            <Link href="/Categories/Hotels">
              <div>
                {/*Card 1*/}
                <div>
                  <CategoryCard
                    imageSrc="/HotelCard.svg"
                    title="Hotels"
                    description="Hotel Del Coronado, San Diego"
                  />
                </div>
              </div>
            </Link>
            
            {/*restaurant card*/}
            <Link href ="/Categories/Restaurants">
              <div>
                <CategoryCard
                  imageSrc="/RestaurantCard.svg"
                  title="Restaurants"
                  description="Amara At Paraiso, Miami"
                />
              </div>
            </Link>

            {/*park card*/}
            <Link href ="/Categories/Parks">
              <div>
                <CategoryCard
                  imageSrc="/ParkCard.svg"
                  title="Parks"
                  description="Central Park, New York City"
                />
              </div>
            </Link>
          </div>

          {/*Second Row*/}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-7 mx-5">
            {/*gym card*/}
            <div>
              <CategoryCard
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