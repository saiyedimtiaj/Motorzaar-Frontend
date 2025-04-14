/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/axiosInstance";
import { FormData } from "@/types/vehicles";

export const createRequest = async (formdata: FormData) => {
  try {
    const { data } = await axiosInstance.post("/request/create", formdata);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllRequests = async ({
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
  try {
    const { data } = await axiosInstance.get("/request", {
      params: { searchTerm, sortBy, page, limit },
    });
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
