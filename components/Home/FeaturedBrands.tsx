"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

const featuredBrands = [
  {
    make: "Mazda",
    model: "Sportage",
    image: "https://www.carlogos.org/car-logos/mazda-logo.png",
    price: "£9,995",
    year: "2018",
  },
  {
    make: "Nissan",
    model: "Juke",
    image: "https://www.carlogos.org/car-logos/nissan-logo.png",
    price: "£9,995",
    year: "2018",
  },
  {
    make: "Audi",
    model: "A3",
    image: "https://www.carlogos.org/car-logos/audi-logo.png",
    price: "£9,495",
    year: "2018",
  },
  {
    make: "Mercedes-Benz",
    model: "A-Class",
    image: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
    price: "£9,995",
    year: "2018",
  },
];

export default function FeaturedBrands() {
  const router = useRouter();

  const handleCarClick = (make: string, model: string) => {
    // Store the selected car details in localStorage
    localStorage.setItem(
      "selectedCar",
      JSON.stringify({
        make: make.toLowerCase(),
        model: model.toLocaleLowerCase,
      })
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
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Brands
          </h2>
          <p className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-text-light))]">
            Explore our most popular models with great deals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBrands.map((car, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl border-2 border-[rgb(var(--color-border))]"
              onClick={() => handleCarClick(car.make, car.model)}
              role="button"
              tabIndex={0}
            >
              <div className="relative h-32 overflow-hidden p-4">
                <Image
                  src={car.image}
                  alt={`${car.make}`}
                  fill
                  className="object-contain transform transition-transform duration-500 group-hover:scale-105 p-2"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-0">{car.make}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
