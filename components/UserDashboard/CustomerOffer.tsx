"use client";

import { useGetCustomerOffers } from "@/hooks/dealerRequest.hooks";
import { TDealerRequest } from "@/types";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { CalendarDays, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";
import CustomerOfferSkeleton from "./CustomerOfferScaletion";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Dispatch, SetStateAction, useState } from "react";
import ContactDealerModal from "../Modal/ContactDealerModal";
import { useUser } from "@/lib/user.provider";
import Link from "next/link";

const offerStatuses: Record<
  string,
  { label: string; message: string; color: string }
> = {
  "Deposit Paid": {
    label: "Deposit Paid",
    message:
      "Thank you! Your deposit has been received. We're now working to secure your car at auction.",
    color: "bg-black text-white",
  },
  "auction-won": {
    label: "Auction Won",
    message: "Great news! We've successfully secured your car at auction.",
    color: "bg-green-100 text-green-700",
  },
  "auction-lost": {
    label: "Auction Lost",
    message:
      "Unfortunately we were unable to secure the car at auction. Your deposit will be refunded within 3 working days.",
    color: "bg-red-100 text-red-700",
  },
  ready: {
    label: "Test Drive & Collection Ready",
    message:
      "Your car is ready! Please contact the dealer to arrange your test drive and collection.",
    color: "bg-yellow-100 text-yellow-800",
  },
};

const CustomerOffer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { data, isLoading } = useGetCustomerOffers();
  const [modatDetails, setModalDetails] = useState<{
    dealerName: string;
    dealerPhone: string;
    offerNumber: string;
    dealerEmail: string;
  } | null>(null);
  const { user } = useUser();

  if (isLoading) {
    return <CustomerOfferSkeleton />;
  }

  console.log(data);
  return (
    <div className="space-y-4 sm:space-y-6 max-w-[100vw] overflow-x-hidden px-2 sm:px-0">
      {data?.data?.length > 0 ? (
        data?.data?.map((offer: TDealerRequest) => (
          <OfferCards
            key={offer?._id}
            offer={offer}
            setModalDetails={setModalDetails}
            setIsContactOpen={setIsContactOpen}
          />
        ))
      ) : (
        <p className="text-center text-lg font-semibold text-[rgb(var(--color-text-light))] py-10">
          Thanks for your request — we&apos;ve received it and are now checking
          availability directly with our dealer partners. <br /> You will hear
          back within 24-48 hours.
        </p>
      )}
      {modatDetails && (
        <ContactDealerModal
          open={isContactOpen}
          dealerName={modatDetails.dealerName}
          dealerPhone={modatDetails.dealerPhone}
          dealerEmail={modatDetails.dealerEmail}
          offerNumber={modatDetails.offerNumber}
          userProfile={{
            email: user?.email,
            fullName: user?.fullName,
            phone: user?.phone,
          }}
          onOpenChange={setIsContactOpen}
        />
      )}
    </div>
  );
};

const BUSINESS_HOURS = Array.from({ length: 9 }, (_, i) => i + 9);

const OfferCards = ({
  offer,
  setModalDetails,
  setIsContactOpen,
}: {
  offer: TDealerRequest;
  setIsContactOpen: Dispatch<SetStateAction<boolean>>;
  setModalDetails: Dispatch<
    SetStateAction<{
      dealerName: string;
      dealerPhone: string;
      offerNumber: string;
      dealerEmail: string;
    } | null>
  >;
}) => {
  const isValidImage = (src: string | undefined) =>
    !!src && typeof src === "string" && src.trim() !== "";
  const { timeLeft } = useCountdown(offer.listingId?.auctionDate);

  const [date, setDate] = useState<Date>();
  const [showTimeSelect, setShowTimeSelect] = useState(false);

  const handleSetTestDriveDate = (dateTime: Date) => {
    console.log(dateTime);
  };

  console.log(offer);

  return (
    <Card className="p-4 sm:p-6 w-full rounded-sm">
      {offer?.listingId ? (
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Car Image */}
          <div className="relative w-full h-48 sm:h-56 md:h-48 rounded-lg sm:rounded-sm overflow-hidden">
            {offer?.listingId?.images[0] ? (
              isValidImage(offer?.listingId?.images[0]) && (
                <Image
                  src={offer?.listingId?.images[0]}
                  alt={`${offer?.listingId?.year} ${offer?.listingId?.make} ${offer?.listingId?.model}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-110 p-4"
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                No Image Available
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                  {offer?.listingId?.make} {offer?.listingId?.model}
                </h3>
                <p className="text-[rgb(var(--color-text-light))]">
                  {offer?.listingId?.year} •{" "}
                  {offer?.listingId?.mileage.toLocaleString()} miles •{" "}
                  {offer?.listingId?.fuel} • {offer?.listingId?.transmission}
                </p>
                <p className="text-xs sm:text-sm font-medium mt-1">
                  Offer #{offer?.listingId?._id}
                </p>
              </div>
              <Badge
                className={
                  offerStatuses[offer.status]?.color ||
                  "bg-gray-100 text-gray-700"
                }
              >
                {offerStatuses[offer.status]?.label || offer.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <p className="text-sm text-[rgb(var(--color-text-light))]">
                  All-in Price
                </p>
                <p className="text-lg sm:text-xl font-bold text-[rgb(var(--color-primary))]">
                  £{offer?.allInPrice?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-[rgb(var(--color-text-light))]">
                  Deposit Status
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
                  <p className="font-medium text-green-600">Paid £199</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-[rgb(var(--color-text-light))]">
                  Status
                </p>
                <Badge
                  className={
                    offerStatuses[offer.status]?.color ||
                    "bg-gray-100 text-gray-700"
                  }
                >
                  {offerStatuses[offer.status]?.label || offer.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-[rgb(var(--color-text-light))]">
                  Auction House
                </p>
                <p className="font-medium">{offer?.listingId?.auctionHouse}</p>
              </div>
              <div>
                <p className="text-sm text-[rgb(var(--color-text-light))]">
                  Time Until Auction
                </p>
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="w-4 h-4" />
                  {timeLeft}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 pt-4 border-t">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
                onClick={() => {
                  setIsContactOpen(true);
                  setModalDetails({
                    dealerName: offer?.dealerId?.fullName,
                    dealerEmail: offer?.dealerId?.email as string,
                    dealerPhone: offer?.dealerId?.phone as string,
                    offerNumber: offer?.offerId as string,
                  });
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Dealer
              </Button>
              <Link href={`/vehicles/listing/${offer?._id}`}>
                <Button>View Details</Button>
              </Link>
              {offer.status === "ready" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <CalendarDays className="w-4 h-4" />
                      {offer.testDriveDate
                        ? format(
                            new Date(offer.testDriveDate),
                            "dd MMM yyyy HH:mm"
                          )
                        : "Book Test Drive & Collection"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    {!showTimeSelect ? (
                      <Calendar
                        mode="single"
                        selected={date}
                        className="bg-white"
                        onSelect={(newDate) => {
                          setDate(newDate);
                          setShowTimeSelect(true);
                        }}
                        disabled={(date) => date < addDays(new Date(), 1)}
                        initialFocus
                      />
                    ) : (
                      <div className="p-3 space-y-3">
                        <div className="font-medium">Select Time</div>
                        <div className="grid grid-cols-3 gap-2">
                          {BUSINESS_HOURS.map((hour) => (
                            <Button
                              key={hour}
                              variant="outline"
                              className="text-center"
                              onClick={() => {
                                const dateTime = setMinutes(
                                  setHours(date!, hour),
                                  0
                                );
                                handleSetTestDriveDate(dateTime);
                              }}
                            >
                              {hour}:00
                            </Button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setShowTimeSelect(false)}
                        >
                          Back to Calendar
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold text-[rgb(var(--color-text-light))] py-10">
          Thanks for your request — we&apos;ve received it and are now checking
          availability directly with our dealer partners. <br /> You will hear
          back within 24-48 hours.
        </p>
      )}

      {offer.status && offerStatuses[offer.status] && (
        <div
          className={cn(
            "mt-4 p-4 rounded-sm border",
            offer.status === "auction-lost"
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          )}
        >
          <p
            className={cn(
              "font-medium flex items-center gap-2",
              offer.status === "auction-lost"
                ? "text-red-800"
                : "text-green-800"
            )}
          >
            <CheckCircle2 className="w-5 h-5" />
            {offerStatuses[offer.status].message}
          </p>
        </div>
      )}
    </Card>
  );
};

export default CustomerOffer;
