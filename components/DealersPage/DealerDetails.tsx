"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Globe, Building2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/lib/user.provider";
import ContactDealerModal from "../Modal/ContactDealerModal";
import { useGetDealerProfile } from "@/hooks/auth.hooks";

export default function DealerProfileContent() {
  const [showContactDialog, setShowContactDialog] = useState(false);
  const { id } = useParams();
  const { data, isLoading } = useGetDealerProfile(id as string);
  const router = useRouter();
  const { user } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 animate-pulse">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="h-10 w-32 bg-gray-200 rounded-md" />

          <Card className="rounded-sm p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar Placeholder */}
              <div className="w-32 h-32 bg-gray-200 rounded-2xl" />

              {/* Info Placeholder */}
              <div className="flex-1 space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                <div className="flex gap-2 flex-wrap">
                  <div className="h-6 w-24 bg-gray-200 rounded" />
                  <div className="h-6 w-20 bg-gray-200 rounded" />
                  <div className="h-6 w-28 bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-40 bg-gray-200 rounded mt-4" />
                <div className="flex gap-4 flex-wrap mt-4">
                  <div className="h-5 w-28 bg-gray-200 rounded" />
                  <div className="h-5 w-36 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column placeholders */}
            <div className="space-y-8">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="rounded-sm p-6 space-y-4">
                  <div className="h-6 w-1/3 bg-gray-200 rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  </div>
                </Card>
              ))}
            </div>

            {/* Right column placeholders */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="rounded-sm p-6">
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-6" />
                <div className="grid sm:grid-cols-2 gap-8">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-4 w-3/4 bg-gray-200 rounded" />
                      <div className="h-4 w-2/3 bg-gray-200 rounded" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded" />
                      <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Dealer Header */}
        <Card className="rounded-sm p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo/Image */}
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
              {data?.data?.avater ? (
                <Image
                  src={data?.data?.avater}
                  alt={data?.data?.dealershipName || "Dealer Avatar"}
                  width={300}
                  height={300}
                  className="object-cover w-32 h-32"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{data?.data?.fullName}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {data?.data?.businessType}
                    </Badge>
                    <Badge variant="outline">
                      Est. {data?.data?.yearEstablished}
                    </Badge>
                    {data?.data?.fcaRegNumber && (
                      <Badge variant="outline">FCA Registered</Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => setShowContactDialog(true)}
                >
                  Contact Dealer
                </Button>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-4 mt-4">
                {data?.data?.website && (
                  <a
                    href={data?.data?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
                {data?.data?.trustPilotUrl && (
                  <a
                    href={data?.data?.trustPilotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Star className="w-4 h-4" />
                    Trustpilot Reviews
                  </a>
                )}
                {data?.data?.googleReviewsUrl && (
                  <a
                    href={data?.data?.googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Star className="w-4 h-4" />
                    Google Reviews
                  </a>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Business Address */}
            <Card className="rounded-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                Location
              </h2>
              <div className="space-y-1">
                <p className="font-medium">{data?.data?.addressline1}</p>
                {data?.data?.addressline2 && (
                  <p className="font-medium">{data?.data?.addressline2}</p>
                )}
                <p className="font-medium">{data?.data?.town}</p>
                <p className="font-medium">{data?.data?.country}</p>
                <p className="font-medium">{data?.data?.postcode}</p>
              </div>
            </Card>

            {/* Opening Hours */}
            <Card className="rounded-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                Opening Hours
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="font-medium">Monday - Friday</p>
                  <p>{data?.data?.weekday}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Saturday</p>
                  <p>{data?.data?.saturday}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Sunday & Bank Holidays</p>
                  <p>{data?.data?.sunday}</p>
                </div>
              </div>
            </Card>

            {/* Business Information */}
            <Card className="rounded-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                Business Information
              </h2>
              <div className="space-y-3">
                {data?.data?.companyRegNumber && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Company Registration Number
                    </p>
                    <p className="font-medium">
                      {data?.data?.companyRegNumber}
                    </p>
                  </div>
                )}
                {data?.data?.fcaRegNumber && (
                  <div>
                    <p className="text-sm text-gray-500">
                      FCA Registration Number
                    </p>
                    <p className="font-medium">{data?.data?.fcaRegNumber}</p>
                  </div>
                )}
                {data?.data?.vatNumber && (
                  <div>
                    <p className="text-sm text-gray-500">VAT Number</p>
                    <p className="font-medium">{data?.data?.vatNumber}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Primary Contact */}
            <Card className="rounded-sm p-6">
              <h2 className="text-xl font-bold mb-6">Contact Details</h2>

              <div className="grid sm:grid-cols-2 gap-8">
                {/* Primary Contact */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Primary Contact</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">
                        {data?.data?.primaryFirstName}{" "}
                        {data?.data?.primaryLastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium">{data?.data?.primaryRole}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${data?.data?.email}`}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        {data?.data?.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${data?.data?.phone}`}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        {data?.data?.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Secondary Contact */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Secondary Contact</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">
                        {data?.data?.secondaryFirstName}{" "}
                        {data?.data?.secondaryLastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium">{data?.data?.secondaryRole}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${data?.data?.secondaryEmail}`}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        {data?.data?.secondaryEmail}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${data?.data?.secondaryPhone}`}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        {data?.data?.secondaryPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Form */}
            <Card className="rounded-sm p-6">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                  Have a question about a vehicle or want to schedule a viewing?
                  <br />
                  Contact us directly or use our online form.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="flex-1 sm:flex-initial"
                    onClick={() => setShowContactDialog(true)}
                  >
                    Contact Dealer
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <ContactDealerModal
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        dealerName={data?.data?.fullName}
        dealerPhone={data?.data?.phone}
        offerNumber="N/A"
        userProfile={{
          email: user?.email,
          fullName: user?.fullName,
          phone: user?.phone,
        }}
      />
    </div>
  );
}
