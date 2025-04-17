import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ModalListingSlider = ({
  images,
  make,
  model,
}: {
  images: string[];
  make: string;
  model: string;
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageScroll = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedImageIndex((prev) =>
        prev > 0 ? prev - 1 : images.length - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev < images.length - 1 ? prev + 1 : 0
      );
    }
  };
  return (
    <div className="relative h-[400px] bg-black rounded-sm overflow-hidden group">
      {images.length > 0 ? (
        <>
          <Image
            src={images[selectedImageIndex]}
            alt={`${make} ${model}`}
            className="w-full h-full object-contain"
            width={500}
            height={500}
          />
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleImageScroll("prev")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleImageScroll("next")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full font-medium">
            {selectedImageIndex + 1}/{images.length}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white text-lg">
          No images available
        </div>
      )}
    </div>
  );
};

export default ModalListingSlider;
