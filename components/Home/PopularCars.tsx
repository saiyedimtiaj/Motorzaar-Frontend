import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Calendar, Gauge, ArrowRight } from "lucide-react";

export default function PopularCars() {
  const cars = [
    {
      name: "BMW 3 Series",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2070&q=80",
      price: "£39,999",
      savings: "Save up to £4,500",
      specs: {
        year: "2023",
        fuel: "Hybrid",
        mileage: "10,000",
      },
      features: ["Sport Package", "Navigation", "Premium Sound"],
    },
    {
      name: "Mercedes-Benz C-Class",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2070&q=80",
      price: "£42,999",
      savings: "Save up to £5,000",
      specs: {
        year: "2023",
        fuel: "Petrol",
        mileage: "5,000",
      },
      features: ["AMG Line", "Panoramic Roof", "Digital Cockpit"],
    },
    {
      name: "Audi A4",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=2070&q=80",
      price: "£37,999",
      savings: "Save up to £4,000",
      specs: {
        year: "2023",
        fuel: "Diesel",
        mileage: "8,000",
      },
      features: ["S Line", "Virtual Cockpit", "LED Lights"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Popular Cars
            </h2>
            <p className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-text-light))]">
              Discover our most sought-after models with great savings
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2"
          >
            View All Cars <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cars.map((car, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl border-2 border-[rgb(var(--color-border))]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white border-0">
                    {car.savings}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-2xl font-bold mb-2">{car.name}</h3>
                <p className="text-3xl font-bold text-[rgb(var(--color-primary))] mb-4">
                  {car.price}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[rgb(var(--color-bg-light))] rounded-xl">
                  <div className="text-center">
                    <Calendar className="w-5 h-5 mx-auto mb-2 text-[rgb(var(--color-primary))]" />
                    <p className="text-sm font-semibold">{car.specs.year}</p>
                  </div>
                  <div className="text-center">
                    <Fuel className="w-5 h-5 mx-auto mb-2 text-[rgb(var(--color-primary))]" />
                    <p className="text-sm font-semibold">{car.specs.fuel}</p>
                  </div>
                  <div className="text-center">
                    <Gauge className="w-5 h-5 mx-auto mb-2 text-[rgb(var(--color-primary))]" />
                    <p className="text-sm font-semibold">
                      {car.specs.mileage} mi
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {car.features.map((feature, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="font-semibold bg-gray-200"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full" variant="primary">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-8 md:hidden">
          View All Cars
        </Button>
      </div>
    </section>
  );
}
