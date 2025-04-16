/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance";

export const getInitialPaymentDetails = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/payment/initial-payment/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createPaymentIntent = async ({ amount }: { amount: number }) => {
  try {
    const { data } = await axiosInstance.post(`/payment/payment-intent`, {
      amount,
    });
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const paymentConfirm = async (payload: {
  listingId: string;
  paymentId: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/payment/confirm`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
