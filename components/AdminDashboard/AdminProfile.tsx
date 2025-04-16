"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/custom-toast";
import {
  User,
  Mail,
  Phone,
  Camera,
  ShieldCheck,
  Lock,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useGetCurrentUser, useUpdateProfile } from "@/hooks/auth.hooks";
import AdminProfileScaleton from "./AdminProfileScaleton";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, isLoading, refetch } = useGetCurrentUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  // Store selected file separately
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // State to store image preview + other fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        fullName: data.data.fullName || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        avatar: data.data.avatar || "",
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
      setSelectedFile(file); // store file to send to server
      toast.success("Profile picture updated!");
    }
  };

  if (isLoading) {
    return <AdminProfileScaleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
      <Card className="md:col-span-2 px-4 py-8 md:p-8 border-2 border-[rgb(var(--color-border))] rounded-2xl">
        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Profile Information</h2>
            <Button
              variant={isEditing ? "outline" : "ghost"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={
                    data?.data?.avater
                      ? data?.data?.avater
                      : formData.avatar
                      ? formData.avatar
                      : "/avatar.png"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                  width={300}
                  height={300}
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

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id="name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>
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

      {/* Sidebar Details */}
      <div className="space-y-6">
        {/* Admin Details */}
        <Card className="p-6 border-2 border-[rgb(var(--color-border))] rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold">Admin Details</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[rgb(var(--color-text-light))]">
                Role
              </p>
              <p className="font-semibold">Super Admin</p>
            </div>
            <div>
              <p className="text-sm text-[rgb(var(--color-text-light))]">
                Last Login
              </p>
              <p className="font-semibold">
                {new Date().toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </Card>

        {/* Security Section */}
        <Card className="p-6 border-2 border-[rgb(var(--color-border))] rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Lock className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold">Security</h3>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              Enable 2FA
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
