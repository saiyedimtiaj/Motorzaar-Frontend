import { Award, Coins, Shield, ThumbsUp } from "lucide-react";
import React from "react";

const OfferInfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
      {/* Pricing Info Box */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-white rounded-sm border border-blue-100 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-sm">
            <Coins className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-blue-900">
            How Pricing Works
          </h3>
        </div>
        <div className="space-y-3">
          <div className="bg-white/80 p-4 rounded-sm border border-blue-100/50">
            <p className="text-sm font-medium text-blue-900 mb-1">
              All-in Price
            </p>
            <p className="text-sm text-blue-700 leading-relaxed">
              Includes max auction bid plus a fixed dealer margin (e.g., 8%).
              You benefit if the car is won below the max bid.
            </p>
          </div>
        </div>
      </div>
      {/* Protection Info Box */}
      <div className="bg-gradient-to-br from-green-50 via-white to-white rounded-sm border border-green-100 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-sm">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-green-900">
            Your Protection
          </h3>
        </div>
        <div className="space-y-3">
          <div className="bg-white/80 p-4 rounded-sm border border-green-100/50">
            <div className="flex items-center gap-2 mb-1">
              <ThumbsUp className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p className="text-sm font-medium text-green-900">
                Money Back Guarantee
              </p>
            </div>
            <p className="text-sm text-green-700 leading-relaxed">
              Full refund for undisclosed faults or misdescriptions upon
              inspection.
            </p>
          </div>
          <div className="bg-white/80 p-4 rounded-sm border border-green-100/50">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p className="text-sm font-medium text-green-900">
                Verified Dealers
              </p>
            </div>
            <p className="text-sm text-green-700 leading-relaxed">
              All dealers are vetted for service standards and financial
              stability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferInfoCards;
