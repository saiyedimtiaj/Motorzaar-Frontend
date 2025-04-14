import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-full md:h-[550px] bg-[rgb(var(--color-primary))] text-[rgb(var(--color-text-white))] rounded-[20px] md:rounded-[3rem] overflow-hidden ml-3 mr-0 md:mx-6 my-6">
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight">
              Find Your Perfect Car at the Best Price
            </h1>
            <p className="text-lg lg:text-xl font-semibold mb-8 text-[rgb(var(--color-accent))]">
              Compare offers from trusted dealers and save thousands on your
              next car
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/vehicles" className="inline-flex items-center">
                Find a car
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="grid gap-6">
              <div className="relative h-[150px] md:h-[180px] lg:h-[200px] rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  fill
                  src="https://www.dennishorton.co.uk/skoda/img/new-cars/thumbs-new/fabia%20motab%20thumb.png"
                  alt="Car"
                  className="w-full h-full object-contain px-4 transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-[150px] md:h-[180px] lg:h-[200px] rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  fill
                  src="https://carvia-public.s3.eu-central-1.amazonaws.com/vehicle-types/c0girzzjswheoauwxlgd.webp"
                  alt="Car"
                  className="w-full h-full object-contain px-4 transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
