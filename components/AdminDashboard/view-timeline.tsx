"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllRequestTimeline } from "@/hooks/request.hooks";
import { TRequest, TTimeline } from "@/types";

interface ViewTimelineProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: TRequest;
}

type StatusKey =
  | "sent"
  | "price-submitted"
  | "deposit-paid"
  | "auction-won"
  | "auction-lost"
  | "test-drive-scheduled";

const statusConfig: Record<
  StatusKey,
  {
    icon: React.ElementType;
    color: string;
    bgColor: string;
    label: string;
  }
> = {
  sent: {
    icon: Clock,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    label: "Request Sent",
  },
  "price-submitted": {
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-50",
    label: "Price Submitted",
  },
  "deposit-paid": {
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-50",
    label: "Deposit Paid",
  },
  "auction-won": {
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-50",
    label: "Auction Won",
  },
  "auction-lost": {
    icon: AlertCircle,
    color: "text-red-500",
    bgColor: "bg-red-50",
    label: "Auction Lost",
  },
  "test-drive-scheduled": {
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-50",
    label: "Test Drive Scheduled",
  },
};

export function ViewTimeline({
  open,
  onOpenChange,
  request,
}: ViewTimelineProps) {
  const { data, isLoading } = useGetAllRequestTimeline(request?._id);

  const renderSkeleton = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <Card
        key={index}
        className="p-4 relative rounded-sm bg-gray-100 animate-pulse"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-gray-300 w-8 h-8" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-300 rounded" />
              <div className="h-4 w-20 bg-gray-300 rounded" />
            </div>
            <div className="h-3 w-full bg-gray-300 rounded" />
          </div>
        </div>
        {index < 2 && (
          <div className="absolute left-6 top-14 bottom-0 w-px bg-gray-300" />
        )}
      </Card>
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request Timeline</DialogTitle>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <span className="font-medium">{request.userId.fullName}</span>
            <span>•</span>
            <span>{request.userId.email}</span>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[250px] md:h-[300px]">
          <div className="space-y-4">
            {isLoading
              ? renderSkeleton()
              : data?.data?.map((event: TTimeline, index: number) => {
                  const config = statusConfig[event.status as StatusKey] ?? {
                    icon: AlertCircle,
                    color: "text-gray-500",
                    bgColor: "bg-gray-100",
                    label: event.status
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase()),
                  };

                  const Icon = config.icon;

                  return (
                    <Card
                      key={index}
                      className={cn("p-4 relative rounded-sm", config.bgColor)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn("p-2 rounded-full", config.bgColor)}>
                          <Icon className={cn("w-5 h-5", config.color)} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-[#d9c0c0]">
                              {config.label}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleString("en-GB", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {event.note && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {event.note}
                            </p>
                          )}
                        </div>
                      </div>
                      {index < data?.data?.length - 1 && (
                        <div className="absolute left-6 top-14 bottom-0 w-px bg-gray-200" />
                      )}
                    </Card>
                  );
                })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
