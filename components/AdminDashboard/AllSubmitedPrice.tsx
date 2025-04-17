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
import { Car, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { useGetSubmitedPrice } from "@/hooks/dealerRequest.hooks";

export default function AllSubmitedPrice() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, isLoading } = useGetSubmitedPrice();

  const columns: ColumnDef<TDealerRequest>[] = [
    {
      accessorFn: (row) =>
        typeof row.userId === "string" ? row.userId : row.userId.fullName,
      accessorKey: "fullName",
      header: "User",
      cell: ({ row }) => {
        const request = row.original;
        return (
          typeof request.userId !== "string" && (
            <div>
              <p className="font-semibold">{request?.userId?.fullName}</p>
              <p className="text-sm text-[rgb(var(--color-text-light))]">
                {request?.userId?.email}
              </p>
            </div>
          )
        );
      },
    },
    {
      accessorKey: "model",
      header: "Vehicle",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-[rgb(var(--color-text-light))]" />
            <span className="font-semibold capitalize">
              {request?.listingId?.make} {request?.listingId?.model}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "allInPrice",
      header: "Submitted Price",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <p className="font-medium">
            £{request?.allInPrice?.toLocaleString()}
          </p>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Submission Date",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <p className="font-medium">
            {new Date(request.createdAt as string).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: () => {
        return (
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            View Details
          </Button>
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
            value={
              (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("fullName")?.setFilterValue(event.target.value)
            }
            className="pl-9 rounded-[5px]"
          />
        </div>
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
    </div>
  );
}
