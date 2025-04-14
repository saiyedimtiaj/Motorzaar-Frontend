import Image from "next/image";
import { Card } from "../ui/card";
import { TListing, TRequest } from "@/types";
import { Clock, Edit, Loader2, Send, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { useCountdown } from "@/hooks/use-countdown";
import { Badge } from "../ui/badge";
import { useUpdateListingStatus } from "@/hooks/listing.hooks";
import { toast } from "../ui/custom-toast";

function ListingCard({
  listing,
  onEdit,
  request,
  refetch,
}: {
  listing: TListing;
  onEdit: (listing: TListing) => void;
  request: TRequest;
  refetch: () => void;
}) {
  const { timeLeft } = useCountdown(listing?.auctionDate);
  const { mutate, isPending } = useUpdateListingStatus();
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

  return (
    <Card className="py-6 px-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="relative w-full h-full md:w-48 md:h-32 rounded-lg overflow-hidden">
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
                  variant="outline"
                  className="md:mr-2 flex items-center gap-2"
                  onClick={() => onEdit?.(listing)}
                >
                  <Edit className="w-4 h-4" />
                  Edit Listing
                </Button>
                <Button
                  onClick={handleStatus}
                  disabled={isPending}
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
    </Card>
  );
}

export default ListingCard;
