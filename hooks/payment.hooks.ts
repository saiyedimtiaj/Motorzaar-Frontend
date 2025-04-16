import {
  createPaymentIntent,
  getInitialPaymentDetails,
  paymentConfirm,
} from "@/services/payment.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetInitialPaymentDetails = (id: string) => {
  return useQuery({
    queryKey: ["INITIAL_PAYMENT_DETAILS"],
    queryFn: () => getInitialPaymentDetails(id),
  });
};

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationKey: ["CREATE_PAYMENT_INTENT"],
    mutationFn: async ({ amount }: { amount: number }) =>
      await createPaymentIntent({ amount }),
  });
};

export const usePaymentConfirm = () => {
  return useMutation({
    mutationKey: ["CREATE_PAYMENT_INTENT"],
    mutationFn: async (payload: { listingId: string; paymentId: string }) =>
      await paymentConfirm(payload),
  });
};
