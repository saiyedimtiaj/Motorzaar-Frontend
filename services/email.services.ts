"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axiosInstance";

export const sendDealerContact = async (formData: {
  dealershipName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const res = await axiosInstance.post("/email/send", formData);
    return res.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
