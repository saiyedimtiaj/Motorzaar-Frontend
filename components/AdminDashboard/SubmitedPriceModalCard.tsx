import React from "react";
import { Card } from "../ui/card";
import { CheckCircle2 } from "lucide-react";
import { TDealerRequest } from "@/types";

const SubmitedPriceModalCard = ({
  submitedPrice,
}: {
  submitedPrice: TDealerRequest;
}) => {
  return (
    <Card className="py-6 px-3 md:p-6 rounded-sm bg-blue-50 border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-900">Dealer Submission</h3>
          <p className="text-sm text-blue-700">
            {new Date(submitedPrice?.createdAt as string).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-blue-700 font-medium">Submitted Price</p>
          <p className="text-2xl font-bold text-blue-900">
            £{submitedPrice?.allInPrice?.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-700 font-medium">Dealer</p>
          <p className="text-lg font-semibold text-blue-900">
            {submitedPrice?.dealerId?.fullName || "Unknown Dealer"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SubmitedPriceModalCard;
