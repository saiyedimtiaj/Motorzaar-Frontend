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
import { Button } from "../ui/button";
import ContactDealerModal from "../Modal/ContactDealerModal";
import { useUser } from "@/lib/user.provider";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { offerStatuses } from "@/constant";

const CarOfferTable = ({ offers }: { offers: TAddDEpositForm[] }) => {
  const [selectedDealer, setSelectedDealer] = useState<{
    fullName: string;
    phone: string;
    email: string;
    id: string;
  } | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [offerId, setOfferId] = useState("");
  const { user } = useUser();
  console.log(offers);
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
          {offers?.map((offer) => {
            const statusInfo = offerStatuses[offer.status] || {
              label: offer.status,
              color: "default",
            };
            return (
              <TableBody key={offer?._id}>
                <TableRow className="block sm:table-row border-b border-gray-100 last:border-b-0">
                  <TableCell className="block sm:table-cell p-4 sm:p-6 font-medium">
                    <div className="sm:hidden flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 leading-tight">
                            {typeof offer?.dealerId !== "string" &&
                              offer?.dealerId?.fullName}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-sm font-bold text-gray-700"></span>
                          </div>
                        </div>
                        {/* Mobile Price */}
                        <div className="text-lg font-bold text-[rgb(var(--color-primary))] text-right shrink-0 ml-2">
                          £{offer.allInPrice.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <Badge className={`${statusInfo.className}`}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <div className="flex flex-col w-full items-center md:flex-row gap-2 pt-2 border-t border-gray-100">
                        <Link
                          className="w-full"
                          href={`/vehicles/listing/${offer?._id}`}
                        >
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
                                  ? (offer?.dealerId?.email as string)
                                  : "",
                              fullName:
                                typeof offer?.dealerId !== "string"
                                  ? offer?.dealerId?.fullName
                                  : "",
                              phone:
                                typeof offer?.dealerId == "string"
                                  ? ""
                                  : (offer?.dealerId?.phone as string),
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
                        <span className="text-sm font-bold text-gray-700"></span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden sm:table-cell p-6 text-lg font-bold text-[rgb(var(--color-primary))] text-right">
                    £{offer.allInPrice.toLocaleString()}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell p-6">
                    <div className="flex flex-col items-start gap-1">
                      <Badge className={`${statusInfo.className}`}>
                        {statusInfo.label}
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
                          setOfferId(offer?.offerId as string);
                          setSelectedDealer({
                            email:
                              typeof offer?.dealerId !== "string"
                                ? (offer?.dealerId?.email as string)
                                : "",
                            fullName:
                              typeof offer?.dealerId !== "string"
                                ? offer?.dealerId?.fullName
                                : "",
                            phone:
                              typeof offer?.dealerId !== "string"
                                ? (offer?.dealerId?.phone as string)
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
            );
          })}
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
        dealerEmail={selectedDealer?.email as string}
        offerNumber={offerId}
      />
    </div>
  );
};

export default CarOfferTable;
