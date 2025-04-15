import { PiggyBank, ShieldCheck, TrendingUp, Users } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

const Benefits = () => {
  const benefits = [
    {
      icon: Users,
      title: "Stock Only When You Sell",
      description:
        "Forget the risk of unsold inventory—bid on auction cars only when a customer has already committed.",
    },
    {
      icon: TrendingUp,
      title: "Guaranteed Customer Commitment",
      description:
        "Our customers place a deposit before you even bid, ensuring a serious buyer is lined up.",
    },
    {
      icon: PiggyBank,
      title: "Seamless Sales Process",
      description:
        "Our platform connects you with pre-qualified customers looking for their next car—no time wasted.",
    },
    {
      icon: ShieldCheck,
      title: "No Upfront Costs",
      description:
        "We only charge a small platform fee once a sale is successfully completed.",
    },
  ];
  return (
    <section className="py-16 bg-[rgb(var(--color-bg-light))]">
      <div className="max-w-7xl mx-auto px-3 md:px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Partner With Us
          </h2>
          <p className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-text-light))]">
            Join hundreds of successful dealers already growing their business
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="w-16 h-16 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                <benefit.icon className="w-8 h-8 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
                {benefit.title}
              </h3>
              <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))]">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
