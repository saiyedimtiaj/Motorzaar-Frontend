import { TDealerRequest } from "@/types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { offerStatuses } from "@/constant";
import ModalListingSlider from "../DealerDashboard/ModalListingSlider";
import { Card } from "../ui/card";
import AuctionStatusDetails from "./AuctionStatusDetails";

interface AuctionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car: TDealerRequest;
  pageName: string;
  setIsViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: () => void;
}

const AuctionDetailsModal = ({
  open,
  onOpenChange,
  car,
  pageName,
  setIsViewModalOpen,
  refetch,
}: AuctionDetailsModalProps) => {
  const statusInfo = offerStatuses[car.status] || {
    label: car.status,
    color: "default",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <DialogTitle className="text-2xl">
                  <div className="flex items-center flex-col md:flex-row gap-2">
                    <div>
                      {car?.listingId?.make} {car?.listingId?.model} (
                      {car?.listingId?.year})
                    </div>
                    <Badge className={`${statusInfo.className}`}>
                      {statusInfo.label}
                    </Badge>
                  </div>
                </DialogTitle>
                <div className="text-sm text-muted-foreground mt-2">
                  Offer Number: {car?.offerId}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {pageName === "submitedRequest" ? (
                    <>
                      Submitted:{" "}
                      {new Date(car?.createdAt as string).toLocaleString(
                        "en-GB"
                      )}
                    </>
                  ) : (
                    <>
                      Deposit Paid:{" "}
                      {new Date(car?.depositDate as string).toLocaleString(
                        "en-GB"
                      )}
                    </>
                  )}
                </div>
                <div className="mt-3">
                  <div className="text-sm font-medium text-blue-600">
                    All-in Price
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    £{car.allInPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Crs images slider */}
          <ModalListingSlider
            images={car?.listingId?.images}
            model={car?.listingId?.model}
            make={car?.listingId?.make}
          />

          {/* auction status card details */}
          {pageName !== "submitedRequest" && refetch && (
            <AuctionStatusDetails
              currentStatus={car?.status}
              testDriveDate={car?.testDriveDate}
              id={car?._id}
              setIsViewModalOpen={setIsViewModalOpen}
              refetch={refetch}
            />
          )}

          {/* Vehicle Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-[rgb(var(--color-border))] rounded-sm">
              <h3 className="text-xl font-bold mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Make
                  </p>
                  <p className="font-semibold">{car?.listingId?.make}</p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Model
                  </p>
                  <p className="font-semibold">{car?.listingId?.model}</p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Year
                  </p>
                  <p className="font-semibold">{car?.listingId?.year}</p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Registration
                  </p>
                  <p className="font-semibold">
                    {car?.listingId?.registration}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Previous Owners
                  </p>
                  <p className="font-semibold">{car?.listingId?.owners}</p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Mileage
                  </p>
                  <p className="font-semibold">
                    {car?.listingId?.mileage.toLocaleString()} miles
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Fuel Type
                  </p>
                  <p className="font-semibold">{car?.listingId?.fuel}</p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Transmission
                  </p>
                  <p className="font-semibold">
                    {car?.listingId?.transmission}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Color
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{
                        backgroundColor: car?.listingId?.color
                          .toLowerCase()
                          .includes("blue")
                          ? "#1e40af"
                          : car?.listingId?.color.toLowerCase().includes("red")
                          ? "#dc2626"
                          : car?.listingId?.color
                              .toLowerCase()
                              .includes("black")
                          ? "#171717"
                          : car?.listingId?.color
                              .toLowerCase()
                              .includes("silver")
                          ? "#737373"
                          : "#ffffff",
                      }}
                    />
                    <p className="font-semibold">{car?.listingId?.color}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Engine Size
                  </p>
                  <p className="font-semibold">{car?.listingId?.engineSize}</p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    MOT Expiry
                  </p>
                  <p className="font-semibold">{car?.listingId?.motExpiry}</p>
                </div>
                <div>
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    VAT Status
                  </p>
                  <p className="font-semibold">{car?.listingId?.vatStatus}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-[rgb(var(--color-border))] rounded-sm">
              <h3 className="text-xl font-bold mb-4">Auction Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Auction House
                  </p>
                  <p className="font-semibold">
                    {car?.listingId?.auctionHouse}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Auction Date
                  </p>
                  <p className="font-semibold">
                    {new Date(car?.listingId?.auctionDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    All-in Price
                  </p>
                  <p className="font-semibold text-xl text-blue-600">
                    £{car?.listingId?.allInPrice.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Deposit Amount
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-green-600">£199</p>
                    <Badge variant="secondary">Paid</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Dealer Website */}
          {car?.listingId?.dealerUrl && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Dealer Website</h3>
              <div className="overflow-x-auto">
                <a
                  href={car?.listingId?.dealerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline break-all"
                >
                  {car?.listingId?.dealerUrl}
                </a>
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Additional Details</h3>
            <p className="text-gray-700">{car?.listingId?.additionalDetails}</p>
          </div>

          {/* Car Condition */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Vehicle Condition</h3>
            <p className="text-gray-700">{car?.listingId?.carCondition}</p>
          </div>
        </div>

        {/* Status Change Confirmation Dialogs */}
      </DialogContent>
    </Dialog>
  );
};

export default AuctionDetailsModal;
