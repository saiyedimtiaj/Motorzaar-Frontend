import {
  createRequest,
  getAllRequests,
  getAllRequestTimeline,
  getAllUserRequests,
  sendEmailToDealer,
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

export const useGetAllRequestTimeline = (id: string) => {
  return useQuery({
    queryKey: ["ALL_REQUEST_TIMELINE", id],
    queryFn: () => getAllRequestTimeline(id),
  });
};

type TEmailDealer = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  dealerEmail: string;
};

export const useSendEmailToDealer = () => {
  return useMutation({
    mutationKey: ["SEND_DEALER_INQUERY_EMAIL"],
    mutationFn: async (formdata: TEmailDealer) =>
      await sendEmailToDealer(formdata),
  });
};
