"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, HelpCircle, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/custom-toast";
import { SpecificCarSteps } from "@/components/vehicles/specific-car-steps";
import { UnsureSteps } from "@/components/vehicles/unsure-steps";
import { FormData } from "@/types/vehicles";
import SelectionSidebar from "@/components/vehicles/SelectionSidebar";
import { specificCarSteps, unsureSteps } from "@/constant";
import { useCreateRequest } from "@/hooks/request.hooks";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/user.provider";

export default function VehicleSearch() {
  const [searchType, setSearchType] = useState<"specific" | "unsure">(
    "specific"
  );
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const { mutate: createRequest, isPending } = useCreateRequest();
  const route = useRouter();

  const calculateProgress = () => {
    let completedSections = 0;
    let totalSections = 0;

    if (searchType === "specific") {
      totalSections = 6; // Make/Model, Budget, Year, Fuel, Transmission, Part Exchange
      if (formData.make && formData.model) completedSections++;
      if (formData.budgetTouched) completedSections++;
      if (formData.yearRangeTouched) completedSections++;
      if (formData.fuelTypes.length > 0) completedSections++;
      if (formData.transmission.length > 0) completedSections++;
      if (formData.hasPartExchange !== undefined) {
        completedSections++;
        if (formData.hasPartExchange && !formData.partExchangeReg) {
          completedSections--; // Incomplete if registration not provided
        }
      }
    } else {
      totalSections = 7; // Budget, Car Types, Fuel, Transmission, Year, Part Exchange, Brand Preference
      if (formData.budgetTouched) completedSections++;
      if (formData.carTypes.length > 0) completedSections++;
      if (formData.fuelTypes.length > 0) completedSections++;
      if (formData.transmission.length > 0) completedSections++;
      if (formData.yearRangeTouched) completedSections++;
      if (formData.hasPartExchange !== undefined) {
        completedSections++;
        if (formData.hasPartExchange && !formData.partExchangeReg) {
          completedSections--; // Incomplete if registration not provided
        }
      }
      if (
        formData.preferredBrand === "no" ||
        (formData.preferredBrand === "yes" && formData.preferredBrandMake)
      ) {
        completedSections++;
      }
    }

    return Math.round((completedSections / totalSections) * 100);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Check for selected car in localStorage
    const selectedCar = localStorage.getItem("selectedCar");
    if (selectedCar) {
      const { make, model } = JSON.parse(selectedCar);
      setSearchType("specific");
      setFormData((prev) => ({ ...prev, make, model }));
      setCurrentStep(1); // Skip to budget step
      localStorage.removeItem("selectedCar"); // Clear the selection
    }
  }, []);

  const [formData, setFormData] = useState<FormData>({
    make: "",
    model: "",
    budget: [5000, 100000] as [number, number],
    yearRange: [2013, 2025] as [number, number],
    maxMileage: 70000,
    maxMileageTouched: false,
    fuelTypes: [],
    transmission: [],
    carTypes: [],
    preferredBrand: "no",
    preferredBrandMake: "",
    budgetTouched: false,
    yearRangeTouched: false,
    hasPartExchange: false,
  });

  const steps = searchType === "specific" ? specificCarSteps : unsureSteps;

  const handleNext = () => {
    // For unsure flow, mark budget as touched when moving past budget step
    if (searchType === "unsure" && currentStep === 0) {
      setFormData((prev) => ({ ...prev, budgetTouched: true }));
    }
    // For specific flow, mark budget as touched when moving past budget step
    if (searchType === "specific" && currentStep === 1) {
      setFormData((prev) => ({ ...prev, budgetTouched: true }));
    }
    if (currentStep === 2 && !formData.yearRangeTouched) {
      setFormData((prev) => ({ ...prev, yearRangeTouched: true }));
    }

    // Validation for specific car steps
    if (searchType === "specific") {
      switch (currentStep) {
        case 0:
          if (!formData.make || !formData.model) {
            toast.error("Please select both make and model");
            return;
          }
          break;
        case 3:
          if (
            formData.fuelTypes.length === 0 ||
            formData.transmission.length === 0
          ) {
            toast.error(
              "Please select at least one fuel type and transmission type"
            );
            return;
          }
          break;
      }
    }

    // Validation for unsure steps
    if (searchType === "unsure") {
      switch (currentStep) {
        case 1:
          if (formData.carTypes.length === 0) {
            toast.error("Please select at least one car type");
            return;
          }
          break;
        case 2:
          if (
            formData.fuelTypes.length === 0 ||
            formData.transmission.length === 0
          ) {
            toast.error(
              "Please select at least one fuel type and transmission type"
            );
            return;
          }
          break;
        case 3:
          if (
            formData.preferredBrand === "yes" &&
            !formData.preferredBrandMake
          ) {
            toast.error("Please select a preferred brand");
            return;
          }
          break;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (searchType) {
      setSearchType("specific");
    }
  };

  const handleSubmit = () => {
    if (user?.email) {
      createRequest(
        { ...formData, searchType },
        {
          onSuccess: (data) => {
            if (data?.success) {
              toast.success(data?.message);
              route.push("/dashboard");
            } else {
              toast.error(data?.message);
            }
          },
        }
      );
    } else {
      localStorage.setItem("carSearchCriteria", JSON.stringify(formData));
      route.push("/signin?redirect=vehicles");
    }
    // Store the search criteria in localStorage
  };

  const handleFormDataChange = (newData: Partial<FormData>) => {
    // Mark ranges as touched when they're changed
    if (newData.budget) {
      newData.budgetTouched = true;
    }
    if (newData.yearRange) {
      newData.yearRangeTouched = true;
    }
    setFormData({ ...formData, ...newData });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex justify-between text-base font-medium mb-2">
            <span></span>
            <span>{calculateProgress()}% Completed</span>
          </div>
          <Progress
            value={calculateProgress()}
            className="h-2 bg-blue-100 [&>div]:bg-blue-500"
          />
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {steps[currentStep].title}
          </h1>
          {steps[currentStep].description && (
            <p className="text-lg text-muted-foreground">
              {steps[currentStep].description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 0 && searchType === "specific" && (
              <Button
                variant="outline"
                className="w-full h-auto py-4 px-6 flex items-center gap-3 text-lg font-medium"
                onClick={() => {
                  setSearchType("unsure");
                  setCurrentStep(0);
                }}
              >
                <HelpCircle className="w-5 h-5" />
                I&apos;m Not Sure What Car I Want
              </Button>
            )}

            {searchType === "specific" ? (
              <SpecificCarSteps
                currentStep={currentStep}
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            ) : (
              <UnsureSteps
                currentStep={currentStep}
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep === 0 && searchType === "unsure") {
                    setSearchType("specific");
                  } else {
                    handleBack();
                  }
                }}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentStep === 0 && searchType === "unsure"
                  ? "Switch to Specific Car"
                  : "Back"}
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center gap-2"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" />
                      Finding...
                    </span>
                  ) : (
                    " Find Cars"
                  )}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          <SelectionSidebar
            currentStep={currentStep}
            formData={formData}
            searchType={searchType}
            steps={steps}
          />
        </div>
      </div>
    </div>
  );
}
