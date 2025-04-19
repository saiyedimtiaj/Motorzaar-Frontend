import { TDealerRequest } from "@/types";
import React from "react";
import { Card } from "../ui/card";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "../ui/badge";

const requestStatuses: Record<
  TDealerRequest["status"],
  { label: string; className: string }
> = {
  sent: { label: "Sent to Dealer", className: "bg-gray-100 text-gray-800" },
  viewed: { label: "Viewed by Dealer", className: "bg-gray-100 text-gray-800" },
  "price-submitted": {
    label: "Price Submitted",
    className: "bg-blue-100 text-blue-800",
  },
  "deposit-paid": {
    label: "Deposit Paid",
    className: "bg-green-100 text-green-800",
  },
  "auction-won": {
    label: "Auction Won",
    className: "bg-emerald-100 text-emerald-800",
  },
  "auction-lost": {
    label: "Auction Lost",
    className: "bg-red-100 text-red-800",
  },
  "test-drive-scheduled": {
    label: "Test Drive Scheduled",
    className: "bg-purple-100 text-purple-800",
  },
  completed: {
    label: "Sale Complete",
    className: "bg-green-100 text-green-800",
  },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800" },
};

const DepositPaidCard = ({ request }: { request: TDealerRequest }) => {
  const statusInfo = requestStatuses[request.status] || {
    label: request.status,
    className: "bg-gray-100 text-gray-800",
  };

  return (
    <Card className="p-6 bg-green-50 border-green-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-green-900">Deposit Paid</h3>
          <p className="text-sm text-green-700">
            {request.depositDate &&
              new Date(request.depositDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-green-700 font-medium">Deposit Amount</p>
          <p className="text-2xl font-bold text-green-900">£199</p>
        </div>
        <div>
          <p className="text-sm text-green-700 font-medium">Status</p>
          <Badge
            className={`text-sm font-medium px-2.5 py-0.5 rounded ${statusInfo.className}`}
          >
            {request.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default DepositPaidCard;
