/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance";

export const createNewListing = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post(`/listing/create`, formData);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getListingByRequestId = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/listing/getby-requestId/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateListingStatus = async (id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/listing/update-status/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getOfferListing = async ({
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
    const { data } = await axiosInstance.get("/listing/offer-listing", {
      params: { searchTerm, sortBy, page, limit },
    });
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getListingForUser = async () => {
  try {
    const { data } = await axiosInstance.get(`/listing`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getOfferWithListing = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/listing/listing-offer/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
