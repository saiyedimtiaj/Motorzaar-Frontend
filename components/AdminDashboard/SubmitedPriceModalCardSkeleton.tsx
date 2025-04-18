import React from "react";
import { Card } from "../ui/card";

const SubmitedPriceModalCardSkeleton = () => {
  return (
    <Card className="py-6 px-3 md:p-6 rounded-sm bg-blue-50 border-blue-200 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <div className="w-5 h-5 bg-blue-200 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-blue-200 rounded" />
          <div className="w-48 h-3 bg-blue-100 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="w-24 h-3 bg-blue-200 rounded" />
          <div className="w-20 h-6 bg-blue-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-16 h-3 bg-blue-200 rounded" />
          <div className="w-28 h-5 bg-blue-300 rounded" />
        </div>
      </div>
    </Card>
  );
};

export default SubmitedPriceModalCardSkeleton;
