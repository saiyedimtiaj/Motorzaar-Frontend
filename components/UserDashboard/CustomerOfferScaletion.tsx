import { Card } from "../ui/card";

export default function CustomerOfferSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="p-4 sm:p-6 mb-8 w-full rounded-sm animate-pulse space-y-4"
        >
          {/* Image skeleton */}
          <div className="w-full h-48 sm:h-56 bg-gray-200 rounded-md" />

          {/* Title & badge */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-6 w-40 bg-gray-200 rounded-md" />
              <div className="h-4 w-60 bg-gray-100 rounded-md" />
              <div className="h-3 w-32 bg-gray-100 rounded-md" />
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded-md" />
          </div>

          {/* Grid info blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 bg-gray-100 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 pt-4 border-t">
            <div className="h-10 w-full sm:w-40 bg-gray-200 rounded" />
            <div className="h-10 w-full sm:w-32 bg-gray-200 rounded" />
          </div>
        </Card>
      ))}
    </>
  );
}
