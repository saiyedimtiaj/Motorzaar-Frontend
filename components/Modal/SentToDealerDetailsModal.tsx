import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TDealerRequest, TRequest, TUser } from "@/types";
import SubmitedPriceModalCard from "../AdminDashboard/SubmitedPriceModalCard";
import SubmitedPriceModalCardSkeleton from "../AdminDashboard/SubmitedPriceModalCardSkeleton";
import { useGetSubmitedPriceByRequestId } from "@/hooks/dealerRequest.hooks";

const SentToDealerDetailsModal = ({
  open,
  request,
  onOpenChange,
  userData,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  request: TRequest;
  userData: TUser;
}) => {
  const { data: submitedPriceData, isLoading: isSubmitedPriceDataLoading } =
    useGetSubmitedPriceByRequestId(request?._id);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[90vh] md:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            Car Listings for Request
          </DialogTitle>
          <div className="flex flex-col md:flex-row items-center md:gap-2 text-muted-foreground">
            <span className="font-medium">
              {userData.fullName || "Unknown User"}
            </span>
            <span className="hidden md:block">•</span>
            <span>{userData.email || "No email provided"}</span>
          </div>
        </DialogHeader>

        <div className="">
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
                  <p className="text-sm text-muted-foreground">Make & Model</p>
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
                <p className="text-sm text-muted-foreground">Maximum Mileage</p>
                <p className="font-medium">
                  Up to {request?.maxMileage?.toLocaleString() || "0"} miles
                </p>
              </div>

              {/* Part Exchange */}
              {request?.hasPartExchange !== undefined && (
                <div>
                  <p className="text-sm text-muted-foreground">Part Exchange</p>
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
            ) : submitedPriceData?.data?.length > 0 ? (
              submitedPriceData?.data?.map((request: TDealerRequest) => (
                <SubmitedPriceModalCard
                  submitedPrice={request}
                  key={request?._id}
                />
              ))
            ) : (
              ""
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SentToDealerDetailsModal;
