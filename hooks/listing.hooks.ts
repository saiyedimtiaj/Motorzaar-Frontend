import {
  createNewListing,
  getFreeApprovalListing,
  getListingByRequestId,
  getListingForUser,
  getOfferListing,
  getOfferWithListing,
  updateListing,
  updateListingStatus,
} from "@/services/listing.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useNewListing = () => {
  return useMutation({
    mutationKey: ["CREATE_LISTING"],
    mutationFn: async (formData: FormData) => await createNewListing(formData),
  });
};

export const useUpdateListing = () => {
  return useMutation({
    mutationKey: ["UPDATE_LISTING"],
    mutationFn: async (payload: { id: string; formData: FormData }) =>
      await updateListing(payload),
  });
};

export const useGetListingsByRequsetId = (id: string) => {
  return useQuery({
    queryKey: ["GET_LISTING_BY_REQUESTID"],
    queryFn: async () => await getListingByRequestId(id),
  });
};

export const useUpdateListingStatus = () => {
  return useMutation({
    mutationKey: ["UPDATE_LISTING_STATUS"],
    mutationFn: async (id: string) => await updateListingStatus(id),
  });
};

export const useGetOfferedListing = () => {
  return useQuery({
    queryKey: ["GET_OFFERED_LISTING_____________________"],
    queryFn: () => getOfferListing(),
  });
};

export const useGetListingForRequest = () => {
  return useQuery({
    queryKey: ["LISTING_FOR_USER"],
    queryFn: async () => await getListingForUser(),
  });
};

export const useGetOfferedWithListing = (id: string) => {
  return useQuery({
    queryKey: ["OFFERED_WITH_LISTING_____"],
    queryFn: async () => await getOfferWithListing(id),
  });
};

export const useGetFreeApprovalListing = () => {
  return useQuery({
    queryKey: ["FREE_APPROVAL_LISTING"],
    queryFn: async () => await getFreeApprovalListing(),
  });
};
