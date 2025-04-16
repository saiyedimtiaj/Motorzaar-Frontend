"use client";

import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

const SkeletonCard = () => (
  <Card
    className={cn(
      "flex flex-col bg-white rounded-2xl overflow-hidden border-2 border-[rgb(var(--color-border))]",
      "animate-pulse"
    )}
  >
    {/* Image Section */}
    <div className="relative w-full aspect-[16/10] bg-gray-200" />

    <div className="flex flex-col flex-grow p-6 space-y-6">
      {/* Title */}
      <div>
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-2" />
        <div className="h-5 w-1/4 bg-gray-200 rounded" />
      </div>

      {/* Specs Row */}
      <div className="flex space-x-3">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-10 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>

      <div className="flex-grow" />

      {/* Auction & Offers */}
      <div className="space-y-4 border-t border-[rgb(var(--color-border))] pt-4">
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Price & Action */}
      <div className="border-t border-[rgb(var(--color-border))] pt-4 space-y-3">
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-6 w-1/2 bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-300 rounded-xl" />
      </div>
    </div>
  </Card>
);

const OfferedCarsSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 w-40 bg-gray-200 rounded mb-2" />
          <div className="h-5 w-64 bg-gray-200 rounded" />
        </div>
        <div className="h-5 w-24 bg-gray-200 rounded" />
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default OfferedCarsSkeleton;
