import { Car, PiggyBank, ShieldCheck, TrendingUp, Users } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-text-light))]">
            Our streamlined process makes selling cars more efficient than ever
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="relative p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-[rgb(var(--color-border))]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
              <Users className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
              Receive Pre-Qualified Requests
            </h3>
            <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))]">
              Customers tell us the car they want and their budget—no cold
              leads, just serious buyers.
            </p>
          </div>

          <div className="relative p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-[rgb(var(--color-border))]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
              <PiggyBank className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
              Bid on Auction Stock
            </h3>
            <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))]">
              We share upcoming auction cars with you, and you submit your
              all-in price, including auction hammer cost and your margin.
            </p>
          </div>

          <div className="relative p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-[rgb(var(--color-border))]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
              <ShieldCheck className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
              Customer Confirms & Pays a Deposit
            </h3>
            <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))]">
              Once a customer selects your offer, they pay a deposit to secure
              the deal.
            </p>
          </div>

          <div className="relative p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-[rgb(var(--color-border))]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
              <Car className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
              Win the Car at Auction
            </h3>
            <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))]">
              Bid at auction knowing you have a committed buyer. If you win for
              less, the customer benefits from a lower price.
            </p>
          </div>

          <div className="relative p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-[rgb(var(--color-border))]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center font-bold">
              5
            </div>
            <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
              <TrendingUp className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
              Complete the Sale
            </h3>
            <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))]">
              The customer test-drives and completes the purchase via cash or
              finance (PCP, HP). If they don&apos;t proceed, you receive a
              rebate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
