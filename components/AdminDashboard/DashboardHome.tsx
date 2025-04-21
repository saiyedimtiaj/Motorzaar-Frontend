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
import { ArrowUpDown, Car, Search } from "lucide-react";

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
import { useGetAllRequest } from "@/hooks/request.hooks";
import { ViewTimeline } from "./view-timeline";
import RequestListingsComponent from "../Modal/request-listing-modal";
import { TRequest } from "@/types";

export default function DashboardHome() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, isLoading } = useGetAllRequest();
  const [selectedRequestForTimeline, setSelectedRequestForTimeline] =
    React.useState<null | TRequest>(null);
  const [isListingOpen, setIsListingOpen] = React.useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = React.useState(false);

  const columns: ColumnDef<TRequest>[] = [
    {
      accessorFn: (row) => row.userId.email,
      accessorKey: "fullName",
      header: "User",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div>
            <p className="font-semibold">{request.userId.fullName}</p>
            <p className="text-sm text-[rgb(var(--color-text-light))]">
              {request.userId.email}
            </p>
            <p className="text-sm font-medium mt-1">car listings</p>
          </div>
        );
      },
    },
    {
      accessorKey: "details",
      header: "Car Details",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="space-y-2">
            {request.searchType === "specific" ? (
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[rgb(var(--color-text-light))]" />
                <span className="font-semibold capitalize">
                  {request.make} {request.model}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[rgb(var(--color-text-light))]" />
                <span className="font-semibold">Multiple Car Types</span>
              </div>
            )}
            <p className="text-sm font-medium">
              Budget: £{request.budget[0].toLocaleString()} - £
              {request.budget[1].toLocaleString()}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <span>
            £{request.budget[0].toLocaleString()} - £
            {request.budget[1].toLocaleString()}
          </span>
        );
      },
      sortingFn: (a, b) => {
        const aBudget = (a.original as TRequest).budget[1];
        const bBudget = (b.original as TRequest).budget[1];
        return aBudget - bBudget;
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div>
            <p className="font-medium">
              {new Date(request.createdAt).toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-[rgb(var(--color-text-light))]">
              {new Date(request.createdAt).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        );
      },
      sortingFn: (a, b) => {
        const aDate = new Date((a.original as TRequest).createdAt).getTime();
        const bDate = new Date((b.original as TRequest).createdAt).getTime();
        return aDate - bDate;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => {
                setSelectedRequestForTimeline(row.original);
                setIsTimelineOpen(true);
              }}
            >
              View Timeline
            </Button>
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => {
                setSelectedRequestForTimeline(row.original);
                setIsListingOpen(true);
              }}
            >
              Add Listing
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

  const toggleSort = (key: string) => {
    setSorting((prev) => {
      const current = prev.find((s) => s.id === key);
      if (current) {
        return [{ id: key, desc: !current.desc }];
      } else {
        return [{ id: key, desc: false }];
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter emails..."
            value={
              (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("fullName")?.setFilterValue(event.target.value)
            }
            className="pl-9 rounded-[5px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort by {sorting[0]?.id || "None"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-sm" align="end">
            <DropdownMenuItem onClick={() => toggleSort("date")}>
              Date{" "}
              {sorting[0]?.id === "date" ? (sorting[0]?.desc ? "↓" : "↑") : ""}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleSort("budget")}>
              Budget{" "}
              {sorting[0]?.id === "budget"
                ? sorting[0]?.desc
                  ? "↓"
                  : "↑"
                : ""}
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

      {selectedRequestForTimeline && (
        <ViewTimeline
          open={isTimelineOpen}
          onOpenChange={setIsTimelineOpen}
          request={selectedRequestForTimeline}
        />
      )}

      {selectedRequestForTimeline && (
        <RequestListingsComponent
          request={selectedRequestForTimeline}
          open={isListingOpen}
          onOpenChange={setIsListingOpen}
        />
      )}
    </div>
  );
}
