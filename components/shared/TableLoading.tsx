import React from "react";

const TableLoading = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-start justify-between gap-4 p-4 border rounded-md"
        >
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4 dark:bg-gray-700"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 dark:bg-gray-600"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4 dark:bg-gray-600"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-2/3 dark:bg-gray-700"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 dark:bg-gray-600"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-2/5 dark:bg-gray-700"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 dark:bg-gray-600"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="h-8 w-24 bg-gray-300 rounded dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableLoading;
