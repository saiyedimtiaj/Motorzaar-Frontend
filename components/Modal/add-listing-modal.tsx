"use client";

import { useState, useEffect, FormEvent } from "react";
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
import { TAddListingForm, TListing, TRequest } from "@/types";
import AddListingUploadImage from "../AdminDashboard/AddListingUploadImage";
import AddBesicDetails from "../AdminDashboard/AddBesicDetails";
import ListingFormOtherInputs from "../AdminDashboard/ListingFormOtherInputs";
import { ScrollArea } from "../ui/scroll-area";

interface UploadedImage {
  file: File | null;
  preview: string;
}

interface AddCarListingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestDetails: TRequest;
  initialData?: TListing;
  mode?: "add" | "edit";
  onSubmit: (formData: FormData) => void;
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
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [activeTab, setActiveTab] = useState("form");

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
    images: [],
    additionalDealerDetails: "",
    carCondition: "",
    dealerUrl: "",
  });

  useEffect(() => {
    if (initialData && mode === "edit") {
      const existingImages = Array.isArray(initialData.images)
        ? initialData.images
        : [initialData.images];

      setUploadedImages(
        existingImages.map((img) => ({
          file: null,
          preview: img,
        }))
      );

      setFormData({
        ...initialData,
        year: initialData.year?.toString() || "",
        mileage: initialData.mileage?.toString() || "",
        owners: initialData.owners?.toString() || "1",
        allInPrice: initialData.allInPrice?.toString() || "",
        regDate: initialData.regDate
          ? new Date(initialData.regDate).toISOString().split("T")[0]
          : "",
        motExpiry: initialData.motExpiry
          ? new Date(initialData.motExpiry).toISOString().split("T")[0]
          : "",
        auctionDate: initialData.auctionDate
          ? new Date(initialData.auctionDate).toISOString().slice(0, 16)
          : "",
        images: [],
      });
    }
  }, [initialData, mode]);

  const parseJsonInput = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormData((prev) => ({
        ...prev,
        make: parsed.make || prev.make,
        model: parsed.model || prev.model,
        year: parsed.year?.toString() || prev.year,
        mileage: parsed.mileage?.toString() || prev.mileage,
        fuel: parsed.fuel?.toLowerCase() || prev.fuel,
        transmission: parsed.transmission?.toLowerCase() || prev.transmission,
        color: parsed.color || prev.color,
        engineSize: parsed.engineSize || prev.engineSize,
        registration: parsed.registration || prev.registration,
        regDate: parsed.regDate
          ? parsed.regDate.split("-").reverse().join("-")
          : prev.regDate,
        owners: parsed.owners?.toString() || prev.owners,
        motExpiry: parsed.motExpiry
          ? parsed.motExpiry.split("-").reverse().join("-")
          : prev.motExpiry,
        vatStatus: parsed.vatStatus || prev.vatStatus,
        additionalDetails: parsed.additionalDetails || prev.additionalDetails,
        auctionHouse: parsed.auctionHouse || prev.auctionHouse,
        auctionDate: parsed.auctionDate || prev.auctionDate,
        hammerPrice: parsed.hammerPrice?.toString() || prev.hammerPrice,
        allInPrice: parsed.allInPrice?.toString() || prev.allInPrice,
        additionalDealerDetails:
          parsed.additionalDealerDetails || prev.additionalDealerDetails,
        carCondition: parsed.carCondition || prev.carCondition,
        dealerUrl: parsed.dealerUrl || prev.dealerUrl,
      }));
      toast.success("JSON parsed successfully");
      setActiveTab("form");
    } catch (error) {
      toast.error("Invalid JSON format");
      console.error(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!uploadedImages || uploadedImages.length === 0) {
      toast.error("Please upload images");
      return;
    }

    const form = new FormData();

    const existingImageUrls = uploadedImages
      .filter((img) => !img.file && img.preview)
      .map((img) => img.preview);

    form.append(
      "data",
      JSON.stringify({
        ...formData,
        userId: requestDetails.userId?._id,
        requestId: requestDetails._id,
        existingImages: existingImageUrls,
      })
    );

    uploadedImages.forEach((img) => {
      if (img.file) {
        form.append("images", img.file);
      }
    });

    onSubmit(form);
  };

  const handleClearData = () => {
    setFormData({
      ...formData,
      make: "",
      model: "",
      year: new Date().getFullYear().toString(),
      mileage: "",
      fuel: "",
      transmission: "",
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
      images: [],
      additionalDealerDetails: "",
      carCondition: "",
      dealerUrl: "",
    });
    setUploadedImages([]);
    setJsonInput("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] w-full md:max-w-[90vh] overflow-hidden flex flex-col px-4 md:px-6">
        <ScrollArea>
          <form onSubmit={handleSubmit}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col h-full"
            >
              <DialogHeader className="border-b pb-2">
                <DialogTitle className="text-2xl">
                  {mode === "edit" ? "Edit Car Listing" : "Add Car Listing"}
                </DialogTitle>
                <div className="mt-4">
                  <Card className="p-0 bg-[#F5F5F5] rounded-sm">
                    <TabsList className="w-full grid grid-cols-2 bg-muted p-0 rounded-lg">
                      <TabsTrigger value="form">Vehicle Details</TabsTrigger>
                      <TabsTrigger value="json">JSON Input</TabsTrigger>
                    </TabsList>
                  </Card>
                </div>
              </DialogHeader>

              <TabsContent value="json" className="flex-1 overflow-y-auto px-2">
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
                  className="mt-2 w-full"
                >
                  Parse JSON & Fill Form
                </Button>
              </TabsContent>

              <TabsContent
                value="form"
                className="flex-1 overflow-y-auto px-2 space-y-6"
              >
                <AddBesicDetails
                  formData={formData}
                  setFormData={setFormData}
                />
                <AddListingUploadImage
                  formData={formData}
                  setFormData={setFormData}
                  uploadedImages={uploadedImages}
                  setUploadedImages={setUploadedImages}
                />
                <ListingFormOtherInputs
                  formData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClearData}
                disabled={isPending}
              >
                Clear
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? "Saving..."
                  : mode === "edit"
                  ? "Update"
                  : "Submit"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
