/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { TDealerRequest, TListing, TRequest } from "@/types";
import AddListingModal from "./add-listing-modal";
import {
  useGetListingsByRequsetId,
  useNewListing,
} from "@/hooks/listing.hooks";
import { toast } from "../ui/custom-toast";
import ListingCard from "../AdminDashboard/ListingCard";
import { useGetSubmitedPriceByRequestId } from "@/hooks/dealerRequest.hooks";
import SubmitedPriceModalCardSkeleton from "../AdminDashboard/SubmitedPriceModalCardSkeleton";
import SubmitedPriceModalCard from "../AdminDashboard/SubmitedPriceModalCard";
import DepositPaidCard from "./DepositPaidCard";
import AuctionWinOrLostCard from "./AuctionWinOrLostCard";

interface RequestListingsProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  request: TRequest;
}

function RequestListingsComponent({
  open,
  onOpenChange,
  request,
}: RequestListingsProps) {
  const {
    data,
    isLoading,
    refetch: listingRefetch,
  } = useGetListingsByRequsetId(request?._id);
  const [showAddListing, setShowAddListing] = useState(false);
  const { mutate: createListing, isPending } = useNewListing();
  const [selectedListing, setSelectedListing] = useState<TListing | null>(null);
  const { data: submitedPriceData, isLoading: isSubmitedPriceDataLoading } =
    useGetSubmitedPriceByRequestId(request?._id);

  const handleSubmit = (formData: FormData) => {
    createListing(formData, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast.success(data?.message);
          setShowAddListing(false);
          listingRefetch();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const depositPaidData = submitedPriceData?.data?.filter(
    (request: TDealerRequest) => request.status === "deposit-paid"
  );

  const auctionData = submitedPriceData?.data?.filter(
    (request: TDealerRequest) =>
      request.status === "auction-won" || request.status === "auction-lost"
  );

  console.log(auctionData);

  if (!request) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-[90vh] md:max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">
              Car Listings for Request #{request._id}
            </DialogTitle>
            <div className="flex flex-col md:flex-row items-center md:gap-2 mt-2 text-muted-foreground">
              <span className="font-medium">
                {request.userId?.fullName || "Unknown User"}
              </span>
              <span className="hidden md:block">•</span>
              <span>{request.userId?.email || "No email provided"}</span>
            </div>
          </DialogHeader>

          <div className="mt-6">
            {request.status === "new" && (
              <Button
                onClick={() => {
                  setShowAddListing(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Car Listing
              </Button>
            )}
          </div>

          <div className="mt-6">
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Search Criteria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Common criteria for both search types */}
                <div>
                  <p className="text-sm text-muted-foreground">Search Type</p>
                  <p className="font-medium capitalize">
                    {request?.searchType || "Not specified"}
                  </p>
                </div>

                {/* Specific car details */}
                {request.searchType === "specific" && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Make & Model
                    </p>
                    <p className="font-medium capitalize">
                      {request?.make || "Not specified"} {request?.model || ""}
                    </p>
                  </div>
                )}

                {/* Car types for unsure search */}
                {request?.searchType === "unsure" &&
                  request?.carTypes?.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Car Types</p>
                      <p className="font-medium capitalize">
                        {request?.carTypes.join(", ")}
                      </p>
                    </div>
                  )}

                {/* Budget */}
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-medium">
                    £{(request?.budget?.[0] || 0).toLocaleString()} - £
                    {(request?.budget?.[1] || 0).toLocaleString()}
                  </p>
                </div>

                {/* Year Range */}
                <div>
                  <p className="text-sm text-muted-foreground">Year Range</p>
                  <p className="font-medium">
                    {request?.yearRange?.[0] || "Not specified"} -{" "}
                    {request?.yearRange?.[1] || "Not specified"}
                  </p>
                </div>

                {/* Fuel Types */}
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Types</p>
                  <p className="font-medium capitalize">
                    {request?.fuelTypes?.join(", ") || "Not specified"}
                  </p>
                </div>

                {/* Transmission */}
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium capitalize">
                    {request?.transmission?.join(", ") || "Not specified"}
                  </p>
                </div>

                {/* Maximum Mileage */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    Maximum Mileage
                  </p>
                  <p className="font-medium">
                    Up to {request?.maxMileage?.toLocaleString() || "0"} miles
                  </p>
                </div>

                {/* Part Exchange */}
                {request?.hasPartExchange !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Part Exchange
                    </p>
                    <p className="font-medium">
                      {request.hasPartExchange
                        ? request.partExchangeReg
                          ? `Yes - ${request.partExchangeReg}`
                          : "Yes - Reg needed"
                        : "No"}
                    </p>
                  </div>
                )}

                {/* Preferred Brand for unsure search */}
                {request?.searchType === "unsure" && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Preferred Brand
                    </p>
                    <p className="font-medium">
                      {request?.preferredBrand === "yes"
                        ? request?.preferredBrandMake ||
                          "Yes - Brand not selected"
                        : "No preference"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {isSubmitedPriceDataLoading ? (
                <SubmitedPriceModalCardSkeleton />
              ) : data?.data?.length > 0 ? (
                submitedPriceData?.data?.map((request: TDealerRequest) => (
                  <SubmitedPriceModalCard
                    submitedPrice={request}
                    key={request?._id}
                  />
                ))
              ) : (
                ""
              )}

              {/* Show deposit information if available */}
              {depositPaidData?.map((request: TDealerRequest) => (
                <DepositPaidCard request={request} key={request?._id} />
              ))}

              {/* Show auction result if available */}
              {auctionData?.map((request: TDealerRequest) => (
                <AuctionWinOrLostCard key={request?._id} request={request} />
              ))}

              {/* Show test drive details if available */}
              {/* {request.status === "test-drive-scheduled" &&
                request.testDriveDate && (
                  <Card className="p-6 bg-purple-50 border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-purple-900">
                          Test Drive Scheduled
                        </h3>
                        <p className="text-sm text-purple-700">
                          {new Date(request.testDriveDate).toLocaleDateString(
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
                  </Card>
                )} */}
              {/* car listing */}
              {isLoading ? (
                <SubmitedPriceModalCardSkeleton />
              ) : (
                data?.data?.map((listing: TListing) => (
                  <ListingCard
                    key={listing._id}
                    listing={listing}
                    request={request}
                    refetch={listingRefetch}
                    setSelectedListing={setSelectedListing}
                    selectedListing={selectedListing!}
                  />
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {request.status === "new" && (
        <>
          <AddListingModal
            open={showAddListing}
            onOpenChange={setShowAddListing}
            requestDetails={request}
            onSubmit={handleSubmit}
            mode="add"
            isPending={isPending}
          />
        </>
      )}
    </>
  );
}

export default RequestListingsComponent;
