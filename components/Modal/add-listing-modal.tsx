/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/custom-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "../ui/card";
import { TAddListingForm, TRequest } from "@/types";
import AddListingUploadImage from "../AdminDashboard/AddListingUploadImage";
import AddBesicDetails from "../AdminDashboard/AddBesicDetails";
import ListingFormOtherInputs from "../AdminDashboard/ListingFormOtherInputs";
import { ScrollArea } from "../ui/scroll-area";
import { Loader2 } from "lucide-react";

interface AddCarListingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestDetails: TRequest;
  initialData?: any;
  mode?: "add" | "edit";
  onSubmit: (listing: any) => void;
  isPending: boolean;
}

export default function AddListingModal({
  open,
  onOpenChange,
  requestDetails,
  initialData,
  mode = "add",
  onSubmit,
  isPending,
}: AddCarListingProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [uploadedImages, setUploadedImages] = useState<
    { file: File; preview: string }[]
  >([]);
  const [activeTab, setActiveTab] = useState("form");

  // Initialize images when editing
  useEffect(() => {
    if (initialData && mode === "edit" && initialData.image) {
      // Handle multiple images
      const images = Array.isArray(initialData.images)
        ? initialData.images
        : [initialData.image];
      setUploadedImages(
        images.map((image: string) => ({
          file: null,
          preview: image,
        }))
      );
    }
  }, [initialData, mode]);

  const [formData, setFormData] = useState<TAddListingForm>({
    make: requestDetails?.make || "",
    model: requestDetails?.model || "",
    year: requestDetails?.yearRange?.[0] || new Date().getFullYear().toString(),
    mileage: "",
    fuel: requestDetails?.fuelTypes?.[0] || "",
    transmission: requestDetails?.transmission?.[0] || "",
    color: "",
    engineSize: "",
    registration: "",
    regDate: "",
    owners: "1",
    motExpiry: "",
    vatStatus: "",
    additionalDetails: "",
    auctionHouse: "",
    auctionDate: "",
    hammerPrice: "",
    allInPrice: "",
    images: [] as File[],
    additionalDealerDetails: "",
    carCondition: "", // Added carCondition field
    dealerUrl: "", // Added dealer URL field
  });

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        ...initialData,
        year: initialData.year.toString(),
        mileage: initialData.mileage.toString(),
        owners: initialData.owners.toString(),
        allInPrice: initialData.allInPrice.toString(),
        regDate: initialData.regDate
          ? new Date(initialData.regDate).toISOString().split("T")[0]
          : "",
        motExpiry: initialData.motExpiry
          ? new Date(initialData.motExpiry).toISOString().split("T")[0]
          : "",
        auctionDate: initialData.auctionDate
          ? new Date(initialData.auctionDate).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [initialData, mode]);

  const defaultFormData = {
    make: requestDetails?.make || "",
    model: requestDetails?.model || "",
    year: requestDetails?.yearRange?.[0] || new Date().getFullYear(),
    mileage: "",
    fuel: requestDetails?.fuelTypes?.[0] || "",
    transmission: requestDetails?.transmission?.[0] || "",
    color: "",
    engineSize: "",
    registration: "",
    regDate: "",
    owners: "",
    motExpiry: "",
    vatStatus: "",
    additionalDetails: "",
    auctionHouse: "",
    auctionDate: "",
    hammerPrice: "",
    allInPrice: "",
    images: [] as File[],
    additionalDealerDetails: "",
    carCondition: "", // Added carCondition field
    dealerUrl: "", // Added dealer URL field
  };

  const parseJsonInput = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormData({
        ...formData,
        make: parsed.make || formData.make,
        model: parsed.model || formData.model,
        year: parsed.year || formData.year,
        mileage: parsed.mileage?.toString() || formData.mileage,
        fuel: parsed.fuel?.toLowerCase() || formData.fuel,
        transmission:
          parsed.transmission?.toLowerCase() || formData.transmission,
        color: parsed.color || formData.color,
        engineSize: parsed.engineSize || formData.engineSize,
        registration: parsed.registration || formData.registration,
        regDate: parsed.regDate
          ? parsed.regDate.split("-").reverse().join("-")
          : formData.regDate,
        owners: parsed.owners?.toString() || formData.owners,
        motExpiry: parsed.motExpiry
          ? parsed.motExpiry.split("-").reverse().join("-")
          : formData.motExpiry,
        vatStatus: parsed.vatStatus || formData.vatStatus,
        additionalDetails:
          parsed.additionalDetails || formData.additionalDetails,
        auctionHouse: parsed.auctionHouse || formData.auctionHouse,
        auctionDate: parsed.auctionDate || formData.auctionDate,
        hammerPrice: parsed.hammerPrice?.toString() || formData.hammerPrice,
        allInPrice: parsed.allInPrice?.toString() || formData.allInPrice,
        additionalDealerDetails:
          parsed.additionalDealerDetails || formData.additionalDealerDetails,
        carCondition: parsed.carCondition || formData.carCondition, // Handle carCondition
        dealerUrl: parsed.dealerUrl || formData.dealerUrl, // Handle dealer URL
      });

      toast.success("JSON data parsed successfully");
      setActiveTab("form");
    } catch (error) {
      toast.error("Invalid JSON format");
      console.error("Error parsing JSON:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    // Add JSON data
    const existingImageUrls = uploadedImages
      .filter((img) => img.file === null && img.preview)
      .map((img) => img.preview);

    fd.append(
      "data",
      JSON.stringify({
        ...formData,
        userId: requestDetails.userId?._id,
        requestId: requestDetails._id,
        existingImages: existingImageUrls,
      })
    );

    // Append new images only
    uploadedImages.forEach((img) => {
      console.log(img.file);
      if (img.file) {
        fd.append("images", img.file);
      }
    });

    onSubmit(fd);
  };

  const handleClearData = () => {
    setFormData({ ...defaultFormData });
    setJsonInput("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] overflow-hidden flex flex-col px-0 md:px-0">
        <ScrollArea>
          <form onSubmit={handleSubmit}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 overflow-hidden flex flex-col h-full"
            >
              <DialogHeader className="p-0 md:px-0 py-0 border-b">
                <DialogTitle className="text-2xl">
                  {mode === "edit" ? "Edit Car Listing" : "Add Car Listing"}
                </DialogTitle>
                <div className="mt-4">
                  <Card className="p-0 bg-[#F5F5F5] rounded-sm">
                    <TabsList className="w-full grid grid-cols-2 bg-muted p-0 rounded-lg">
                      <TabsTrigger
                        value="form"
                        className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-[5px] cursor-pointer"
                      >
                        Vehicle Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="json"
                        className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-[5px] cursor-pointer"
                      >
                        JSON Input
                      </TabsTrigger>
                    </TabsList>
                  </Card>
                </div>
              </DialogHeader>

              <TabsContent value="json" className="flex-1 overflow-y-auto p-0">
                <div className="space-y-4">
                  <Label htmlFor="jsonInput">Paste JSON Data</Label>
                  <Textarea
                    id="jsonInput"
                    className="min-h-[200px] font-mono"
                    placeholder="Paste your JSON data here..."
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={parseJsonInput}
                    className="w-full"
                  >
                    Parse JSON & Fill Form
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="form" className="flex-1 overflow-y-auto p-0">
                <div className="space-y-6">
                  <AddBesicDetails
                    formData={formData}
                    setFormData={setFormData}
                  />

                  <AddListingUploadImage
                    setFormData={setFormData}
                    setUploadedImages={setUploadedImages}
                    uploadedImages={uploadedImages}
                    formData={formData}
                  />

                  <ListingFormOtherInputs
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center md:justify-end gap-2 md:gap-4 mt-4 mb-6 px-0 md:px-0">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={handleClearData}
                className="hover:bg-gray-100"
              >
                Clear Data
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : null}
                {mode === "edit" ? "Update Listing" : "Create Listing"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
