import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London",
      car: "BMW 3 Series",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
      text: "Saved over £4,000 on my new BMW. The process was incredibly smooth and the dealers were very professional. I love my new car!",
      rating: 5,
    },
    {
      name: "Michael Brown",
      location: "Manchester",
      car: "Audi A4",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
      text: "Great service! Got multiple offers within hours and found the perfect deal for my budget. The test drive experience was excellent.",
      rating: 5,
    },
    {
      name: "Emma Wilson",
      location: "Birmingham",
      car: "Mercedes C-Class",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
      text: "Made car buying so much easier. No pressure from dealers and got a better price than expected. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-[rgb(var(--color-bg-light))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-text-light))]">
            Join thousands of satisfied customers who found their perfect car
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative bg-white rounded-2xl border-2 border-[rgb(var(--color-border))] overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[rgb(var(--color-primary)_/_0.1)] group-hover:text-[rgb(var(--color-primary)_/_0.2)] transition-colors duration-300" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-[rgb(var(--color-text-light))] font-semibold">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current text-[rgb(var(--color-warning))]"
                    />
                  ))}
                </div>

                <p className="text-lg font-semibold text-[rgb(var(--color-text-light))] mb-4">
                  &quot;{testimonial.text}&quot;
                </p>

                <div className="pt-4 mt-4 border-t border-[rgb(var(--color-border))]">
                  <p className="text-sm font-semibold">
                    Purchased:{" "}
                    <span className="text-[rgb(var(--color-primary))]">
                      {testimonial.car}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
