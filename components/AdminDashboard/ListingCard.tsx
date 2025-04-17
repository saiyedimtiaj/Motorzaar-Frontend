import Image from "next/image";
import { Card } from "../ui/card";
import { TListing, TRequest } from "@/types";
import { Clock, Edit, Loader2, Send, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { useCountdown } from "@/hooks/use-countdown";
import { Badge } from "../ui/badge";
import {
  useUpdateListing,
  useUpdateListingStatus,
} from "@/hooks/listing.hooks";
import { toast } from "../ui/custom-toast";
import AddListingModal from "../Modal/add-listing-modal";
import { Dispatch, SetStateAction, useState } from "react";

function ListingCard({
  listing,
  request,
  refetch,
  selectedListing,
  setSelectedListing,
}: {
  listing: TListing;
  request: TRequest;
  refetch: () => void;
  selectedListing: TListing;
  setSelectedListing: Dispatch<SetStateAction<TListing | null>>;
}) {
  const { timeLeft } = useCountdown(listing?.auctionDate);
  const [showEditListing, setShowEditListing] = useState(false);
  const { mutate, isPending } = useUpdateListingStatus();
  const { mutate: updateListing, isPending: isEditPanding } =
    useUpdateListing();
  const handleStatus = () => {
    mutate(listing._id, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.message);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const handleSubmit = (formData: FormData) => {
    updateListing(
      { id: selectedListing?._id as string, formData },
      {
        onSuccess: (data) => {
          if (data?.success) {
            toast.success(data?.message);
            refetch();
          } else {
            toast.error(data?.message);
          }
        },
      }
    );
  };

  return (
    <Card className="py-6 px-4 md:p-6 rounded-sm">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="relative w-full h-full md:w-48 md:h-32 rounded-sm overflow-hidden">
          <Image
            src={listing.images[0]}
            alt={`${listing.make} ${listing.model}`}
            className="object-cover w-full h-full"
            width={300}
            height={300}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold">
                {listing.make} {listing.model}
              </h3>
              <p className="text-muted-foreground">
                {listing.year} • {listing.mileage?.toLocaleString() || "0"}{" "}
                miles
              </p>
            </div>
            <Badge
              className={status === "Pending" ? "bg-gray-300" : ""}
              variant={
                listing.status === "Approved"
                  ? "destructive"
                  : listing.status === "Listed"
                  ? "default"
                  : "secondary"
              }
            >
              {listing.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">Auction House</p>
              <p className="font-medium">{listing.auctionHouse}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Time Until Auction
              </p>
              <div className="flex items-center gap-1 font-medium">
                <Clock className="w-4 h-4" />
                {timeLeft}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">All-in Price</p>
              <p className="font-medium">
                £{listing.allInPrice?.toLocaleString() || "0"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span className="font-medium">{listing.status}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center flex-col gap-3 md:flex-row items-center md:justify-end mt-4">
            {request.status === "new" && (
              <>
                <Button
                  disabled={
                    isPending || listing.status !== "Pending" || isEditPanding
                  }
                  variant="outline"
                  className="md:mr-2 flex items-center gap-2"
                  onClick={() => {
                    setSelectedListing(listing);
                    setShowEditListing(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Edit Listing
                </Button>
                <Button
                  onClick={handleStatus}
                  disabled={
                    isPending || listing.status !== "Pending" || isEditPanding
                  }
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" />
                      Sending...
                    </span>
                  ) : (
                    "  Send to Dealer"
                  )}

                  <Send className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {selectedListing && (
        <AddListingModal
          open={showEditListing}
          onOpenChange={setShowEditListing}
          requestDetails={request}
          onSubmit={handleSubmit}
          mode="edit"
          isPending={isEditPanding}
          initialData={selectedListing}
        />
      )}
    </Card>
  );
}

export default ListingCard;
