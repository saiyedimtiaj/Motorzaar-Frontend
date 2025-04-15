"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Eye,
  Filter,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TListing } from "@/types";
import TableLoading from "../shared/TableLoading";
import { useGetOfferedListing } from "@/hooks/listing.hooks";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import RejectDialog from "../Modal/RejectDialog";
import ViewOfferDialog from "../Modal/ViewOfferDialog";

type SortField = "date" | "budget";

// todo : filter button
// todo : sort button
// todo : search functionality

const offerStatuses: Record<
  string,
  { label: string; color: "default" | "secondary" | "destructive" | "outline" }
> = {
  pending: { label: "Pending Review", color: "default" },
  submitted: { label: "Price Submitted", color: "secondary" },
  "deposit-paid": { label: "Deposit Paid", color: "secondary" },
  "auction-won": { label: "Auction Won", color: "default" },
  "auction-lost": { label: "Auction Lost", color: "destructive" },
  "test-drive-scheduled": { label: "Test Drive Scheduled", color: "secondary" },
  completed: { label: "Sale Complete", color: "default" },
  cancelled: { label: "Cancelled", color: "destructive" },
};

const DashboardHome = () => {
  const limit = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [listingOffer, setListingiOffer] = useState<TListing | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading,
    refetch: refetchListing,
  } = useGetOfferedListing({
    searchTerm,
    sortBy: sortField,
    page: currentPage,
    limit,
  });

  const handleNext = () => {
    if (data?.meta?.page < data?.meta?.totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (data?.meta?.page > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // const handleSubmit = () => {};

  return (
    <Card className="rounded-sm p-4 md:p-6 border-2 border-[rgb(var(--color-border))]">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--color-text-light))]" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 rounded-[5px]"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort by {sortField}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-sm" align="end">
              <DropdownMenuItem onClick={() => setSortField("date")}>
                Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortField("budget")}>
                Budget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">Vehicle</TableHead>
                <TableHead className="min-w-[200px]">Auction Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="min-w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((offer: TListing) => (
                <TableRow key={offer._id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-sm overflow-hidden hidden sm:block">
                        <Image
                          src={offer.images[0]}
                          alt={`${offer.make} ${offer.model}`}
                          className="object-cover w-full h-full"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div>
                        <p className="font-semibold">
                          {offer.make} {offer.model}
                        </p>
                        <p className="text-sm text-[rgb(var(--color-text-light))]">
                          {offer.year} • {offer.mileage.toLocaleString()} miles
                        </p>
                        <p className="text-sm font-medium">
                          {offer.registration}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{offer.auctionHouse}</p>
                      <p className="text-sm text-[rgb(var(--color-text-light))]">
                        {new Date(offer.auctionDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        offer?.status === "Deposit Paid"
                          ? "border border-gray-600"
                          : offer.status === "Auction Won"
                          ? "bg-[#171717]"
                          : offer.status === "Auction Lost"
                          ? "bg-[#EF4444]"
                          : "bg-gray-200"
                      }
                    >
                      {offerStatuses[offer.status]?.label || offer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setOfferModalOpen(true);
                          setListingiOffer(offer);
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setRejectModalOpen(true);
                        }}
                        className="bg-[#EF4444] text-white"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-center mt-12 gap-3">
        <Button
          onClick={handlePrevious}
          className="py-0.5 px-3"
          variant="outline"
          disabled={data?.meta?.page <= 1}
        >
          <ArrowLeft />
        </Button>
        <p className="font-medium">
          {data?.meta?.page}/{data?.meta?.totalPage}
        </p>
        <Button
          onClick={handleNext}
          className="py-0.5 px-3"
          variant="outline"
          disabled={data?.meta?.page >= data?.meta?.totalPage}
        >
          <ArrowRight />
        </Button>
      </div>
      <RejectDialog open={rejectModalOpen} setIsOpen={setRejectModalOpen} />
      {listingOffer && (
        <ViewOfferDialog
          offer={listingOffer}
          onOpenChange={setOfferModalOpen}
          open={offerModalOpen}
          refetchListing={refetchListing}
        />
      )}
    </Card>
  );
};

export default DashboardHome;
