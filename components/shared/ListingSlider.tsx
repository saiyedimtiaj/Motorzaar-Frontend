"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ListingSlider = ({
  carImages,
  altText,
}: {
  carImages: string[];
  altText: string;
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedImage = carImages[selectedImageIndex];

  const isValidImage = (src: string | undefined) =>
    !!src && typeof src === "string" && src.trim() !== "";

  return (
    <Card className="overflow-hidden rounded-sm">
      <div className="relative h-[500px] bg-black">
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-3 hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            setSelectedImageIndex((prev) =>
              prev > 0 ? prev - 1 : carImages.length - 1
            );
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {isValidImage(selectedImage) && (
          <Image
            src={selectedImage}
            alt={altText}
            fill
            className="object-cover"
          />
        )}

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-3 hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            setSelectedImageIndex((prev) =>
              prev < carImages.length - 1 ? prev + 1 : 0
            );
          }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full">
          {selectedImageIndex + 1}/{carImages.length}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 p-2 bg-gray-100">
        {carImages.map((image, index) =>
          isValidImage(image) ? (
            <div
              key={index}
              className={cn(
                "relative h-24 cursor-pointer overflow-hidden rounded-sm border-2",
                selectedImageIndex === index
                  ? "border-blue-500"
                  : "border-transparent"
              )}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image}
                alt={`${altText} ${index}`}
                fill
                className="object-cover"
              />
            </div>
          ) : null
        )}
      </div>
    </Card>
  );
};

export default ListingSlider;
