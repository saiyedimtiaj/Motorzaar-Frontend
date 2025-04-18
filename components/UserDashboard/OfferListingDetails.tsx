"use client";

import { useGetOfferDetails } from "@/hooks/dealerRequest.hooks";
import { ArrowLeft, Award, CheckCircle2, Shield } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import ListingSlider from "../shared/ListingSlider";
import { Card } from "../ui/card";
import { useCountdown } from "@/hooks/use-countdown";
import { useUser } from "@/lib/user.provider";
import ContactDealerModal from "../Modal/ContactDealerModal";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DepositConfirmationModal from "../Modal/DepositConfirmationModal";
import VehiclesDetailsScaleton from "../vehicles/VehiclesDetailsScaleton";

const OfferListingDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { listingId } = useParams();
  const { user } = useUser();
  const { data, isLoading } = useGetOfferDetails(listingId as string);
  const { timeLeft: auctionTimeLeft } = useCountdown(
    data?.data?.listingId?.auctionDate || ""
  );
  const { timeLeft: offerTimeLeft, isExpired } = useCountdown(
    data?.data?.listingId?.auctionDate || ""
  );
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositModalDetails, setDepositModalDetails] = useState<{
    allInPrice: number;
    make: string;
    model: string;
    fullName: string;
    id: string;
  } | null>(null);

  if (isLoading) {
    return <VehiclesDetailsScaleton />;
  }

  console.log(data);
  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
          <Link href={`/dashboard/offer/${data?.data?.listingId?._id}`}>
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cars
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Money Back Guarantee
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Award className="w-4 h-4 mr-2 text-blue-500" />
              Verified Dealer
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* here this is car slider */}
            <ListingSlider
              altText={`${data?.data?.listingId?.make} ${data?.data?.listingId?.model}`}
              carImages={data?.data?.listingId?.images}
            />
            <Card className="mt-8 py-8 px-5 rounded-sm md:p-8">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-[rgb(var(--color-text-light))] font-medium mb-1">
                    Year
                  </p>
                  <p className="text-lg font-semibold">
                    {data?.data?.listingId?.year}
                  </p>
                </div>
                <div>
                  <p className="text-[rgb(var(--color-text-light))] font-medium mb-1">
                    Mileage
                  </p>
                  <p className="text-lg font-semibold">
                    {data?.data?.listingId?.mileage?.toLocaleString()} miles
                  </p>
                </div>
                <div>
                  <p className="text-[rgb(var(--color-text-light))] font-medium mb-1">
                    Fuel Type
                  </p>
                  <p className="text-lg font-semibold">
                    {data?.data?.listingId?.fuel}
                  </p>
                </div>
                <div>
                  <p className="text-[rgb(var(--color-text-light))] font-medium mb-1">
                    Transmission
                  </p>
                  <p className="text-lg font-semibold">
                    {data?.data?.listingId?.transmission}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="mt-8 py-8 px-4 rounded-sm md:p-8">
              <h2 className="text-2xl font-bold mb-6">Vehicle Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Registration
                  </p>
                  <p className="font-semibold">
                    {data?.data?.listingId?.registration}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Date of Registration
                  </p>
                  <p className="font-semibold">
                    {data?.data?.listingId?.regDate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Previous Owners
                  </p>
                  {/* <p className="font-semibold">{data?.data?.dealerId?.owners}</p> */}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Color
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{
                        backgroundColor: data?.data?.listingId?.color
                          ?.toLowerCase()
                          .includes("blue")
                          ? "#1e40af"
                          : data?.data?.listingId?.color
                              ?.toLowerCase()
                              .includes("red")
                          ? "#dc2626"
                          : data?.data?.listingId?.color
                              ?.toLowerCase()
                              .includes("black")
                          ? "#171717"
                          : data?.data?.listingId?.color
                              ?.toLowerCase()
                              .includes("silver")
                          ? "#737373"
                          : "#ffffff",
                      }}
                    />
                    <p className="font-semibold">
                      {data?.data?.listingId?.color}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    Engine Size
                  </p>
                  <p className="font-semibold">
                    {data?.data?.listingId?.engineSize}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-[rgb(var(--color-text-light))]">
                    MOT Expiry
                  </p>
                  <p className="font-semibold">
                    {data?.data?.listingId?.motExpiry}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="mt-8 py-8 px-4 rounded-sm md:p-8">
              <h2 className="text-2xl font-bold mb-6">
                Vehicle Condition & Details
              </h2>
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Condition</h3>
                <p className="text-[rgb(var(--color-text-light))] text-lg leading-relaxed mb-6">
                  {data?.data?.listingId?.carCondition}
                </p>
                <h3 className="text-xl font-semibold mb-4">
                  Additional Details
                </h3>
                <p className="text-[rgb(var(--color-text-light))] text-lg leading-relaxed">
                  {data?.data?.listingId?.additionalDetails}
                </p>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-4">
            <div className="sticky top-16">
              <Card className="py-6 px-4 rounded-sm md:p-6">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold mb-2">
                    {data?.data?.listingId?.make}
                  </h3>
                  <p className="text-2xl font-medium mb-2">
                    {data?.data?.listingId?.model}
                  </p>
                </div>

                <div className="border-t border-b py-6 mb-6">
                  <div className="mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2">Auction Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Auction House:</span>
                          <span className="font-semibold">
                            {data?.data?.listingId?.auctionHouse}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Auction Date:</span>
                          <span className="font-semibold">
                            {new Date(
                              data?.data?.listingId?.auctionDate
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Time until auction:
                          </span>
                          <span className="font-semibold">
                            {auctionTimeLeft}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "rounded-sm p-4",
                        isExpired ? "bg-[#F0FDF4]" : "bg-[#F0FDF4]"
                      )}
                    >
                      <h4 className="font-bold mb-2">Offer Status</h4>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Offer expires in:</span>
                        <span
                          className={cn(
                            "font-semibold",
                            isExpired ? "text-red-600" : "text-green-600"
                          )}
                        >
                          {offerTimeLeft}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {data?.data?.dealerId?.fullName}
                      </h3>
                      <p className="text-[rgb(var(--color-text-light))]">
                        {/* {car.dealerLocation} */}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-sm p-4 md:p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-lg font-semibold">All-in Price</p>
                      <Badge variant="secondary" className="text-blue-700">
                        Best Value
                      </Badge>
                    </div>
                    <p className="text-4xl font-bold mb-2">
                      £{data?.data?.allInPrice.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 text-blue-100">
                      <Shield className="w-4 h-4" />
                      <p className="text-sm">
                        Includes all fees and dealer margin
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-5">
                  {data?.data?.status === "Approved" && (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Contact Dealer
                    </Button>
                  )}
                  {data?.data?.status === "Approved" ? (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                      onClick={() => {
                        setDepositModalDetails({
                          allInPrice: data?.data?.allInPrice,
                          fullName: data?.data?.dealerId?.fullName,
                          id: data?.data?._id,
                          make: data?.data?.listingId?.make,
                          model: data?.data?.listingId?.model,
                        });
                        setDepositModalOpen(true);
                      }}
                    >
                      Pay Deposit
                    </Button>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-sm p-2.5 md:p-4">
                      <p className="text-green-800 font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Thank you! Your deposit has been received. We&apos;re
                        now working to secure your car at auction.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {user && (
          <ContactDealerModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            dealerName={data?.data?.dealerId.dealerName}
            dealerEmail={data?.data?.dealerId.email}
            dealerPhone={data?.data?.dealerId.dealerPhone}
            offerNumber={data?.data?.offerId}
            userProfile={{
              email: user?.email,
              fullName: user?.fullName,
              phone: user?.phone as string,
            }}
          />
        )}

        {depositModalDetails && (
          <DepositConfirmationModal
            open={depositModalOpen}
            onOpenChange={setDepositModalOpen}
            details={depositModalDetails}
          />
        )}
      </div>
    </div>
  );
};

export default OfferListingDetails;
