"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface InitialChoiceProps {
  searchType: "specific" | "unsure" | null;
  onTypeSelect: (type: "specific" | "unsure") => void;
}

export function InitialChoice({
  searchType,
  onTypeSelect,
}: InitialChoiceProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        How would you like to search?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Button
          variant="outline"
          className={cn(
            "h-16 text-lg font-medium",
            searchType === "specific" &&
              "border-blue-500 bg-blue-50 text-blue-700"
          )}
          onClick={() => onTypeSelect("specific")}
        >
          <Check
            className={cn(
              "w-5 h-5",
              searchType === "specific" ? "opacity-100" : "opacity-0"
            )}
          />
          I Know What Car I Want
        </Button>
        <Button
          variant="outline"
          className={cn(
            "h-16 text-lg font-medium",
            searchType === "unsure" &&
              "border-blue-500 bg-blue-50 text-blue-700"
          )}
          onClick={() => onTypeSelect("unsure")}
        >
          <Check
            className={cn(
              "w-5 h-5",
              searchType === "unsure" ? "opacity-100" : "opacity-0"
            )}
          />
          I&apos;m Not Sure What Car I Want
        </Button>
      </div>
    </div>
  );
}
