import Navbar from "@/app/components/Navbar";
import Link from "next/link";

function CategoryCard({ imageSrc, title, description, rating }) {
  return (
    <div className="max-w-sm h-full flex flex-col justify-between rounded-3xl overflow-hidden shadow-lg ring-3 ring-gray-500 cursor-pointer transition-transform hover:scale-[1.05] duration-200 hover:brightness-75 dark:ring-gray-100">
      <img
        src={imageSrc}
        alt={`${title} Image`}
        className="w-full max-h-48 object-contain"
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>

        <p className="text-gray-700 text-base">
          {description}
        </p>

        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }, (_, i) => {
            const isFull = i < Math.floor(rating);
            const isHalf = i === Math.floor(rating) && rating % 1 !== 0;

            return (
              <span key={i} className="relative inline-block">
                <span className={isFull ? "text-yellow-500" : "text-gray-300"}>
                  ★
                </span>
                {isHalf && (
                  <span className="absolute inset-0 text-yellow-500 overflow-hidden w-1/2">
                    ★
                  </span>
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
  // 🔥 helper so you don’t repeat yourself
  const CardLink = ({ imageSrc, title, rating }) => (
    <Link href={`/Categories/review?name=${encodeURIComponent(title)}`}>
      <CategoryCard
        imageSrc={imageSrc}
        title={title}
        rating={rating}
      />
    </Link>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-200 font-sans">
      <main className="flex-5 min-h-screen w-full flex-col items-center bg-white">
        <Navbar />

        <div className="flex flex-col items-center text-center">

          {/* Top Rated */}
          <div className="w-full px-5 py-5">
            <h2 className="text-3xl font-bold text-left mb-4">
              Top Rated Hotels
            </h2>

            <div className="flex flex-wrap gap-4">
              <CardLink title="Hotel del Coronado, San Diego" imageSrc="/HotelCard.svg" rating={5} />
              <CardLink title="Palm House, Palm Beach" imageSrc="/PalmHouse.svg" rating={4.5} />
              <CardLink title="Bab Al Shams, Dubai" imageSrc="/BabAlShams.svg" rating={5} />
            </div>
          </div>

          {/* Popular */}
          <div className="w-full px-5 py-5">
            <h2 className="text-3xl font-bold text-left mb-4">
              Popular in Your Area
            </h2>

            <div className="flex flex-wrap gap-4">
              <CardLink title="Dallas Omni Hotel" imageSrc="/DallasHotel1.svg" rating={4.2} />
              <CardLink title="Thompson Dallas, by Hyatt" imageSrc="/DallasHotel2.svg" rating={4.0} />
              <CardLink title="The Madison, Dallas" imageSrc="/DallasHotel3.svg" rating={4.8} />
            </div>
          </div>

          {/* Budget */}
          <div className="w-full px-5 py-5">
            <h2 className="text-3xl font-bold text-left mb-4">
              Budget Friendly
            </h2>

            <div className="flex flex-wrap gap-4">
              <CardLink title="Santa Monica Hotel" imageSrc="/SantaMonicaHotel.svg" rating={5} />
              <CardLink title="La Quinta Nashville" imageSrc="/LaQuintaNashville.svg" rating={5} />
              <CardLink title="Suites Trastevere" imageSrc="/Trastevere.svg" rating={4.9} />
              <CardLink title="Tokyo Pod Hotel" imageSrc="/JapanPodHotel.svg" rating={4.7} />
            </div>
          </div>

          {/* Luxury */}
          <div className="w-full px-5 py-5">
            <h2 className="text-3xl font-bold text-left mb-4">
              Luxury Hotels
            </h2>

            <div className="flex flex-wrap gap-4">
              <CardLink title="Mandai Rainforest Hotel" imageSrc="/Mandai.svg" rating={5} />
              <CardLink title="Waldorf Astoria NYC" imageSrc="/WaldorfAstoria.svg" rating={5} />
              <CardLink title="Suites Trastevere" imageSrc="/Trastevere.svg" rating={4.9} />
              <CardLink title="Tokyo Pod Hotel" imageSrc="/JapanPodHotel.svg" rating={4.7} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}