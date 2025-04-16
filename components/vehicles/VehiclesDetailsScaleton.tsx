import React from "react";

const VehiclesDetailsScaleton = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))] py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
          <div className="h-10 w-32 bg-gray-300 rounded-md" />
          <div className="flex items-center gap-4">
            <div className="h-8 w-48 bg-gray-300 rounded-md" />
            <div className="h-8 w-48 bg-gray-300 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-8 space-y-8">
            {/* Slider Placeholder */}
            <div className="w-full h-64 bg-gray-300 rounded-md" />

            {/* Key Features */}
            <div className="bg-white p-6 md:p-8 rounded-sm space-y-6">
              <div className="h-6 w-40 bg-gray-300 rounded" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx}>
                    <div className="h-4 w-20 bg-gray-300 mb-2 rounded" />
                    <div className="h-6 w-24 bg-gray-400 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white p-6 md:p-8 rounded-sm space-y-6">
              <div className="h-6 w-48 bg-gray-300 rounded" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="h-4 w-28 bg-gray-300 rounded" />
                    <div className="h-5 w-32 bg-gray-400 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Condition & Additional Details */}
            <div className="bg-white p-6 md:p-8 rounded-sm space-y-4">
              <div className="h-6 w-64 bg-gray-300 rounded" />
              <div className="space-y-4">
                <div className="h-4 w-32 bg-gray-300 rounded" />
                <div className="h-20 bg-gray-200 rounded" />
                <div className="h-4 w-48 bg-gray-300 rounded" />
                <div className="h-24 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-16">
              <div className="bg-white p-6 rounded-sm space-y-6">
                <div className="space-y-2">
                  <div className="h-6 w-36 bg-gray-400 rounded" />
                  <div className="h-5 w-24 bg-gray-300 rounded" />
                </div>

                <div className="border-t border-b py-6 space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg space-y-3">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    {[...Array(3)].map((_, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <div className="h-3 w-24 bg-gray-300 rounded" />
                        <div className="h-4 w-24 bg-gray-400 rounded" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg space-y-3">
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-24 bg-gray-300 rounded" />
                      <div className="h-4 w-20 bg-gray-400 rounded" />
                    </div>
                  </div>
                </div>

                <div className="h-10 w-full bg-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesDetailsScaleton;
