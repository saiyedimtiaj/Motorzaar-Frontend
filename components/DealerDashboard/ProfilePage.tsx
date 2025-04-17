"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/custom-toast";
import {
  Building2,
  Clock,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
} from "lucide-react";
import { TUser } from "@/types";
import AdminProfileScaleton from "../AdminDashboard/AdminProfileScaleton";
import { useGetCurrentUser, useUpdateProfile } from "@/hooks/auth.hooks";
import AvatarUpload from "../shared/AvaterUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function DealerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data, isLoading, refetch } = useGetCurrentUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const { control, register, handleSubmit, reset } = useForm<TUser>({
    defaultValues: data?.data,
  });

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);

  const onSubmit = (formData: TUser) => {
    const fd = new FormData();
    fd.append("data", JSON.stringify(formData));
    if (selectedFile) {
      fd.append("image", selectedFile);
    }

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

  const businessHours = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8;
    const value = `${hour.toString().padStart(2, "0")}:00`;
    return { value, label: value };
  });

  if (isLoading) {
    return <AdminProfileScaleton />;
  }

  return (
    <Card className="py-y px-0 md:p-8 border-0 shadow-none md:shadow-sm md:border-2 border-[rgb(var(--color-border))] rounded-2xl">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Dealership Profile</h2>
          <Button
            variant={isEditing ? "outline" : "link"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar */}
          <AvatarUpload
            initialAvatar={data?.data?.avater || ""}
            isEditing={isEditing}
            onFileSelect={(file) => setSelectedFile(file)}
          />

          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Business Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dealershipName">Dealership Name</Label>
                <Input
                  id="dealershipName"
                  disabled={!isEditing}
                  {...register("fullName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Controller
                  control={control}
                  name="businessType"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={data?.data?.businessType}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="independent">Independent</SelectItem>
                        <SelectItem value="franchise">Franchise</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyRegNumber">
                  Company Registration Number
                </Label>
                <Input
                  id="companyRegNumber"
                  disabled={!isEditing}
                  {...register("companyRegNumber")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fcaRegNumber">FCA Registration Number</Label>
                <Input
                  id="fcaRegNumber"
                  disabled={!isEditing}
                  {...register("fcaRegNumber")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vatNumber">VAT Number</Label>
                <Input
                  id="vatNumber"
                  disabled={!isEditing}
                  {...register("vatNumber")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearEstablished">Year Established</Label>
                <Input
                  id="yearEstablished"
                  type="number"
                  disabled={!isEditing}
                  {...register("yearEstablished")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                <Input
                  id="website"
                  className="pl-10"
                  disabled={!isEditing}
                  {...register("website")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trustPilotUrl">Trust Pilot URL</Label>
                <div className="relative">
                  <Star className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id="trustPilotUrl"
                    className="pl-10"
                    disabled={!isEditing}
                    {...register("trustPilotUrl")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleReviewsUrl">Google Reviews URL</Label>
                <div className="relative">
                  <Star className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id="googleReviewsUrl"
                    className="pl-10"
                    disabled={!isEditing}
                    {...register("googleReviewsUrl")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Primary Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5" />
              Primary Contact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryFirstName">First Name</Label>
                <Input
                  id="primaryFirstName"
                  {...register("primaryFirstName")}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryLastName">Last Name</Label>
                <Input
                  id="primaryLastName"
                  {...register("primaryLastName")}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryRole">Role</Label>
                <Input
                  id="primaryRole"
                  {...register("primaryRole")}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id="primaryEmail"
                    {...register("email")}
                    readOnly
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryPhone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id="primaryPhone"
                    {...register("primaryPhone")}
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5" />
              Secondary Contact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="secondaryFirstName">First Name</Label>
                <Input
                  id="secondaryFirstName"
                  {...register("secondaryFirstName")}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryLastName">Last Name</Label>
                <Input
                  id="secondaryLastName"
                  {...register("secondaryLastName")}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryRole">Role</Label>
                <Input
                  id="secondaryRole"
                  {...register("secondaryRole")}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id="secondaryEmail"
                    {...register("secondaryEmail")}
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryPhone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
                  <Input
                    id="secondaryPhone"
                    {...register("secondaryPhone")}
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Address */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Business Address
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  {...register("addressline1")}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  {...register("addressline2")}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="town">Town/City</Label>
                  <Input
                    id="town"
                    {...register("town")}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">County</Label>
                  <Input
                    id="country"
                    {...register("country")}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  {...register("postcode")}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          {/* Opening hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Operating Hours
            </h3>

            <div className="space-y-4">
              {/* Monday to Friday */}
              <div className="space-y-2">
                <Label>Monday to Friday</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="weekdayStart"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={data?.data?.weekdayStart}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent className="h-48">
                          {businessHours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Controller
                    name="weekdayEnd"
                    control={control}
                    render={({ field }) => (
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={data?.data?.weekdayEnd}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent className="h-48">
                          {businessHours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Saturday */}
              <div className="space-y-2">
                <Label>Saturday</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="saturdayStart"
                    control={control}
                    render={({ field }) => (
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={data?.data?.saturdayStart}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent className="h-48">
                          <SelectItem value="closed">Closed</SelectItem>
                          {businessHours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Controller
                    name="saturdayEnd"
                    control={control}
                    render={({ field }) => (
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={data?.data?.saturdayEnd}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent className="h-48">
                          <SelectItem value="closed">Closed</SelectItem>
                          {businessHours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Sunday & Bank Holidays */}
              <div className="space-y-2">
                <Label>Sunday & Bank Holidays</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="sundayStart"
                    control={control}
                    render={({ field }) => (
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={data?.data?.sundayStart}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent className="h-48">
                          <SelectItem value="closed">Closed</SelectItem>
                          {businessHours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Controller
                    name="sundayEnd"
                    control={control}
                    render={({ field }) => (
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={data?.data?.sundayEnd}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent className="h-48">
                          <SelectItem value="closed">Closed</SelectItem>
                          {businessHours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
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
