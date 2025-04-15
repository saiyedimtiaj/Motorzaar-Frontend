/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TAddDEpositForm } from "@/types";

export const addDeposit = async (formdata: TAddDEpositForm) => {
  try {
    const { data } = await axiosInstance.post(
      "/dealer-request/add-deposit",
      formdata
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const viewDepositDetails = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/dealer-request/offered-requestby-listingId/${id}`
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getOfferDetails = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/dealer-request/details/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
