import { useCountdown } from "@/hooks/use-countdown";
import { useState } from "react";
import { toast } from "../ui/custom-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TAddDEpositForm, TListing } from "@/types";
import {
  useAddDeposit,
  useGetDepositDetails,
} from "@/hooks/dealerRequest.hooks";
import { useUser } from "@/lib/user.provider";

interface ViewOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  offer: TListing;
  refetchListing: () => void;
}

export default function ViewOfferDialog({
  open,
  onOpenChange,
  offer,
  refetchListing,
}: ViewOfferDialogProps) {
  const [allInPrice, setAllInPrice] = useState("");
  const {
    data,
    isLoading,
    refetch: refetchDepositDEtails,
  } = useGetDepositDetails(offer?._id);
  const { user } = useUser();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { mutate, isPending } = useAddDeposit();
  const { timeLeft } = useCountdown(offer?.auctionDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(allInPrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    const formData: TAddDEpositForm = {
      dealerId: user?._id as string,
      listingId: offer?._id,
      userId: offer?.userId as string,
      requestId:
        typeof offer.requestId === "string"
          ? offer?.requestId
          : offer.requestId._id,
      status: "Approved",
      allInPrice: Number(allInPrice),
    };
    mutate(formData, {
      onSuccess: (data) => {
        if (data?.success) {
          refetchListing();
          refetchDepositDEtails();
          toast.success(data?.message);
          onOpenChange(false);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  console.log(offer);

  const handleImageScroll = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedImageIndex((prev) =>
        prev > 0 ? prev - 1 : offer.images.length - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev < offer.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vh] md:max-w-5xl w-full h-[90vh] overflow-y-auto flex flex-col py-6 px-4">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <div>
                <DialogTitle className="text-2xl">
                  {offer.make} {offer.model} ({offer.year})
                </DialogTitle>
                <div className="text-sm text-muted-foreground mt-2">
                  Registration: {offer.registration}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Request submitted: {new Date().toLocaleString("en-GB")}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative bg-black rounded-sm overflow-hidden group">
            <Image
              src={offer.images[selectedImageIndex]}
              alt={`${offer.make} ${offer.model}`}
              className="w-full h-full object-contain"
              width={500}
              height={500}
            />
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleImageScroll("prev")}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleImageScroll("next")}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full font-medium">
              {selectedImageIndex + 1}/{offer.images.length}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {offer.images.map((image: string, index: number) => (
              <div
                key={index}
                className={`relative cursor-pointer rounded-sm overflow-hidden border-2 ${
                  selectedImageIndex === index
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  width={200}
                  height={200}
                  src={image}
                  alt={`${offer.make} ${offer.model} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Vehicle Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 md:p-6 border-2 border-[rgb(var(--color-border))] rounded-sm">
              <h3 className="text-xl font-bold mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <Label>Make</Label>
                  <p className="font-medium">{offer.make}</p>
                </div>
                <div>
                  <Label>Model</Label>
                  <p className="font-medium">{offer.model}</p>
                </div>
                <div>
                  <Label>Year</Label>
                  <p className="font-medium">{offer.year}</p>
                </div>
                <div>
                  <Label>Registration</Label>
                  <p className="font-medium">{offer.registration}</p>
                </div>
                <div>
                  <Label>Registration Date</Label>
                  <p className="font-medium">
                    {new Date(offer.regDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <Label>Mileage</Label>
                  <p className="font-medium">
                    {offer.mileage.toLocaleString()} miles
                  </p>
                </div>
                <div>
                  <Label>Previous Owners</Label>
                  <p className="font-medium">{offer.owners}</p>
                </div>
                <div>
                  <Label>Fuel Type</Label>
                  <p className="font-medium">{offer.fuel}</p>
                </div>
                <div>
                  <Label>Transmission</Label>
                  <p className="font-medium">{offer.transmission}</p>
                </div>
                <div>
                  <Label>Color</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{
                        backgroundColor: offer.color
                          .toLowerCase()
                          .includes("blue")
                          ? "#1e40af"
                          : offer.color.toLowerCase().includes("red")
                          ? "#dc2626"
                          : offer.color.toLowerCase().includes("black")
                          ? "#171717"
                          : offer.color.toLowerCase().includes("silver")
                          ? "#737373"
                          : "#ffffff",
                      }}
                    />
                    <p className="font-medium">{offer.color}</p>
                  </div>
                </div>
                <div>
                  <Label>Engine Size</Label>
                  <p className="font-medium">{offer.engineSize}</p>
                </div>
                <div>
                  <Label>MOT Expiry</Label>
                  <p className="font-medium">
                    {new Date(offer.motExpiry).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <Label>VAT Status</Label>
                  <p className="font-medium">{offer.vatStatus}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-[rgb(var(--color-border))] rounded-sm">
              <h3 className="text-xl font-bold mb-4">Auction Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Auction House</Label>
                  <p className="font-medium">{offer.auctionHouse}</p>
                </div>
                <div>
                  <Label>Auction Date</Label>
                  <p className="font-medium">
                    {new Date(offer.auctionDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Dealer Website */}
          {offer.dealerUrl && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Dealer Website</h3>
              <a
                href={offer.dealerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {offer.dealerUrl}
              </a>
            </div>
          )}

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Details</h3>
            <p className="text-gray-700">{offer.additionalDetails}</p>
          </div>

          {/* Car Condition */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vehicle Condition</h3>
            <p className="text-gray-700">{offer.carCondition}</p>
          </div>

          {/* Additional Dealer Details */}
          {offer.additionalDealerDetails && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Additional Dealer Details
              </h3>
              <p className="text-gray-700">{offer.additionalDealerDetails}</p>
            </div>
          )}

          {/* Price Input */}
          <Card className="py-6 px-3 md:p-6 border-2 border-[rgb(var(--color-border))] rounded-sm bg-blue-50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Submit Your Offer</h3>
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Customer Budget
                  </p>
                  <p className="text-xl font-bold text-blue-700">
                    £$
                    {typeof offer.requestId !== "string" &&
                      offer?.requestId?.budget[0]}{" "}
                    - £{" "}
                    {typeof offer.requestId !== "string" &&
                      offer?.requestId?.budget[1]}{" "}
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4 mb-4">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Clock className="w-5 h-5" />
                  <p className="font-medium">
                    Time remaining to submit offer: {timeLeft}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="allInPrice">Your All-in Price (£)</Label>
                {isLoading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
                  </div>
                ) : data?.data ? (
                  <p className="text-xl font-semibold">
                    {data?.data?.allInPrice}
                  </p>
                ) : (
                  <>
                    <Input
                      id="allInPrice"
                      type="number"
                      value={allInPrice}
                      onChange={(e) => setAllInPrice(e.target.value)}
                      placeholder="Enter your all-in price"
                      className="text-lg bg-white"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      This should include your margin and all fees
                    </p>
                  </>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isPending}
                >
                  {isPending ? "Submitting..." : "Submit Price"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
