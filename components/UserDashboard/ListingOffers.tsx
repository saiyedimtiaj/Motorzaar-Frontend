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

const ListingOffers = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOfferedWithListing(id as string);

  if (isLoading) {
    return <ListingOffersSkeleton />;
  }

  const allInPrice = data?.data?.listingRequest?.map(
    (listing: TAddDEpositForm) => listing.allInPrice
  );
  const minPrice = Math.min(...allInPrice);
  const maxPrice = Math.min(...allInPrice);

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header (remains responsive) */}
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
                : `From £${minPrice.toLocaleString()} - £${maxPrice?.toLocaleString()}`}
            </span>
            <p className="text-sm text-gray-600 font-medium mt-1">
              {data?.data?.listingRequest?.length} dealer{" "}
              {data?.data?.listingRequest?.length === 1 ? "offer" : "offers"}{" "}
              available
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
                    {/* Sort: {sortField === 'allInPrice' ? 'Price' : 'Rating'}
            {sortOrder === 'asc' ? ' (Asc)' : ' (Desc)'} */}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Price (Lowest First)</DropdownMenuItem>
                <DropdownMenuItem>Price (Highest First)</DropdownMenuItem>
                <DropdownMenuItem>Rating (Highest First)</DropdownMenuItem>
                <DropdownMenuItem>Rating (Lowest First)</DropdownMenuItem>
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

        {/* Protection Badges (remains responsive) */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 mb-6 md:mb-8">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-green-100/60 text-green-800 px-3 py-1.5 rounded-full">
            {" "}
            {/* Subtle Green */}
            <ThumbsUp className="w-3.5 h-3.5 text-green-600" />
            <span>Money Back Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-blue-100/60 text-blue-800 px-3 py-1.5 rounded-full">
            {" "}
            {/* Subtle Blue */}
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Dealers</span>
          </div>
        </div>
        {/* Offered table */}
        <CarOfferTable offers={data?.data?.listingRequest} />
        <OfferInfoCards />
      </div>
    </div>
  );
};

export default ListingOffers;
