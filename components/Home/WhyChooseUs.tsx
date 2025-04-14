import { Coins, Car, ThumbsUp, CarFront } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Coins,
      title: "Access to the Best Prices",
      description:
        "We connect you directly with dealers bidding at auctions, ensuring you get the most competitive price without dealer markups.",
    },
    {
      icon: Car,
      title: "Wide Selection of Cars",
      description:
        "Unlike traditional dealerships with limited stock, our platform gives you access to thousands of vehicles across multiple auctions.",
    },
    {
      icon: ThumbsUp,
      title: "No Pressure, No Hassle",
      description:
        "You set your maximum budget, and dealers bid for you—no haggling, no hard sales, just transparent pricing.",
    },
    {
      icon: CarFront,
      title: "Test Drive Before You Buy",
      description:
        "Unlike other online marketplaces, you can test-drive the car at the dealer before making the final decision.",
    },
  ];

  return (
    <section className="py-16 bg-[rgb(var(--color-bg-light))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center lg:text-left">
                Why Choose Us
              </h2>
              <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))] text-center lg:text-left">
                Experience the best way to buy your next car
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="relative bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-[rgb(var(--color-cta))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="w-14 h-14 bg-[rgb(var(--color-cta)_/_0.1)] rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[rgb(var(--color-cta))] group-hover:scale-110">
                    <benefit.icon className="w-7 h-7 text-[rgb(var(--color-cta))] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[rgb(var(--color-cta))]">
                    {benefit.title}
                  </h3>
                  <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=80"
              alt="Luxury car showroom"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-8 left-8 right-8 z-20 bg-white/90 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">
                Premium Experience
              </h3>
              <p className="text-base lg:text-lg font-semibold text-[rgb(var(--color-text-light))]">
                Access exclusive deals on luxury vehicles from trusted dealers
                across the UK
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
