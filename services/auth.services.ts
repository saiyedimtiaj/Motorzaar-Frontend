/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export type TCreateUser = {
  fullName: string;
  email: string;
  password: string;
};

export const createUser = async (userData: TCreateUser) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const verifyUser = async (userData: {
  token: string;
  activateCode: string;
}) => {
  console.log(userData);
  try {
    const { data } = await axiosInstance.post(
      "/auth/activate-account",
      userData
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const logInUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", userData);
    if (data?.success) {
      (await cookies()).set("accessToken", data?.data?.accessToken);
      (await cookies()).set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const logout = async () => {
  try {
    (await cookies()).delete("accessToken");
    (await cookies()).delete("refreshToken");
  } catch (err: any) {
    return err?.message;
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;
    const { data } = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        "x-refresh-token": refreshToken,
      },
    });
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return decodedToken;
  }
  return decodedToken;
};

export const currentUser = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/current-user`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const forgotPassword = async (userData: { email: string }) => {
  try {
    const { data } = await axiosInstance.post("/auth/reset-password", userData);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const changePassword = async (userData: {
  password: string;
  token: string;
}) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      userData
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateProfile = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.put("/auth/update-profile", formData);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
