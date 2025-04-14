import {
  changePassword,
  createUser,
  currentUser,
  forgotPassword,
  logInUser,
  TCreateUser,
  updateProfile,
  verifyUser,
} from "@/services/auth.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ["USER_CREATE"],
    mutationFn: async (userData: TCreateUser) => await createUser(userData),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["Forgot_password"],
    mutationFn: async (userData: { email: string }) =>
      await forgotPassword(userData),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["Change_password"],
    mutationFn: async (userData: { password: string; token: string }) =>
      await changePassword(userData),
  });
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationKey: ["USER_CREATE"],
    mutationFn: async (userData: { token: string; activateCode: string }) =>
      await verifyUser(userData),
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: { email: string; password: string }) =>
      await logInUser(userData),
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ["USER_PROFILE_UPDATE"],
    mutationFn: async (formData: FormData) => await updateProfile(formData),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["CURRENT_USER"],
    queryFn: async () => await currentUser(),
  });
};
