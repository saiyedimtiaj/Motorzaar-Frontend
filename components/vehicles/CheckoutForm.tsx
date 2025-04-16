/* eslint-disable @typescript-eslint/no-explicit-any */
import { Shield, Loader } from "lucide-react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/custom-toast";
import { usePaymentConfirm } from "@/hooks/payment.hooks";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const CheckoutForm = ({ carId }: { carId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaymentElementComplete, setIsPaymentElementComplete] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, isPending } = usePaymentConfirm();
  const route = useRouter();
  const { listingId } = useParams();
  console.log(carId);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      mutate(
        { listingId: listingId as string, paymentId: paymentIntent.id },
        {
          onSuccess: (data) => {
            if (data?.success) {
              setIsLoading(true);
              toast.success(data?.message);
              route.push(`/dashboard/offer/${carId}`);
            } else {
              toast.error(data?.message);
            }
          },
        }
      );
      console.log(paymentIntent);
    }

    setIsLoading(false);
  };

  const handlePaymentElementChange = (event: any) => {
    setIsPaymentElementComplete(event.complete);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <PaymentElement
          id="payment-element"
          onChange={handlePaymentElementChange}
          className="mb-4"
        />
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 rounded-sm p-4 flex items-start gap-3 border-2 border-blue-100">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            Your payment is secure and encrypted. We use industry-standard SSL
            encryption.
          </p>
        </div>
        <div className="bg-green-50 rounded-sm p-4 flex items-start gap-3 border-2 border-green-100">
          <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-700">
            Your £199 deposit is fully refundable if the dealer doesn&apos;t win
            the car at auction.
          </p>
        </div>
      </div>

      <Button
        disabled={
          isLoading ||
          !stripe ||
          !elements ||
          !isPaymentElementComplete ||
          isPending
        }
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        size="lg"
      >
        {isLoading || isPending ? (
          <div className="flex items-center justify-center gap-2">
            <Loader className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          "Pay £199 Deposit"
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;
