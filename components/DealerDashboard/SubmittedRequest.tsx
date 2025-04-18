"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Eye, Search, X } from "lucide-react";

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
import TableLoading from "../shared/TableLoading";
import { TDealerRequest } from "@/types";
import Image from "next/image";
import { offerStatuses } from "@/constant";
import { useGetSubmitedOfferListings } from "@/hooks/dealerRequest.hooks";
import { Badge } from "../ui/badge";
import AuctionDetailsModal from "../Modal/AuctionDetailsModal";

export default function SubmittedRequest() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, isLoading } = useGetSubmitedOfferListings([
    "auction-won",
    "Offer Accepted",
    "auction-lost",
    "Deposit Paid",
    "ready",
    "Approved",
  ]);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [requestDelails, setRequestDetails] =
    React.useState<TDealerRequest | null>(null);

  const columns: ColumnDef<TDealerRequest>[] = [
    {
      accessorKey: "offerNumber",
      header: "Offer Number",
      cell: ({ row }) => {
        const offer = row.original;
        return <p>{offer?.offerId}</p>;
      },
    },
    {
      accessorKey: "make",
      header: "Vehicle",
      cell: ({ row }) => {
        const offer = row.original.listingId;
        return (
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-sm overflow-hidden hidden sm:block">
              {offer.images?.[0] ? (
                <Image
                  src={offer.images[0]}
                  alt={`${offer.make} ${offer.model}`}
                  className="object-cover w-full h-full"
                  width={200}
                  height={200}
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-xs text-gray-500 rounded-sm">
                  No image
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold">
                {offer.make} {offer.model}
              </p>
              <p className="text-sm text-muted-foreground">
                {offer.year} • {offer.mileage.toLocaleString()} miles
              </p>
              <p className="text-sm font-medium">{offer.registration}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "SubmittedPrice",
      header: "Submitted Price",
      cell: ({ row }) => {
        return (
          <p className="font-semibold tet-sm">£{row.original?.allInPrice}</p>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Submitted Date",
      cell: ({ row }) => {
        console.log(row.original?.createdAt);
        return (
          <div>
            <p className="font-medium">
              {new Date(row?.original?.createdAt as string).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "short",
                }
              )}
            </p>
            <p className="text-sm text-[rgb(var(--color-text-light))]">
              {new Date(row.original?.createdAt as string).toLocaleTimeString(
                "en-GB",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const offer = row.original;
        const statusInfo = offerStatuses[offer.status] || {
          label: offer.status,
          color: "default",
        };
        return (
          <Badge className={`${statusInfo.className}`}>
            {statusInfo.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setIsViewModalOpen(true);
                setRequestDetails(row?.original);
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
              className="bg-[#EF4444] text-white"
            >
              <X className="w-4 h-4 mr-1" />
              Reject
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("make")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("make")?.setFilterValue(event.target.value)
            }
            className="pl-9 rounded-[5px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort by {sorting[0]?.id || "date"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-sm" align="end">
            <DropdownMenuItem
              onClick={() => setSorting([{ id: "date", desc: true }])}
            >
              Date
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSorting([{ id: "budget", desc: true }])}
            >
              Budget
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel()?.rows?.length ?? 0} of{" "}
          {table.getFilteredRowModel()?.rows?.length ?? 0} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {requestDelails && (
        <AuctionDetailsModal
          open={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
          car={requestDelails}
          pageName="submitedRequest"
          setIsViewModalOpen={setIsViewModalOpen}
        />
      )}
    </div>
  );
}
