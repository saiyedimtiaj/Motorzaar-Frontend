import React, { Dispatch, SetStateAction } from "react";
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
import { useParams } from "next/navigation";
import Link from "next/link";

const DepositConfirmationModal = ({
  open,
  onOpenChange,
  details,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  details: {
    allInPrice: number;
    make: string;
    model: string;
    fullName: string;
    id: string;
  };
}) => {
  const { listingId } = useParams();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[100vh] overflow-y-auto sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl sm:text-3xl font-bold text-center">
            Secure Your Car
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6">
          {/* Price Box */}
          <div className="bg-blue-50 rounded-sm py-4 px-3 sm:py-6 sm:px-6 border-2 border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-blue-900">
                All-in Price
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-700">
                £{details?.allInPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-blue-900">
                Deposit Required
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                £199
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold">
              What happens next?
            </h4>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  color: "bg-blue-100 text-blue-600",
                  text: `By placing your deposit, you authorize ${details.fullName} to bid for this ${details.make} ${details.model} at auction on your behalf.`,
                },
                {
                  step: "2",
                  color: "bg-green-100 text-green-600",
                  text: `If successful, the car is reserved for you at the agreed All-in Price. You’ll inspect and test drive before finalizing the purchase.`,
                },
                {
                  step: "3",
                  color: "bg-amber-100 text-amber-600",
                  text: `If the dealer doesn’t win the auction, your £199 deposit is fully refunded within 3 working days.`,
                },
              ].map(({ step, color, text }) => (
                <div
                  key={step}
                  className="flex items-start gap-3 p-4 bg-white rounded-sm border-2 border-gray-100"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}
                  >
                    <span className="font-semibold">{step}</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <AlertDialogFooter className="pt-6">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Link href={`/vehicles/listing/${listingId}/checkout`}>
            <AlertDialogAction className="bg-green-600 md:w-auto w-full hover:bg-green-700">
              Pay £199 Deposit
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DepositConfirmationModal;
