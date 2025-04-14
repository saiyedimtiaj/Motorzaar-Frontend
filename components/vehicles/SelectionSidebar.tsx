import React from "react";

import {
  carMakes,
  carModels,
  carTypes,
  fuelTypes,
  transmissionTypes,
} from "@/lib/vehicle-data";
import { FormData } from "@/types/vehicles";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description?: string;
};

const SelectionSidebar = ({
  formData,
  searchType,
  currentStep,
  steps,
}: {
  formData: FormData;
  searchType: string;
  currentStep: number;
  steps: Step[];
}) => {
  return (
    <div className="hidden lg:block">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border border-blue-100 p-8 sticky top-24">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
            Your Selections
          </h4>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-semibold">
              {
                Object.values(formData)
                  .filter((value) =>
                    Array.isArray(value) ? value.length > 0 : Boolean(value)
                  )
                  .filter((value) => value !== true).length
              }
            </span>
          </div>
        </div>
        <dl className="space-y-6">
          {searchType === "specific" && (
            <>
              <div className="group">
                <dt className="text-sm font-medium text-blue-600 mb-1">Make</dt>
                <dd
                  className={cn(
                    "text-lg capitalize font-semibold transition-colors",
                    formData.make ? "text-gray-900" : "text-gray-400 italic"
                  )}
                >
                  {formData.make
                    ? carMakes
                        .find((make) => make.toLowerCase() === formData.make)
                        ?.toUpperCase()
                    : "Not selected"}
                </dd>
              </div>
              <div className="group">
                <dt className="text-sm font-medium text-blue-600 mb-1">
                  Model
                </dt>
                <dd
                  className={cn(
                    "text-lg capitalize font-semibold transition-colors",
                    formData.model ? "text-gray-900" : "text-gray-400 italic"
                  )}
                >
                  {formData.model
                    ? carModels[formData.make]?.find(
                        (model) => model.toLowerCase() === formData.model
                      )
                    : "Not selected"}
                </dd>
              </div>
            </>
          )}
          <div className="group">
            <dt className="text-sm font-medium text-blue-600 mb-1">Budget</dt>
            <dd
              className={cn(
                "text-lg font-semibold",
                formData.budgetTouched
                  ? "text-gray-900"
                  : "text-gray-400 italic"
              )}
            >
              {formData.budgetTouched
                ? `£${formData.budget[0].toLocaleString()} - £${formData.budget[1].toLocaleString()}`
                : "Not selected"}
            </dd>
          </div>
          <div className="group">
            <dt className="text-sm font-medium text-blue-600 mb-1">
              Year Range
            </dt>
            <dd
              className={cn(
                "text-lg font-semibold",
                formData.yearRangeTouched
                  ? "text-gray-900"
                  : "text-gray-400 italic"
              )}
            >
              {formData.yearRangeTouched
                ? `${formData.yearRange[0]} - ${formData.yearRange[1]}`
                : "Not selected"}
            </dd>
          </div>
          <div className="group">
            <dt className="text-sm font-medium text-blue-600 mb-1">
              Car Types
            </dt>
            <dd
              className={cn(
                "text-lg capitalize font-semibold transition-colors",
                formData.carTypes.length > 0
                  ? "text-gray-900"
                  : "text-gray-400 italic"
              )}
            >
              {formData.carTypes.length > 0
                ? formData.carTypes
                    .map(
                      (type) =>
                        carTypes.find((ct) => ct.id === type)?.label || ""
                    )
                    .join(", ")
                : "Not selected"}
            </dd>
          </div>
          <div className="group">
            <dt className="text-sm font-medium text-blue-600 mb-1">
              Transmission
            </dt>
            <dd
              className={cn(
                "text-lg capitalize font-semibold transition-colors",
                formData.transmission.length > 0
                  ? "text-gray-900"
                  : "text-gray-400 italic"
              )}
            >
              {formData.transmission.length > 0
                ? formData.transmission
                    .map(
                      (type) =>
                        transmissionTypes.find((tt) => tt.id === type)?.label ||
                        ""
                    )
                    .join(", ")
                : "Not selected"}
            </dd>
          </div>
          <div className="group">
            <dt className="text-sm font-medium text-blue-600 mb-1">
              Fuel Types
            </dt>
            <dd
              className={cn(
                "text-lg capitalize font-semibold transition-colors",
                formData.fuelTypes.length > 0
                  ? "text-gray-900"
                  : "text-gray-400 italic"
              )}
            >
              {formData.fuelTypes.length > 0
                ? formData.fuelTypes
                    .map(
                      (type) =>
                        fuelTypes.find((ft) => ft.id === type)?.label || ""
                    )
                    .join(", ")
                : "Not selected"}
            </dd>
          </div>
          <div className="group">
            <dt className="text-sm font-medium text-blue-600 mb-1">
              Maximum Mileage
            </dt>
            <dd
              className={cn(
                "text-lg capitalize font-semibold transition-colors",
                formData.maxMileage ? "text-gray-900" : "text-gray-400 italic"
              )}
            >
              {formData.maxMileage
                ? `Up to ${formData.maxMileage.toLocaleString()} miles`
                : "Not selected"}
            </dd>
          </div>
          {searchType === "unsure" && (
            <div className="group">
              <dt className="text-sm font-medium text-blue-600 mb-1">
                Preferred Brand
              </dt>
              <dd
                className={cn(
                  "text-lg capitalize font-semibold transition-colors",
                  formData.preferredBrand === "yes" &&
                    formData.preferredBrandMake
                    ? "text-gray-900"
                    : "text-gray-400 italic"
                )}
              >
                {formData.preferredBrand === "yes"
                  ? formData.preferredBrandMake || "Not selected"
                  : "No preference"}
              </dd>
            </div>
          )}
        </dl>
        {/* Add Part Exchange Section */}
        <div className="group mt-6">
          <dt className="text-sm font-medium text-blue-600 mb-1">
            Part Exchange
          </dt>
          <dd
            className={cn(
              "text-lg capitalize font-semibold transition-colors",
              formData.hasPartExchange !== undefined
                ? "text-gray-900"
                : "text-gray-400 italic"
            )}
          >
            {formData.hasPartExchange === undefined ? (
              "Not selected"
            ) : formData.hasPartExchange ? (
              formData.partExchangeReg ? (
                <>Vehicle Reg: {formData.partExchangeReg}</>
              ) : (
                "Registration needed"
              )
            ) : (
              "No part exchange"
            )}
          </dd>
        </div>
        <div className="mt-8 pt-6 border-t border-blue-100">
          <p className="text-sm text-blue-600 font-medium">
            {currentStep < steps?.length - 1
              ? "Continue filling out the form to find your perfect car match"
              : 'Ready to find your perfect car! Click "Find Cars" to continue'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectionSidebar;
