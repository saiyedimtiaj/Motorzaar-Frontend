import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { toast } from "../ui/custom-toast";
import AuctionConfirmDialog from "./AuctionConfirmDialog";
import { useUpdateAuctionStatus } from "@/hooks/dealerRequest.hooks";

const BUSINESS_HOURS = Array.from({ length: 9 }, (_, i) => i + 9);

const AuctionStatusDetails = ({
  currentStatus,
  testDriveDate,
  id,
  setIsViewModalOpen,
  refetch,
}: {
  currentStatus: string;
  testDriveDate?: string;
  id: string;
  setIsViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}) => {
  const [date, setDate] = useState<Date>();
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusToConfirm, setStatusToConfirm] = useState("");
  const { mutate, isPending } = useUpdateAuctionStatus();

  const handleSetTestDriveDate = (dateTime: Date) => {
    console.log(dateTime);

    toast.success("Test drive date set successfully");
  };

  const handleConfirmStatus = (status: string) => {
    mutate(
      { id, status },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setIsDialogOpen(false);
            setIsViewModalOpen(false);
            toast.success(data?.message);
            refetch();
          } else {
            toast.error(data?.message);
          }
        },
      }
    );
  };

  return (
    <Card className="p-4 md:p-6 border-2 border-[rgb(var(--color-border))] rounded-sm bg-gradient-to-br from-blue-50 to-white">
      <h3 className="text-2xl font-bold mb-6 text-blue-900">
        Update Vehicle Status
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div
            className={cn(
              "p-4 md:p-6 rounded-sm border-2 transition-all duration-300",
              currentStatus === "Deposit Paid"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    currentStatus === "Deposit Paid"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  )}
                >
                  1
                </div>
                <h4 className="text-lg font-bold">Deposit Paid</h4>
              </div>
              {currentStatus === "Deposit Paid" && (
                <Badge variant="secondary">{currentStatus}</Badge>
              )}
            </div>
            <p className="text-gray-600 mb-4">
              Customer has paid the deposit and is awaiting auction results.
            </p>
            {currentStatus === "Deposit Paid" && (
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setIsDialogOpen(true);
                    setStatusToConfirm("auction-won");
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Won at Auction
                </Button>
                <Button
                  onClick={() => {
                    setIsDialogOpen(true);
                    setStatusToConfirm("auction-lost");
                  }}
                  variant="destructive"
                  className="flex-1"
                >
                  Lost at Auction
                </Button>
              </div>
            )}
          </div>

          <div
            className={cn(
              "p-4 md:p-6 rounded-sm border-2 transition-all duration-300",
              currentStatus === "auction-won"
                ? "border-green-500 bg-green-50"
                : currentStatus === "auction-lost"
                ? "border-red-500 bg-red-50"
                : "border-gray-200"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    currentStatus === "auction-won"
                      ? "bg-green-500 text-white"
                      : currentStatus === "auction-lost"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  )}
                >
                  2
                </div>
                <h4 className="text-lg font-bold">Auction Result</h4>
              </div>
              {(currentStatus === "auction-won" ||
                currentStatus === "auction-lost") && (
                <Badge
                  variant={
                    currentStatus === "auction-won"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {currentStatus === "auction-won" ? "Won" : "Lost"}
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mb-4">
              {currentStatus === "auction-won"
                ? "Successfully secured the vehicle at auction."
                : currentStatus === "auction-lost"
                ? "Unable to secure the vehicle at auction. Customer's deposit will be refunded."
                : "Awaiting auction result."}
            </p>
            {currentStatus === "auction-won" && (
              <Button
                onClick={() => {
                  setStatusToConfirm("ready");
                  setIsDialogOpen(true);
                }}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Mark Ready for Test Drive & Collection
              </Button>
            )}
          </div>

          <div
            className={cn(
              "p-4 md:p-6 rounded-sm border-2 transition-all duration-300",
              currentStatus === "ready"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    currentStatus === "ready"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  )}
                >
                  3
                </div>
                <h4 className="text-lg font-bold">Test Drive & Collection</h4>
              </div>
              {currentStatus === "ready" && (
                <Badge variant="secondary">Current Status</Badge>
              )}
            </div>
            <p className="text-gray-600 mb-4">
              Vehicle is ready for customer test drive and collection.
            </p>
          </div>
        </div>

        {currentStatus === "ready" && (
          <div className="space-y-2">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Test Drive Date</span>
              {testDriveDate && (
                <span className="text-sm text-blue-600 font-medium">
                  Customer selected:{" "}
                  {format(new Date(testDriveDate), "dd MMM yyyy HH:mm")}
                </span>
              )}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Set test drive date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                {!showTimeSelect ? (
                  <Calendar
                    mode="single"
                    selected={date}
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
          </div>
        )}
      </div>
      <AuctionConfirmDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        statusToConfirm={statusToConfirm}
        handleConfirmStatus={handleConfirmStatus}
        isPending={isPending}
      />
    </Card>
  );
};

export default AuctionStatusDetails;
