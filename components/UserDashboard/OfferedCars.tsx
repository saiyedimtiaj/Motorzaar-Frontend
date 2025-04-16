"use client";

import { useGetListingForRequest } from "@/hooks/listing.hooks";
import { TListing } from "@/types";
import Image from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import OfferedCarsSkeleton from "./OfferedCarScaleton";

const OfferedCars = () => {
  const { data, isLoading } = useGetListingForRequest();
  if (isLoading) {
    return <OfferedCarsSkeleton />;
  }
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Available Cars
          </h2>
          <p className="text-lg font-semibold text-[rgb(var(--color-text-light))]">
            Select a car to view dealer offers
          </p>
        </div>
        {data?.data?.length > 0 && (
          <p className="text-lg font-semibold text-[rgb(var(--color-text-light))]">
            {data?.data.length} cars found
          </p>
        )}
      </div>
      {/* Car Grid */}
      {data?.data?.length === 0 ? (
        <p className="text-center text-lg font-semibold text-[rgb(var(--color-text-light))] py-10">
          No cars match your criteria.
        </p>
      ) : (
        // --- GRID CHANGE IS HERE ---
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data?.data?.map((car: TListing) => (
            <Card
              key={car._id}
              className={cn(
                "flex flex-col bg-white rounded-2xl overflow-hidden border-2 border-[rgb(var(--color-border))]",
                "hover:shadow-xl transition-all duration-300",
                "transition-all duration-300 ease-in-out cursor-pointer group"
                // selectedCarId === car._id
                //   ? "ring-2 ring-[rgb(var(--color-primary))] border-[rgb(var(--color-primary))]"
                //   : ""
              )}
              role="button"
              tabIndex={0}
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                {car.images?.[0] ? (
                  <Image
                    src={car.images[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-110 p-4"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                    No Image Available
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold text-[rgb(var(--color-text))]">
                  {car.year}
                </div>
              </div>

              <div className="flex flex-col flex-grow p-6 space-y-6">
                {/* Make & Model */}
                <div className="flex-shrink-0">
                  <h3 className="text-2xl font-bold mb-0">{car.make}</h3>
                  <p className="text-lg font-medium mb-0">{car.model}</p>
                </div>

                {/* Key Specs Row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-medium text-[rgb(var(--color-text-light))]">
                  <span>{car.mileage.toLocaleString()} miles</span>
                  <span
                    className="text-[rgb(var(--color-text-light))]"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>{car.fuel}</span>
                  <span
                    className="text-[rgb(var(--color-text-light))]"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>{car.transmission}</span>
                </div>

                <div className="flex-grow"></div>

                {/* Auction Date & Dealer Offers */}
                <div className="border-t border-[rgb(var(--color-border))] pt-4 space-y-4 text-base flex-shrink-0">
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--color-text-light))] font-medium">
                      Auction Date
                    </span>
                    <span className="font-semibold">
                      {new Date(car.auctionDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--color-text-light))] font-medium">
                      Dealer Offers
                    </span>
                    <span className="font-semibold text-[rgb(var(--color-primary))]">
                      {car?.count} Available
                    </span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="border-t border-[rgb(var(--color-border))] pt-4 flex-shrink-0">
                  <div className="mb-3">
                    <p className="text-base font-medium text-[rgb(var(--color-text-light))] mb-1">
                      Est. Price Range
                    </p>
                    <p className="text-2xl font-bold">
                      {typeof car.requestId !== "string" &&
                      car.requestId?.budget?.[0] === car.requestId?.budget?.[1]
                        ? `£${car.requestId.budget[0].toLocaleString()}`
                        : typeof car.requestId !== "string"
                        ? `£${car.requestId.budget[0].toLocaleString()} - £${car.requestId.budget[1].toLocaleString()}`
                        : "Budget not available"}
                    </p>
                  </div>
                  <Link href={`/dashboard/offer/${car?._id}`}>
                    <button className="w-full cursor-pointer bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-light))] text-white py-3 px-4 rounded-xl font-semibold text-lg transition-colors">
                      View {car?.count} Dealer Offers
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferedCars;
