import FeaturedBrands from "@/components/Home/FeaturedBrands";
import FeaturedCars from "@/components/Home/FeaturedCars";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const featuredCars = [
  {
    make: "Kia",
    model: "Sportage",
    image:
      "https://cdn.bipicar.com/specificvehicleplans/6682929d975dd7dcb29cc8ef/secondary-images/67321910586238dc73c191cd_2024_11_11_15_47_44.png",
    price: "£9,995",
    year: "2018",
  },
  {
    make: "Nissan",
    model: "Juke",
    image:
      "https://cdn.bipicar.com/specificvehicleplans/63aade4fb39b8c37240c34ba/secondary-images/6552533ae7668472f733f7d0_2023_11_13_17_47_54.png",
    price: "£9,995",
    year: "2018",
  },
  {
    make: "Audi",
    model: "A3",
    image:
      "https://cdn.bipicar.com/specificvehicleplans/663a0ae0d10fe765a50e9d5e/secondary-images/6661755fa239900b340c8441_2024_06_06_10_37_51.png",
    price: "£9,495",
    year: "2018",
  },
  {
    make: "Mercedes-Benz",
    model: "A-Class",
    image:
      "https://cdn.bipicar.com/specificvehicleplans/673efa92a5df1307dcab563f/secondary-images/67bdf03a929645fe1958933b_2025_02_25_17_30_50.png",
    price: "£9,995",
    year: "2018",
  },
];

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCars featuredCars={featuredCars} />
      <HowItWorks />
      <WhyChooseUs />
      <FeaturedBrands />
      <section className="bg-[rgb(var(--color-accent))] rounded-[3rem] py-16 overflow-hidden mx-6 my-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Next Car?
          </h2>
          <p className="text-base lg:text-lg font-semibold mb-8 text-[rgb(var(--color-text-light))]">
            Join thousands of happy customers who saved money on their car
            purchase
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/vehicles">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
