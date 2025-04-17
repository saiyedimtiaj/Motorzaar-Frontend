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

export const getAllRequests = async () => {
  try {
    const { data } = await axiosInstance.get("/request");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllUserRequests = async () => {
  try {
    const { data } = await axiosInstance.get("/request/user-requests");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
