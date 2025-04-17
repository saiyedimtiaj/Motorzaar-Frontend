import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { cn } from "@/lib/utils";

const AuctionConfirmDialog = ({
  open,
  onOpenChange,
  statusToConfirm,
  handleConfirmStatus,
  isPending,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  statusToConfirm: string;
  handleConfirmStatus: (status: string) => void;
  isPending: boolean;
}) => {
  const renderDescription = () => {
    switch (statusToConfirm) {
      case "auction-won":
        return (
          <div className="space-y-4">
            <p>
              Are you sure you want to mark this vehicle as won at auction? This
              will:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Update the status to &quot;Auction Won&quot;</li>
              <li>
                Allow you to proceed with preparing the vehicle for test drive
              </li>
              <li>Notify the customer that their vehicle has been secured</li>
            </ul>
          </div>
        );
      case "auction-lost":
        return (
          <div className="space-y-4">
            <p>
              Are you sure you want to mark this vehicle as lost at auction?
              This will:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Update the status to &quot;Auction Lost&quot;</li>
              <li>Trigger the deposit refund process</li>
              <li>Notify the customer that the vehicle could not be secured</li>
            </ul>
          </div>
        );
      case "ready":
        return (
          <div className="space-y-4">
            <p>
              Are you sure the vehicle is ready for test drive and collection?
              This will:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Mark the vehicle as ready for test drive</li>
              <li>Allow the customer to schedule their test drive</li>
              <li>Send a notification to the customer</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {statusToConfirm === "auction-won"
              ? "Confirm Auction Won"
              : statusToConfirm === "auction-lost"
              ? "Confirm Auction Lost"
              : statusToConfirm === "ready"
              ? "Confirm Vehicle Ready"
              : "Confirm Status Change"}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          {renderDescription()}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleConfirmStatus(statusToConfirm)}
            disabled={isPending}
            className={cn(
              statusToConfirm === "auction-won" &&
                "bg-green-600 hover:bg-green-700",
              statusToConfirm === "auction-lost" &&
                "bg-red-600 hover:bg-red-700",
              statusToConfirm === "ready" && "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {isPending ? "Updating..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuctionConfirmDialog;
