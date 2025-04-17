import React, { Dispatch, SetStateAction } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Upload } from "lucide-react";
import { TAddListingForm } from "@/types";
import Image from "next/image";

interface UploadedImage {
  file: File | null;
  preview: string;
}

const AddListingUploadImage = ({
  uploadedImages,
  setUploadedImages,
  setFormData,
  formData,
}: {
  uploadedImages: UploadedImage[];
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>;
  setFormData: Dispatch<SetStateAction<TAddListingForm>>;
  formData: TAddListingForm;
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);
      setFormData({ ...formData, images: [...formData.images, ...files] });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">Vehicle Images</Label>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <label
          htmlFor="image-upload"
          className="inline-flex items-center gap-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
        >
          <Upload className="w-4 h-4" />
          Upload Images
        </label>
      </div>

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-32">
                <Image
                  src={image.preview}
                  alt={`Vehicle image ${index + 1}`}
                  className="w-full h-full object-cover rounded-sm"
                  width={200}
                  height={200}
                />
              </div>
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddListingUploadImage;
