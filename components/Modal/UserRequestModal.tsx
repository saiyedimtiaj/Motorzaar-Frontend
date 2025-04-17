import React, { Dispatch, SetStateAction } from "react";
import { Card } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { TRequest } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const UserRequestModal = ({
  open,
  onOpenChange,
  request,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  request: TRequest;
}) => {
  const formatArray = (arr: string[] | undefined): string => {
    if (!arr || arr.length === 0) return "Any";
    return arr
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(", ");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-2">Request Details</DialogTitle>
          <DialogDescription>
            Submitted on{" "}
            {new Date(request?.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Search Type */}
          <Card className="p-4 rounded-sm sm:p-6 bg-gray-50">
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
              Search Type
            </h3>
            <p className="text-base sm:text-lg capitalize font-medium">
              {request.searchType === "specific"
                ? "Specific Car Search"
                : "General Car Search"}
            </p>
            <Badge
              className={`capitalize ${
                request?.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : request?.status === "Active"
                  ? "bg-blue-100 text-blue-800"
                  : request?.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {request?.status}
            </Badge>
          </Card>

          {/* Car Details / Types & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {request.searchType === "specific" ? (
              <Card className="p-4 rounded-sm sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3">
                  Car Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                      Make
                    </p>
                    <p className="font-semibold capitalize">{request.make}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                      Model
                    </p>
                    <p className="font-semibold capitalize">{request.model}</p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-4 rounded-sm sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3">
                  Car Types
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {request.carTypes?.map((type: string) => (
                    <Badge key={type} variant="outline" className="capitalize">
                      {type}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
            <Card className="p-4 rounded-sm sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3">
                Budget Range
              </h3>
              <p className="text-lg sm:text-xl font-bold">
                £{request.budget[0].toLocaleString()} - £
                {request.budget[1].toLocaleString()}
              </p>
            </Card>
          </div>

          {/* Preferences */}
          <Card className="p-4 rounded-sm sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Preferences
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Year Range</p>
                <p className="font-semibold">
                  {request.yearRange[0]} - {request.yearRange[1]}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Max Mileage</p>
                <p className="font-semibold">
                  {request.maxMileage?.toLocaleString() || "Any"} miles
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Fuel Types</p>
                <p className="font-semibold">
                  {formatArray(request?.fuelTypes)}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Transmission</p>
                <p className="font-semibold">
                  {formatArray(request?.transmission)}
                </p>
              </div>
              {/* Conditional fields */}
              {request.searchType === "unsure" &&
                request.preferredBrand === "yes" && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Preferred Brand
                    </p>
                    <p className="font-semibold capitalize">
                      {request?.preferredBrandMake}
                    </p>
                  </div>
                )}
            </div>
          </Card>

          {/* Part Exchange */}
          {request.hasPartExchange !== undefined && (
            <Card className="p-4 rounded-sm sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3">
                Part Exchange
              </h3>
              {request.hasPartExchange ? (
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                    Registration Provided
                  </p>
                  <p className="font-semibold">
                    {request?.partExchangeReg || "Yes (Reg not shown)"}
                  </p>
                </div>
              ) : (
                <p className="text-gray-600">No part exchange requested</p>
              )}
            </Card>
          )}
          {/* Optional: Notes/Comments */}
          {/* {request?. && (
              <CardContent className="p-4 sm:p-6">
                 <h3 className="text-base sm:text-lg font-semibold mb-3">Additional Notes</h3>
                 <p className="text-gray-700 whitespace-pre-wrap">{request.notes}</p>
              </Card>
            )} */}
        </div>
        <div className="pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserRequestModal;
