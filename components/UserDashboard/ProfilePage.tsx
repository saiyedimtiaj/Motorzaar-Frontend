/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/custom-toast";
import {
  User,
  Mail,
  Phone,
  Loader2,
  Home,
  Building2,
  Landmark,
  Globe,
  MailCheck,
} from "lucide-react";
import { useGetCurrentUser, useUpdateProfile } from "@/hooks/auth.hooks";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfile() {
  const { data, isLoading, refetch } = useGetCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressline1: "",
    addressline2: "",
    town: "",
    country: "",
    postcode: "",
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        fullName: data.data.fullName || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        addressline1: data.data.addressline1 || "",
        addressline2: data.data.addressline2 || "",
        town: data.data.town || "",
        country: data.data.country || "",
        postcode: data.data.postcode || "",
      });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("data", JSON.stringify(formData));

    updateProfile(fd, {
      onSuccess: (data) => {
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
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="py-8 px-4 shadow-none md:shadow-sm md:p-8 border-0 md:border-2 md:border-[rgb(var(--color-border))] rounded-2xl">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div className="space-y-4">
            {[
              { label: "Full Name", icon: User, key: "fullName", type: "text" },
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
              {
                label: "Address Line 1",
                icon: Home,
                key: "addressline1",
                type: "text",
              },
              {
                label: "Address Line 2",
                icon: Building2,
                key: "addressline2",
                type: "text",
              },
              {
                label: "Town / City",
                icon: Landmark,
                key: "town",
                type: "text",
              },
              { label: "Country", icon: Globe, key: "country", type: "text" },
              {
                label: "Postcode",
                icon: MailCheck,
                key: "postcode",
                type: "text",
              },
            ].map(({ label, icon: Icon, key, type }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{label}</Label>
                <div className="relative">
                  <Icon className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id={key}
                    type={type}
                    value={(formData as any)[key]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="pl-10 rounded-[5px]"
                    disabled={!isEditing}
                    readOnly={key === "email"}
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
                "Save Changes"
              )}
            </Button>
          )}
        </form>
      </div>
    </Card>
  );
}
