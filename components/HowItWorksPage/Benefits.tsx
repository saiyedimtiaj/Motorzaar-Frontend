import { Award, Shield, ThumbsUp } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

const Benefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Buyer Protection",
      description:
        "Every purchase is protected by our comprehensive buyer guarantee.",
      points: [
        "Full refund for undisclosed faults",
        "Secure payment handling",
        "Verified dealers only",
        "Documentation support",
      ],
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      description:
        "Get the most competitive prices through our auction-based system.",
      points: [
        "Dealers bid against each other",
        "No dealer markup",
        "Transparent pricing",
        "Price match guarantee",
      ],
    },
    {
      icon: ThumbsUp,
      title: "Hassle-Free Process",
      description: "We handle the complexities, you enjoy the journey.",
      points: [
        "No pushy salespeople",
        "Online convenience",
        "Expert support team",
        "Streamlined paperwork",
      ],
    },
  ];
  return (
    <section className="py-16 bg-[rgb(var(--color-bg-light))] relative z-10 rounded-[var(--radius-xl)] mx-1 md:mx-6 my-6">
      <div className="max-w-7xl mx-auto px-3 md:px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-text-light))]">
            Experience the benefits of our innovative car buying solution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="md:p-8 py-8 px-4 rounded-[7px] border-2 border-[rgb(var(--color-border))] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                <benefit.icon className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
                {benefit.title}
              </h3>
              <p className="text-[rgb(var(--color-text-light))] text-lg mb-6">
                {benefit.description}
              </p>
              <ul className="space-y-3">
                {benefit.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[rgb(var(--color-cta)_/_0.1)] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                      <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:bg-white" />
                    </div>
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
