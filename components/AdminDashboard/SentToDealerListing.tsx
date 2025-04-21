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
import { TListing, TRequest, TUser } from "@/types";
import { useGetFreeApprovalListing } from "@/hooks/listing.hooks";
import SentToDealerDetailsModal from "../Modal/SentToDealerDetailsModal";

export default function SentToDealerListing() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, isLoading } = useGetFreeApprovalListing();
  const [open, setIsOpen] = React.useState(false);
  const [request, setRequest] = React.useState<TRequest | null>(null);
  const [user, setUser] = React.useState<TUser | null>(null);

  const columns: ColumnDef<TListing>[] = [
    {
      accessorFn: (row) =>
        typeof row.userId === "string" ? row.userId : row.userId.fullName,
      accessorKey: "fullName",
      header: "User",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div>
            <p className="font-semibold">
              {typeof request.userId !== "string" && request.userId.fullName}
            </p>
            <p className="text-sm text-[rgb(var(--color-text-light))]">
              {typeof request.userId !== "string" && request.userId.email}
            </p>
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
            {typeof request.requestId !== "string" &&
            request.requestId?.searchType === "specific" ? (
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
            {typeof request.requestId !== "string" && (
              <p className="text-sm font-medium">
                Budget: £{request?.requestId?.budget[0].toLocaleString()} - £
                {request?.requestId?.budget[1].toLocaleString()}
              </p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "	Date",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div>
            <p className="font-medium">
              {new Date(request?.sentToDealerDate as string).toLocaleString(
                "en-GB",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
            <p className="text-sm text-[rgb(var(--color-text-light))]">
              {new Date(request?.sentToDealerDate as string).toLocaleString(
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
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => {
                setRequest(row?.original?.requestId as TRequest);
                setUser(row?.original?.userId as TUser);
                setIsOpen(true);
              }}
            >
              View Details
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

  console.log(data);

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
      {user && request && (
        <SentToDealerDetailsModal
          open={open}
          onOpenChange={setIsOpen}
          request={request}
          userData={user}
        />
      )}
    </div>
  );
}
