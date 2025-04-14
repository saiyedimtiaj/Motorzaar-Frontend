import { Car, CreditCard, Key, Users } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="bg-[rgb(var(--color-bg))] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))] mb-12">
            Finding your perfect car has never been easier
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="relative">
              <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                <Car className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
              </div>
              <span className="absolute -top-4 -left-4 w-8 h-8 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center font-bold">
                1
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
              Request Your Car & Set Your Budget
            </h3>
            <div className="space-y-2 text-[rgb(var(--color-text-light))]">
              <p className="text-base font-semibold lg:text-lg">
                Tell us the make, model, and features you want, along with your
                maximum budget.
              </p>
              <p className="text-base font-semibold lg:text-lg">
                Dealers will compete to offer you cars coming up at auction,
                with their maximum price.
              </p>
            </div>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="relative">
              <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                <Users className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
              </div>
              <span className="absolute -top-4 -left-4 w-8 h-8 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
              Choose the Best Dealer Offer
            </h3>
            <div className="space-y-2 text-[rgb(var(--color-text-light))]">
              <p className="text-base font-semibold lg:text-lg">
                Review offers from multiple dealers, each showing the maximum
                price they&apos;re willing to secure the car for.
              </p>
              <p className="text-base font-semibold lg:text-lg">
                Select the dealer who will bid on your behalf at auction.
              </p>
            </div>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="relative">
              <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                <CreditCard className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
              </div>
              <span className="absolute -top-4 -left-4 w-8 h-8 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
              Secure Your Bid with a Deposit
            </h3>
            <div className="space-y-2 text-[rgb(var(--color-text-light))]">
              <p className="text-base font-semibold lg:text-lg">
                Once you select a dealer, you place a refundable deposit.
              </p>
              <p className="text-base font-semibold lg:text-lg">
                The dealer then bids at auction—if they win it for less, you pay
                the lower price.
              </p>
              <p className="text-base font-semibold lg:text-lg">
                If they don&apos;t win the car, your deposit is fully refunded.
              </p>
            </div>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="relative">
              <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                <Key className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
              </div>
              <span className="absolute -top-4 -left-4 w-8 h-8 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center font-bold">
                4
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
              Test Drive & Confirm Purchase
            </h3>
            <div className="space-y-2 text-[rgb(var(--color-text-light))]">
              <p className="text-base font-semibold lg:text-lg">
                If the dealer wins the car, you can test-drive it before
                completing the purchase.
              </p>
              <p className="text-base font-semibold lg:text-lg">
                Complete the purchase via cash or finance (PCP, HP).
              </p>
              <p className="text-base font-semibold lg:text-lg">
                Full refund for undisclosed faults, non-refundable if you change
                your mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
