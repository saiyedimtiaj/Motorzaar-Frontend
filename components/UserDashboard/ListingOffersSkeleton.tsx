// components/Loading/ListingOffersSkeleton.tsx

const ListingOffersSkeleton = () => {
  return (
    <div className="space-y-6 md:space-y-8 pb-10 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div className="space-y-2">
            <div className="h-6 w-60 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="h-10 w-full sm:w-40 bg-gray-200 rounded" />
            <div className="h-10 w-full sm:w-40 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6 md:mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded-full" />
          <div className="h-8 w-44 bg-gray-200 rounded-full" />
        </div>

        {/* Table Skeleton */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="block sm:table-row border-b border-gray-100 p-4 sm:p-6"
              >
                {/* Mobile Skeleton */}
                <div className="sm:hidden space-y-4">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-36 bg-gray-200 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="h-5 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <div className="h-9 w-full bg-gray-200 rounded" />
                    <div className="h-9 w-full bg-gray-200 rounded" />
                  </div>
                </div>

                {/* Desktop Skeleton */}
                <div className="hidden sm:table-row sm:divide-x">
                  <div className="h-6 w-full bg-gray-200 rounded my-2" />
                  <div className="h-6 w-full bg-gray-200 rounded my-2" />
                  <div className="h-6 w-full bg-gray-200 rounded my-2" />
                  <div className="h-6 w-full bg-gray-200 rounded my-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingOffersSkeleton;
