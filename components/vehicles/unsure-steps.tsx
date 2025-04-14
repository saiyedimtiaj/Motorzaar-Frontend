"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiRangeSlider } from "@/components/ui/multi-range-slider";
import { Info } from "lucide-react";
import { toast } from "@/components/ui/custom-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  carMakes,
  carTypes,
  fuelTypes,
  transmissionTypes,
} from "@/lib/vehicle-data";
import { FormData } from "@/types/vehicles";

interface UnsureStepsProps {
  currentStep: number;
  formData: FormData;
  onFormDataChange: (data: Partial<FormData>) => void;
}

export function UnsureSteps({
  currentStep,
  formData,
  onFormDataChange,
}: UnsureStepsProps) {
  const formatMileage = (value: number): string => {
    return `${value.toLocaleString()} miles`;
  };

  switch (currentStep) {
    case 0:
      return (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <label className="text-xl font-semibold">Budget Range (£)</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-5 h-5 text-blue-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set your minimum and maximum budget</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mt-2">
              <MultiRangeSlider
                value={formData.budget}
                onValueChange={(value) =>
                  onFormDataChange({
                    budget: value as [number, number],
                    budgetTouched: true,
                  })
                }
                max={100_000}
                min={5_000}
                step={1000}
                formatValue={(value) => `£${value.toLocaleString()}`}
                label="Budget Range"
                description="Set your minimum and maximum budget"
              />
            </div>
          </div>
        </div>
      );

    case 1:
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-xl font-semibold">Car Type</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select multiple car types you&apos;re interested in</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {carTypes.map((type) => (
              <Button
                key={type.id}
                variant="outline"
                className={cn(
                  "h-16 text-lg font-medium",
                  formData.carTypes.includes(type.id) &&
                    "border-blue-500 bg-blue-50 text-blue-700"
                )}
                onClick={() => {
                  const checked = !formData.carTypes.includes(type.id);
                  onFormDataChange({
                    carTypes: checked
                      ? [...formData.carTypes, type.id]
                      : formData.carTypes.filter((id) => id !== type.id),
                  });
                }}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-xl font-semibold">Transmission</label>
            <div className="grid grid-cols-2 gap-4">
              {transmissionTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  className={cn(
                    "h-16 text-lg font-medium",
                    formData.transmission.includes(type.id) &&
                      "border-blue-500 bg-blue-50 text-blue-700"
                  )}
                  onClick={() => {
                    const checked = !formData.transmission.includes(type.id);
                    onFormDataChange({
                      transmission: checked
                        ? [...formData.transmission, type.id]
                        : formData.transmission.filter((id) => id !== type.id),
                    });
                  }}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-xl font-semibold">Fuel Type</label>
            <div className="grid grid-cols-2 gap-4">
              {fuelTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  className={cn(
                    "h-16 text-lg font-medium",
                    formData.fuelTypes.includes(type.id) &&
                      "border-blue-500 bg-blue-50 text-blue-700"
                  )}
                  onClick={() => {
                    const checked = !formData.fuelTypes.includes(type.id);
                    onFormDataChange({
                      fuelTypes: checked
                        ? [...formData.fuelTypes, type.id]
                        : formData.fuelTypes.filter((id) => id !== type.id),
                    });
                  }}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-xl font-semibold">Maximum Mileage</label>
            <div className="mt-2">
              <MultiRangeSlider
                value={[0, formData.maxMileage || 70000]}
                onValueChange={(value) => {
                  const maxValue = Math.round(value[1] / 10000) * 10000;
                  if (maxValue >= 10000 && maxValue <= 70000) {
                    onFormDataChange({
                      maxMileage: maxValue,
                      maxMileageTouched: true,
                    });
                  }
                }}
                max={70000}
                min={0}
                step={10000}
                formatValue={formatMileage}
                label="Maximum Mileage"
                description="Set your maximum preferred mileage"
                snapValues={[10000, 20000, 30000, 40000, 50000, 60000, 70000]}
                showOnlyMax={true}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Select your maximum preferred mileage
            </p>
          </div>
          <div>
            <label className="text-xl font-semibold">Year Range</label>
            <div className="mt-2">
              <MultiRangeSlider
                value={formData.yearRange}
                onValueChange={(value) =>
                  onFormDataChange({ yearRange: value as [number, number] })
                }
                max={2025}
                min={2013}
                step={1}
                label="Year Range"
                description="Set your preferred year range"
              />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-xl font-semibold">
              Do you have a part-exchange?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className={cn(
                  "h-16 text-lg font-medium",
                  formData.hasPartExchange &&
                    "border-blue-500 bg-blue-50 text-blue-700"
                )}
                onClick={() => onFormDataChange({ hasPartExchange: true })}
              >
                Yes
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "h-16 text-lg font-medium",
                  formData.hasPartExchange === false &&
                    "border-blue-500 bg-blue-50 text-blue-700"
                )}
                onClick={() => onFormDataChange({ hasPartExchange: false })}
              >
                No
              </Button>
            </div>
            {formData.hasPartExchange && (
              <div className="mt-4">
                <label className="text-lg font-medium mb-2 block">
                  Enter your vehicle registration
                </label>
                <Input
                  placeholder="e.g. AB12 CDE"
                  className="h-12 text-lg font-medium uppercase"
                  value={formData.partExchangeReg || ""}
                  onChange={(e) =>
                    onFormDataChange({ partExchangeReg: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        </div>
      );

    case 3:
      return (
        <div className="space-y-6">
          <div className="space-y-4 bg-white p-8 rounded-xl shadow-sm">
            <label className="text-xl font-semibold">
              Do you have a preferred brand?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className={cn(
                  "h-16 text-lg font-medium",
                  formData.preferredBrand === "yes" &&
                    "border-blue-500 bg-blue-50 text-blue-700"
                )}
                onClick={() => {
                  onFormDataChange({ preferredBrand: "yes" });
                  toast.success("Preferred brand selected");
                }}
              >
                Yes
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "h-16 text-lg font-medium",
                  formData.preferredBrand === "no" &&
                    "border-blue-500 bg-blue-50 text-blue-700"
                )}
                onClick={() => {
                  onFormDataChange({ preferredBrand: "no" });
                  toast.success("No brand preference selected");
                }}
              >
                No
              </Button>
            </div>
          </div>
          {formData.preferredBrand === "yes" && (
            <div className="space-y-4">
              <label className="text-xl font-semibold">Select Brand</label>
              <Select
                value={formData.preferredBrandMake}
                onValueChange={(value) =>
                  onFormDataChange({ preferredBrandMake: value })
                }
              >
                <SelectTrigger className="h-12 text-lg font-medium">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {carMakes.map((make) => (
                    <SelectItem
                      key={make}
                      value={make.toLowerCase()}
                      className="text-lg"
                    >
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}
