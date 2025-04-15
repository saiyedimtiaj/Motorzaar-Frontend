import React from "react";
import { Button } from "../ui/button";
import JoinNowButton from "./JoinNowButton";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-[rgb(var(--color-primary))] text-[rgb(var(--color-text-white))] rounded-sm md:rounded-[3rem] overflow-hidden mx-3 md:mx-6 my-6">
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight">
            Sell Cars with Zero Risk
          </h1>
          <p className="text-lg lg:text-xl font-semibold mb-8 text-[rgb(var(--color-accent))]">
            Connect with qualified buyers, increase your sales, and grow your
            business with our innovative platform, where you only buy when you
            have a customer ready.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <JoinNowButton />
            <Link href="/signin">
              <Button
                size="lg"
                className="text-lg px-8 bg-white hover:bg-white/90 text-[rgb(var(--color-primary))]"
              >
                Dealer Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
