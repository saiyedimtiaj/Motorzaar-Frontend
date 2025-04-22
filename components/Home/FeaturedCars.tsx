"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "@/components/ui/custom-toast";

export default function FeaturedCars({
  featuredCars,
}: {
  featuredCars: {
    make: string;
    model: string;
    year: string;
    image: string;
    price: string;
  }[];
}) {
  const router = useRouter();

  const handleCarClick = (make: string, model: string) => {
    // Store the selected car details in localStorage
    localStorage.setItem(
      "selectedCar",
      JSON.stringify({ make: make.toLowerCase(), model: model.toLowerCase() })
    );

    // Show success toast
    toast.success("Car selected! Taking you to customization...");

    // Navigate to vehicles page
    router.push("/vehicles");
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Cars</h2>
          <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))]">
            Explore our most popular models with great deals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCars.map((car, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl border-2 border-[rgb(var(--color-border))]"
              onClick={() => handleCarClick(car.make, car.model)}
              role="button"
              tabIndex={0}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-contain transform transition-transform duration-500 group-hover:scale-110 p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-0">{car.make}</h3>
                <p className="text-lg font-medium mb-0">{car.model}</p>
                {/* Removed the Configure Now button */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
