import {
  createNewListing,
  getListingByRequestId,
  getListingForUser,
  getOfferListing,
  getOfferWithListing,
  updateListingStatus,
} from "@/services/listing.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useNewListing = () => {
  return useMutation({
    mutationKey: ["CREATE_LISTING"],
    mutationFn: async (formData: FormData) => await createNewListing(formData),
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

export const useGetOfferedListing = ({
  searchTerm = "",
  sortBy = "date",
  page = 1,
  limit = 5,
}: {
  searchTerm?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["GET_OFFERED_LISTING", searchTerm, sortBy, page, limit],
    queryFn: () => getOfferListing({ searchTerm, sortBy, page, limit }),
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
