"use client";
import {
  useCreatePaymentIntent,
  useGetInitialPaymentDetails,
} from "@/hooks/payment.hooks";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentDetailSkeleton from "./PaymentDetailSkeleton";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

const PaymentDetail = () => {
  const { listingId } = useParams();
  const { mutate } = useCreatePaymentIntent();
  const [clientSecret, setClientSecret] = useState("");
  const { data, isLoading } = useGetInitialPaymentDetails(listingId as string);

  useEffect(() => {
    const amount = Math.round(199 * 100);
    mutate(
      { amount },
      {
        onSuccess: (paymentData) => {
          setClientSecret(paymentData?.data);
        },
      }
    );
  }, [mutate]);

  if (isLoading) {
    return <PaymentDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg))] py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Link href={`/vehicles/listing/${listingId}`}>
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="p-6 mb-6 border-2 border-[rgb(var(--color-border))] rounded-sm">
              <h2 className="text-2xl font-bold mb-4">Vehicle Details</h2>
              <div className="space-y-4">
                <div className="relative w-full h-48 rounded-sm overflow-hidden">
                  {data?.data?.listingId?.image?.[0] ? (
                    <Image
                      src={data.data.listingId.images[0]}
                      alt={`${data.data.listingId.make} ${data.data.listingId.model}`}
                      className="object-cover w-full h-full"
                      width={300}
                      height={300}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {data?.data?.listingId?.make} {data?.data?.listingId?.model}
                  </h3>
                  <p className="text-[rgb(var(--color-text-light))]">
                    {data?.data?.listingId?.year} •{" "}
                    {data?.data?.listingId?.mileage.toLocaleString()} miles
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-[rgb(var(--color-border))] rounded-sm">
              <h2 className="text-2xl font-bold mb-6">Price Summary</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-sm p-6 text-white">
                  <p className="text-lg font-semibold mb-2">All-in Price</p>
                  <p className="text-4xl font-bold">
                    £{data?.data?.allInPrice?.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-50 rounded-sm p-6 border-2 border-green-100">
                  <p className="text-lg font-semibold text-green-700 mb-2">
                    Deposit Amount
                  </p>
                  <p className="text-4xl font-bold text-green-600">£199</p>
                </div>
                <div className="bg-gray-50 rounded-sm p-6 border-2 border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-700">
                      Total to Pay Now
                    </p>
                    <p className="text-2xl font-bold text-gray-900">£199</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 border-2 border-[rgb(var(--color-border))] rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-sm">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Payment Details</h2>
              </div>

              {stripePromise && clientSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: clientSecret,
                    appearance: { theme: "flat" },
                  }}
                >
                  <CheckoutForm carId={data?.data?.listingId?._id} />
                </Elements>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
