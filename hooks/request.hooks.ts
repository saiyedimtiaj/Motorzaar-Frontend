import { createRequest, getAllRequests } from "@/services/request.services";
import { FormData } from "@/types/vehicles";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateRequest = () => {
  return useMutation({
    mutationKey: ["REQUEST_CREATE"],
    mutationFn: async (formdata: FormData) => await createRequest(formdata),
  });
};

export const useGetAllRequest = ({
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
    queryKey: ["ALL_REQUESTS", searchTerm, sortBy, page, limit],
    queryFn: () => getAllRequests({ searchTerm, sortBy, page, limit }),
  });
};
