import {
  createRequest,
  getAllRequests,
  getAllUserRequests,
} from "@/services/request.services";
import { FormData } from "@/types/vehicles";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateRequest = () => {
  return useMutation({
    mutationKey: ["REQUEST_CREATE"],
    mutationFn: async (formdata: FormData) => await createRequest(formdata),
  });
};

export const useGetAllRequest = () => {
  return useQuery({
    queryKey: ["ALL_REQUESTS"],
    queryFn: () => getAllRequests(),
  });
};

export const useGetAllUserRequest = () => {
  return useQuery({
    queryKey: ["ALL_USER_REQUESTS__"],
    queryFn: () => getAllUserRequests(),
  });
};
