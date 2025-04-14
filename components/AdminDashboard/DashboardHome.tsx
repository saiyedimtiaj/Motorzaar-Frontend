"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Car,
  Filter,
  Search,
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
import { useGetAllRequest } from "@/hooks/request.hooks";
import { TRequest } from "@/types";

type SortField = "date" | "budget";

const DashboardHome = () => {
  const limit = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllRequest({
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
  if (isLoading) return <p>Loading....</p>;

  return (
    <div>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">User</TableHead>
              <TableHead className="min-w-[250px]">Car Details</TableHead>
              <TableHead className="min-w-[150px]">Date</TableHead>
              <TableHead className="min-w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((request: TRequest) => (
              <TableRow key={request._id}>
                <TableCell>
                  <div>
                    <p className="font-semibold">{request.userId.fullName}</p>
                    <p className="text-sm text-[rgb(var(--color-text-light))]">
                      {request.userId.email}
                    </p>
                    <p className="text-sm font-medium mt-1">car listings</p>
                  </div>
                </TableCell>
                <TableCell>
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
                        <span className="font-semibold">
                          Multiple Car Types
                        </span>
                      </div>
                    )}
                    <p className="text-sm font-medium">
                      Budget: £{request.budget[0].toLocaleString()} - £
                      {request.budget[1].toLocaleString()}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      View Timeline
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Add Listing
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
    </div>
  );
};

export default DashboardHome;
