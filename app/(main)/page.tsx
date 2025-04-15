import FeaturedBrands from "@/components/Home/FeaturedBrands";
import FeaturedCars from "@/components/Home/FeaturedCars";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCars />
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
