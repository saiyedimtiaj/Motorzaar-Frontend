import { Card } from "@/components/ui/card";
import { Car, CreditCard, Key, Users } from "lucide-react";
import React from "react";

const Steps = () => {
  const steps = [
    {
      icon: Car,
      title: "Request Your Car & Set Your Budget",
      description:
        "Tell us the make, model, and features you want, along with your maximum budget.",
      details: [
        "Specify your exact requirements or let us help you find the right car",
        "Set your maximum budget - you'll never pay more than this",
        "Choose from specific models or browse by car type",
        "Add preferences like fuel type, transmission, and mileage",
      ],
    },
    {
      icon: Users,
      title: "Choose the Best Dealer Offer",
      description:
        "Review offers from multiple dealers, each showing their maximum price.",
      details: [
        "Compare offers from verified dealers across the UK",
        "See transparent pricing with no hidden fees",
        "View dealer ratings and reviews",
        "Get detailed information about each car",
      ],
    },
    {
      icon: CreditCard,
      title: "Secure Your Bid with a Deposit",
      description: "Place a refundable deposit to secure your chosen offer.",
      details: [
        "Deposit is fully refundable if the dealer doesn't win the car",
        "Secure payment process with buyer protection",
        "Deposit confirms your commitment to purchase",
        "Clear terms and conditions for peace of mind",
      ],
    },
    {
      icon: Key,
      title: "Test Drive & Complete Purchase",
      description:
        "Test drive the car and complete the purchase if you're happy.",
      details: [
        "Inspect and test drive before final commitment",
        "Choose from various payment options (cash, finance)",
        "Complete documentation with dealer support",
        "Drive away in your new car",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 md:px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-text-light))]">
            Finding your perfect car has never been easier
          </p>
        </div>

        <div className="grid gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative border-2 border-[rgb(var(--color-border))] overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="absolute top-6 left-6 w-10 h-10 bg-[rgb(var(--color-cta))] text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                {index + 1}
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-8 pl-20">
                  <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                    <step.icon className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-[rgb(var(--color-text-light))] text-lg">
                    {step.description}
                  </p>
                </div>
                <div className="md:w-2/3 px-4 py-7 md:p-8 bg-gradient-to-br from-blue-50 to-white border-l-2 border-[rgb(var(--color-border))]">
                  <div className="grid md:grid-cols-2 gap-3 md:gap-6">
                    {step.details.map((detail, i) => (
                      <div
                        key={i}
                        className="bg-white p-4 rounded-sm md:rounded-xl border border-[rgb(var(--color-border)] shadow-sm hover:shadow-sm transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[rgb(var(--color-cta)_/_0.1)] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                            <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:bg-white" />
                          </div>
                          <span className="text-base font-medium leading-tight transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
                            {detail}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
