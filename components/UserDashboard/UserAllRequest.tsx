"use client";

import { Car, Eye, MessageSquare, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useGetAllUserRequest } from "@/hooks/request.hooks";
import { TRequest } from "@/types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import UserRequestScaleton from "../Modal/UserRequestScaleton";
import { useState } from "react";
import UserRequestModal from "../Modal/UserRequestModal";

const UserAllRequest = () => {
  const { data, isLoading } = useGetAllUserRequest();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [requestDetails, setRequestDetails] = useState<TRequest | null>(null);

  if (isLoading) {
    return <UserRequestScaleton />;
  }

  console.log(data);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <Card className="p-4 sm:p-6 border border-gray-200 rounded-sm shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search by Make, Model, or Type..."
              className="pl-9 w-full"
              aria-label="Search requests"
            />
          </div>
        </div>
      </Card>

      {/* Requests List */}
      <div className="space-y-6">
        {data?.data?.length > 0 ? (
          data?.data?.map((request: TRequest) => (
            <Card
              key={request?._id}
              className="overflow-hidden rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4 sm:p-6 space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-semibold">
                      {request?.searchType === "specific" ? (
                        <span className="capitalize">
                          {request?.make} {request?.model}
                        </span>
                      ) : (
                        "General Search"
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {request?.searchType === "specific"
                        ? "Specific Car Request"
                        : `Types: ${request?.carTypes?.join(", ") || "Any"}`}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
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
                    <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                      ID: {request?._id}
                    </p>
                  </div>
                </div>

                {/* Car Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 text-sm pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="font-medium">
                      £{request?.budget?.[0]?.toLocaleString?.() || "N/A"} - £
                      {request?.budget?.[1]?.toLocaleString?.() || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Year Range</p>
                    <p className="font-medium">
                      {request?.yearRange?.[0] || "N/A"} -{" "}
                      {request?.yearRange?.[1] || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Max Mileage</p>
                    <p className="font-medium">
                      {request?.maxMileage?.toLocaleString() || "Any"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel</p>
                    <p
                      className="font-medium capitalize truncate"
                      title={request?.fuelTypes?.join(", ")}
                    >
                      {request?.fuelTypes?.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Transmission</p>
                    <p
                      className="font-medium capitalize truncate"
                      title={request?.transmission?.join(", ")}
                    >
                      {request?.transmission?.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Submitted:{" "}
                    {new Date(request?.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-sm font-medium ${
                      request.count! > 0 ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      {request?.count} dealer{" "}
                      {request?.count === 1 ? "offer" : "offers"} found
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
                  <Button
                    onClick={() => {
                      setIsDetailsModalOpen(true);
                      setRequestDetails(request);
                    }}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {request.count! > 0 && (
                    <Link href={`/dashboard/offer/${request?.listingId}`}>
                      <Button className="w-full sm:w-auto">View Offers</Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="px-4 rounded-sm py-8 md:p-8 text-center border-2 border-dashed border-gray-300 bg-gray-50">
            <Car className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-700">
              No Car Requests Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Ready to find your perfect car? Submit your first request, and
              dealers will start sending offers.
            </p>
            <Link href={`/vehicles`}>
              <Button>Create Your First Request</Button>
            </Link>
          </Card>
        )}
      </div>
      {requestDetails && (
        <UserRequestModal
          onOpenChange={setIsDetailsModalOpen}
          open={isDetailsModalOpen}
          request={requestDetails}
        />
      )}
    </div>
  );
};

export default UserAllRequest;
