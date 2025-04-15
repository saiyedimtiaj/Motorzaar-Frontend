import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-[rgb(var(--color-primary))] text-[rgb(var(--color-text-white))] rounded-[var(--radius-xl)] py-16 overflow-hidden mx-3 md:mx-6 my-6">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          How Our Car Buying Process Works
        </h1>
        <p className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-accent))] mb-8">
          A better approach to car buying that puts you in control
        </p>
        <Button asChild variant="secondary" size="lg">
          <Link href="/vehicles">
            Start Your Search
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
