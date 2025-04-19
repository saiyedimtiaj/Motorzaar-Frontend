"use client";

import { useGetOfferedWithListing } from "@/hooks/listing.hooks";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArrowUpDown, Shield, ThumbsUp } from "lucide-react";
import CarOfferTable from "./CarOfferTable";
import ListingOffersSkeleton from "./ListingOffersSkeleton";
import OfferInfoCards from "./OfferInfoCards";
import { TAddDEpositForm } from "@/types";
import Link from "next/link";
import { useMemo, useState } from "react";

const ListingOffers = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOfferedWithListing(id as string);

  const [sortBy, setSortBy] = useState<
    "priceAsc" | "priceDesc" | "dateAsc" | "dateDesc"
  >("priceAsc");

  // always define useMemo before any conditional return
  const sortedOffers = useMemo(() => {
    const offers = data?.data?.listingRequest || [];

    switch (sortBy) {
      case "priceAsc":
        return [...offers].sort((a, b) => a.allInPrice - b.allInPrice);
      case "priceDesc":
        return [...offers].sort((a, b) => b.allInPrice - a.allInPrice);
      case "dateAsc":
        return [...offers].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "dateDesc":
        return [...offers].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return offers;
    }
  }, [data?.data?.listingRequest, sortBy]);

  if (isLoading) return <ListingOffersSkeleton />;

  const allInPrices =
    data?.data?.listingRequest?.map(
      (listing: TAddDEpositForm) => listing.allInPrice
    ) || [];

  const minPrice = Math.min(...allInPrices);
  const maxPrice = Math.max(...allInPrices);

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {data?.data?.listing?.make} {data?.data?.listing?.model}
              <span className="text-lg sm:text-xl text-gray-500 font-medium ml-2">
                {data?.data?.listing?.year}
              </span>
            </h2>
            <span className="block text-base sm:text-lg font-semibold text-[rgb(var(--color-primary))] mt-1">
              {minPrice === maxPrice
                ? `£${minPrice.toLocaleString()}`
                : `From £${minPrice.toLocaleString()} - £${maxPrice.toLocaleString()}`}
            </span>
            <p className="text-sm text-gray-600 font-medium mt-1">
              {sortedOffers.length} dealer{" "}
              {sortedOffers.length === 1 ? "offer" : "offers"} available
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm w-full sm:w-auto"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>
                    {sortBy === "priceAsc"
                      ? "Price (Low)"
                      : sortBy === "priceDesc"
                      ? "Price (High)"
                      : sortBy === "dateAsc"
                      ? "Oldest First"
                      : "Newest First"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-sm" align="end">
                <DropdownMenuItem onClick={() => setSortBy("priceAsc")}>
                  Price (Lowest First)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("priceDesc")}>
                  Price (Highest First)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("dateDesc")}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("dateAsc")}>
                  Oldest First
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Change Car Button */}
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="text-sm w-full sm:w-auto justify-center"
              >
                Change Car
              </Button>
            </Link>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 mb-6 md:mb-8">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-green-100/60 text-green-800 px-3 py-1.5 rounded-full">
            <ThumbsUp className="w-3.5 h-3.5 text-green-600" />
            <span>Money Back Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-blue-100/60 text-blue-800 px-3 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Dealers</span>
          </div>
        </div>

        {/* Sorted Offer Table */}
        <CarOfferTable offers={sortedOffers} />
        <OfferInfoCards />
      </div>
    </div>
  );
};

export default ListingOffers;
