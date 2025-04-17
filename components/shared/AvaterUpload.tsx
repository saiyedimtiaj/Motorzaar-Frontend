import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/custom-toast";

export default function AvatarUpload({
  initialAvatar,
  isEditing,
  onFileSelect,
}: {
  initialAvatar: string;
  isEditing: boolean;
  onFileSelect: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    setPreview(initialAvatar);
  }, [initialAvatar]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onFileSelect(file);
      toast.success("Profile picture updated!");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Image
          src={preview || "/avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
          width={96}
          height={96}
        />
        {isEditing && (
          <button
            type="button"
            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border-2 border-[rgb(var(--color-border))]"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-4 h-4 text-[rgb(var(--color-primary))]" />
          </button>
        )}
      </div>
      {isEditing && (
        <>
          <Button
            type="button"
            className="px-4 py-1.5 text-sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Change Photo
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}
