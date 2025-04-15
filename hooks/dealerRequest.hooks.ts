import {
  addDeposit,
  getOfferDetails,
  viewDepositDetails,
} from "@/services/dealerRequest.services";
import { TAddDEpositForm } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddDeposit = () => {
  return useMutation({
    mutationKey: ["ADD_DEPOSIT"],
    mutationFn: async (formData: TAddDEpositForm) => await addDeposit(formData),
  });
};

export const useGetDepositDetails = (id: string) => {
  return useQuery({
    queryKey: ["VIEW_DEPOSIT_DETAILS"],
    queryFn: async () => await viewDepositDetails(id),
  });
};

export const useGetListingForRequest = (id: string) => {
  return useQuery({
    queryKey: ["LISTING_FOR_USER"],
    queryFn: async () => await viewDepositDetails(id),
  });
};

export const useGetOfferDetails = (id: string) => {
  return useQuery({
    queryKey: ["SHOW_OFFERE_DEALER_REQUEST_DETAILS"],
    queryFn: async () => await getOfferDetails(id),
  });
};
