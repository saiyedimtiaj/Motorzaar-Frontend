import {
  addDeposit,
  getCustomerOffers,
  getDealerSubmitedListing,
  getOfferDetails,
  getSubmitedPrice,
  updateAuctionStatus,
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

export const useGetCustomerOffers = () => {
  return useQuery({
    queryKey: ["GET_CUSTOMER_OFFER"],
    queryFn: async () => await getCustomerOffers(),
  });
};

export const useGetSubmitedOfferListings = (status: string[]) => {
  return useQuery({
    queryKey: ["GET_DEALER_SUBMITED_OFFER_LISTINGS", status],
    queryFn: async () => await getDealerSubmitedListing(status),
  });
};

export const useUpdateAuctionStatus = () => {
  return useMutation({
    mutationKey: ["UPDATE_AUCTION_STATUS"],
    mutationFn: async (payload: { id: string; status: string }) =>
      await updateAuctionStatus(payload),
  });
};

export const useGetSubmitedPrice = () => {
  return useQuery({
    queryKey: ["GET_SUBMITED_PRICE"],
    queryFn: async () => await getSubmitedPrice(),
  });
};
