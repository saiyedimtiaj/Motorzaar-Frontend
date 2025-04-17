import React from "react";

const SkeletonBox = ({ className }: { className: string }) => (
  <div
    className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}
  />
);

const UserRequestScaleton = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded-sm border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-6 space-y-4"
        >
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-2">
              <SkeletonBox className="h-5 w-1/3" />
              <SkeletonBox className="h-4 w-2/3" />
            </div>
            <div className="space-y-2">
              <SkeletonBox className="h-5 w-20" />
              <SkeletonBox className="h-3 w-32" />
            </div>
          </div>

          {/* Car Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            {[...Array(5)].map((_, idx) => (
              <div key={idx}>
                <SkeletonBox className="h-3 w-1/2 mb-1" />
                <SkeletonBox className="h-4 w-3/4" />
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
            <SkeletonBox className="h-4 w-40" />
            <SkeletonBox className="h-4 w-32" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
            <SkeletonBox className="h-9 w-28" />
            <SkeletonBox className="h-9 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserRequestScaleton;
