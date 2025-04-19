/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance";

export const getDashboardData = async (path: string) => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/${path}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
