import Benefits from "@/components/HowItWorksPage/Benefits";
import Hero from "@/components/HowItWorksPage/Hero";
import Steps from "@/components/HowItWorksPage/Steps";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "How it works - Motorzaar",
  keywords: "car deals, new cars, car comparison, car buying, car prices",
};

const page = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))]">
      <Hero />
      <Steps />
      <Benefits />

      {/* CTA Section */}
      <section className="bg-[rgb(var(--color-accent))] rounded-[var(--radius-xl)] py-16 overflow-hidden mx-6 my-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-base lg:text-lg font-semibold mb-8 text-[rgb(var(--color-text-light))]">
            Join thousands of satisfied customers who found their dream car
            through our platform
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/vehicles">
              Start Your Search
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default page;
