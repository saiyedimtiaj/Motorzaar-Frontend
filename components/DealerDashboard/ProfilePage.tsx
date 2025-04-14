"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/custom-toast";
import { User, Mail, Phone, MapPin, Camera, Globe } from "lucide-react";
import Image from "next/image";
import { useGetCurrentUser, useUpdateProfile } from "@/hooks/auth.hooks";

export default function DealerProfile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { data, isLoading, refetch } = useGetCurrentUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    avatar: "",
    avatarFile: null as File | null,
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.fullName || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        address: data.data.address || "",
        website: data.data.website || "",
        avatar: data.data.avatar || "",
        avatarFile: null,
      });
      setPreviewImage(data.data.avatar || null);
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatarFile: file }));
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    const { avatarFile, ...rest } = formData;

    form.append("data", JSON.stringify(rest));
    if (avatarFile) {
      form.append("image", avatarFile);
    }

    updateProfile(form, {
      onSuccess: (res) => {
        if (res?.success) {
          toast.success(res.message);
          refetch();
          setIsEditing(false);
        } else {
          toast.error(res.message);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <Card className="p-8 border-2 border-[rgb(var(--color-border))] rounded-2xl animate-pulse">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="h-6 bg-muted rounded w-1/3 mb-4" />
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-muted w-20 h-20" />
            <div className="w-32 h-10 bg-muted rounded" />
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="h-10 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="px-4 py-8 md:p-8 border-2 border-[rgb(var(--color-border))] rounded-2xl">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Dealership Profile</h2>
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
                    : previewImage
                    ? previewImage
                    : "/avatar.png"
                }
                alt="Profile"
                className="md:w-24 md:h-24 w-20 h-20 rounded-full object-cover"
                width={96}
                height={96}
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border-2 border-[rgb(var(--color-border))]"
                >
                  <Camera className="w-4 h-4 text-[rgb(var(--color-primary))]" />
                </button>
              )}
            </div>

            {isEditing && (
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Photo
                </Button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {[
              { id: "name", label: "Dealership Name", icon: User },
              {
                id: "email",
                label: "Email Address",
                icon: Mail,
                type: "email",
              },
              { id: "phone", label: "Phone Number", icon: Phone },
              { id: "address", label: "Address", icon: MapPin },
              { id: "website", label: "Website", icon: Globe, type: "url" },
            ].map(({ id, label, icon: Icon, type = "text" }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <div className="relative">
                  <Icon className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id={id}
                    type={type}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value={(formData as any)[id]}
                    onChange={(e) =>
                      setFormData({ ...formData, [id]: e.target.value })
                    }
                    className="pl-10 rounded-[5px]"
                    disabled={!isEditing}
                    readOnly={id === "email"}
                  />
                </div>
              </div>
            ))}
          </div>

          {isEditing && (
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </form>
      </div>
    </Card>
  );
}
