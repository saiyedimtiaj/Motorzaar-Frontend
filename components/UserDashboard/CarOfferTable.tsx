import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TAddDEpositForm } from "@/types";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import ContactDealerModal from "../Modal/ContactDealerModal";
import { useUser } from "@/lib/user.provider";
import Link from "next/link";
import { Badge } from "../ui/badge";

const getStatusBadgeClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case "auction live":
      return "bg-red-100 text-red-700 border border-red-300";
    case "offer accepted":
      return "bg-green-100 text-green-700 border border-green-300";
    case "offer pending":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "awaiting auction":
      return "bg-gray-100 text-gray-700 border border-gray-300";
    default:
      return "bg-white text-gray-600 border border-gray-300";
  }
};

const CarOfferTable = ({ offers }: { offers: TAddDEpositForm[] }) => {
  const [selectedDealer, setSelectedDealer] = useState<{
    fullName: string;
    phone: string;
    email: string;
    id: string;
  } | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { user } = useUser();
  return (
    <div className="w-full max-w-[100vw] overflow-x-auto">
      <div className="min-w-full bg-white rounded-sm border border-gray-200 shadow-sm">
        <Table>
          {/* Hide table header on mobile, show on lg screens */}
          <TableHeader className="bg-gray-50/70 hidden sm:table-header-group">
            <TableRow>
              <TableHead className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Dealer
              </TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Price
              </TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          {/* Map through sorted offers and render OfferRow */}
          {offers?.map((offer) => (
            <TableBody key={offer?._id}>
              <TableRow className="block sm:table-row border-b border-gray-100 last:border-b-0">
                {/* --- Combined Cell for Mobile / Dealer Cell for Desktop --- */}
                {/* On mobile (block), this cell acts as the card container. On desktop (lg:table-cell), it's just the dealer cell. */}
                <TableCell className="block sm:table-cell p-4 sm:p-6 font-medium">
                  {/* Mobile Card Layout Container */}
                  <div className="sm:hidden flex flex-col space-y-3">
                    {/* Top section: Dealer, Rating */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 leading-tight">
                          {typeof offer?.dealerId !== "string" &&
                            offer?.dealerId?.fullName}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          <span className="text-sm font-bold text-gray-700">
                            {/* {(
                              (offer.googleRating + offer.trustpilotRating) /
                              2
                            ).toFixed(1)} */}
                          </span>
                        </div>
                      </div>
                      {/* Mobile Price */}
                      <div className="text-lg font-bold text-[rgb(var(--color-primary))] text-right shrink-0 ml-2">
                        £{offer.allInPrice.toLocaleString()}
                      </div>
                    </div>
                    {/* Middle section: Status, Expiry */}
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        className={`${getStatusBadgeClass(
                          offer.status
                        )} text-xs py-0.5 px-2 font-medium`}
                      >
                        {offer.status}
                      </Badge>
                    </div>
                    {/* Bottom section: Actions */}
                    <div className="flex flex-col items-center sm:flex-row gap-2 pt-2 border-t border-gray-100">
                      <Link href={`/vehicles/listing/${offer?._id}`}>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          setContactModalOpen(true);
                          setSelectedDealer({
                            email:
                              typeof offer?.dealerId !== "string"
                                ? offer?.dealerId?.email
                                : "",
                            fullName:
                              typeof offer?.dealerId !== "string"
                                ? offer?.dealerId?.fullName
                                : "",
                            phone:
                              typeof offer?.dealerId !== "string"
                                ? offer?.dealerId?.phone
                                : "",
                            id: offer?._id as string,
                          });
                        }}
                        size="sm"
                        className="w-full bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-light))]" // Full width on mobile stack
                      >
                        Contact Dealer
                      </Button>
                    </div>
                  </div>

                  {/* --- Desktop Dealer Info (Hidden on Mobile) --- */}
                  <div className="hidden sm:flex flex-col items-start">
                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                      {typeof offer?.dealerId !== "string" &&
                        offer?.dealerId?.fullName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                      <span className="text-sm font-bold text-gray-700">
                        {/* {(
                          (offer.googleRating + offer.trustpilotRating) /
                          2
                        ).toFixed(1)} */}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* --- Price Cell (Desktop only) --- */}
                <TableCell className="hidden sm:table-cell p-6 text-lg font-bold text-[rgb(var(--color-primary))] text-right">
                  £{offer.allInPrice.toLocaleString()}
                </TableCell>

                {/* --- Status & Expiry Cell (Desktop only) --- */}
                <TableCell className="hidden sm:table-cell p-6">
                  <div className="flex flex-col items-start gap-1">
                    <Badge
                      className={`${getStatusBadgeClass(
                        offer.status
                      )} text-xs py-0.5 px-2 font-medium`}
                    >
                      {offer.status}
                    </Badge>
                  </div>
                </TableCell>

                {/* --- Actions Cell (Desktop only - actions are shown in first cell on mobile) --- */}
                <TableCell className="hidden sm:table-cell p-6">
                  <div className="flex justify-end gap-2">
                    <Link href={`/vehicles/listing/${offer?._id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="lg:w-auto" // Auto width on desktop
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        setContactModalOpen(true);
                        setSelectedDealer({
                          email:
                            typeof offer?.dealerId !== "string"
                              ? offer?.dealerId?.email
                              : "",
                          fullName:
                            typeof offer?.dealerId !== "string"
                              ? offer?.dealerId?.fullName
                              : "",
                          phone:
                            typeof offer?.dealerId !== "string"
                              ? offer?.dealerId?.phone
                              : "",
                          id: offer?._id as string,
                        });
                      }}
                      size="sm"
                      className="lg:w-auto bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-light))]" // Auto width on desktop
                    >
                      Contact Dealer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
      <ContactDealerModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        userProfile={{
          email: user?.email || "",
          fullName: user?.fullName || "",
          phone: user?.phone || "",
        }}
        dealerName={selectedDealer?.fullName as string}
        dealerPhone={selectedDealer?.phone as string}
        offerNumber={selectedDealer?.id as string}
      />
    </div>
  );
};

export default CarOfferTable;
