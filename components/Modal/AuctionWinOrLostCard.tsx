import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { TDealerRequest } from "@/types";

// Status config with labels and styles
const requestStatuses: Record<
  TDealerRequest["status"],
  { label: string; className: string }
> = {
  "deposit-paid": { label: "Deposit Paid", className: "text-green-700" },
  "auction-won": { label: "Auction Won", className: "text-green-700" },
  "auction-lost": { label: "Auction Lost", className: "text-red-700" },
};

const AuctionWinOrLostCard = ({ request }: { request: TDealerRequest }) => {
  const statusInfo = requestStatuses[request.status] || {
    label: request.status,
    className: "text-gray-700",
  };

  const isWin = request.status === "auction-won";
  const isLost = request.status === "auction-lost";

  return (
    <Card
      className={cn(
        "p-6 border-2",
        isWin ? "bg-green-50 border-green-200" : "",
        isLost ? "bg-red-50 border-red-200" : ""
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "p-2 rounded-lg",
            isWin ? "bg-green-100" : "",
            isLost ? "bg-red-100" : ""
          )}
        >
          {isWin ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
        </div>
        <div>
          <h3 className={cn("text-lg font-bold", statusInfo.className)}>
            {statusInfo.label}
          </h3>
          <p className={cn("text-sm", statusInfo.className)}>
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
      {isWin && (
        <div>
          <p className="text-sm text-green-700 font-medium">Winning Price</p>
          <p className="text-2xl font-bold text-green-900">
            £{request?.allInPrice.toLocaleString()}
          </p>
        </div>
      )}
    </Card>
  );
};

export default AuctionWinOrLostCard;
