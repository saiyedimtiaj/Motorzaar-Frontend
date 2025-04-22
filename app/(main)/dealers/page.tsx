import Benefits from "@/components/DealersPage/Benefits";
import DealerSignUp from "@/components/DealersPage/DealerSignUp";
import Hero from "@/components/DealersPage/Hero";
import HowItWorks from "@/components/DealersPage/HowItWorks";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dealers - Motorzaar",
  keywords: "car deals, new cars, car comparison, car buying, car prices",
};

const page = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Benefits />
      <DealerSignUp />

      {/* Testimonial Section */}
      <section className="py-16 bg-[rgb(var(--color-bg-light))]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl lg:text-3xl font-medium italic text-[rgb(var(--color-text))] mb-8">
              &quot;Since joining the platform, we&apos;ve seen a 40% increase
              in qualified leads and a significant boost in sales. The
              platform&apos;s approach to connecting us with serious buyers has
              transformed our business.&quot;
            </blockquote>
            <cite className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-text-light))]">
              - John Smith, Premium Motors Ltd
            </cite>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
