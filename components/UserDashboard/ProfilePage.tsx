"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/custom-toast";
import { User, Mail, Phone, MapPin, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { useGetCurrentUser, useUpdateProfile } from "@/hooks/auth.hooks";
import { Skeleton } from "@/components/ui/skeleton"; // assuming you have a Skeleton component

export default function UserProfile() {
  const { data, isLoading, refetch } = useGetCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.fullName || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        address: data.data.address || "",
        avatar: data.data.avatar || "",
      });
      setPreviewUrl(data.data.avatar || null);
    }
  }, [data]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("data", JSON.stringify(formData));
    if (selectedFile) {
      fd.append("image", selectedFile);
    }
    updateProfile(fd, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast.success(data?.message);
          refetch();
          setIsEditing(false);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <Card className="py-8 px-4 md:p-8 border-2 border-[rgb(var(--color-border))] rounded-2xl">
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="flex items-center gap-4">
            <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
            <Skeleton className="h-10 w-32" />
          </div>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="py-8 px-4 md:p-8 border-2 border-[rgb(var(--color-border))] rounded-2xl">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={
                  data?.data?.avater
                    ? data?.data?.avater
                    : previewUrl
                    ? previewUrl
                    : "/avatar.png"
                }
                alt="Profile"
                className="w-20 md:w-24 h-20 md:h-24 rounded-full object-cover"
                width={96}
                height={96}
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full border-2 border-[rgb(var(--color-border))]"
                >
                  <Camera className="w-4 h-4 text-[rgb(var(--color-primary))]" />
                </button>
              )}
            </div>
            {isEditing && (
              <>
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleImageClick}
                >
                  Change Photo
                </Button>
              </>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {[
              { label: "Full Name", icon: User, key: "name", type: "text" },
              {
                label: "Email Address",
                icon: Mail,
                key: "email",
                type: "email",
              },
              {
                label: "Phone Number",
                icon: Phone,
                key: "phone",
                type: "text",
              },
              { label: "Address", icon: MapPin, key: "address", type: "text" },
            ].map(({ label, icon: Icon, key, type }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{label}</Label>
                <div className="relative">
                  <Icon className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id={key}
                    type={type}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value={(formData as any)[key]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="pl-10 rounded-[5px]"
                    disabled={!isEditing}
                    readOnly={key == "email"}
                  />
                </div>
              </div>
            ))}
          </div>

          {isEditing && (
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Updating...
                </span>
              ) : (
                "   Save Changes"
              )}
            </Button>
          )}
        </form>
      </div>
    </Card>
  );
}
