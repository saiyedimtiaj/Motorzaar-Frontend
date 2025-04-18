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

export const getCustomerOffers = async () => {
  try {
    const { data } = await axiosInstance.get(`/dealer-request/customer-offer`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getDealerSubmitedListing = async (status: string[]) => {
  try {
    const { data } = await axiosInstance.get(`/dealer-request/submited-offer`, {
      params: {
        status,
      },
    });
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateAuctionStatus = async (payload: {
  id: string;
  status: string;
}) => {
  try {
    console.log(payload.id);
    const { data } = await axiosInstance.post(
      `/dealer-request/auction-status/${payload.id}`,
      { status: payload.status }
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSubmitedPrice = async () => {
  try {
    const { data } = await axiosInstance.get(`/dealer-request/submited-price`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSubmitedPriceByRequestId = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/dealer-request/submited-price/${id}`
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
