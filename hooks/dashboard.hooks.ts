import { getDashboardData } from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query";

export const useUserDashboardInfo = () => {
  return useQuery({
    queryKey: ["GET_USER_DASHBOARD_DATA"],
    queryFn: async () => await getDashboardData("user"),
  });
};

export const useAdminDashboardInfo = () => {
  return useQuery({
    queryKey: ["GET_ADMIN_DASHBOARD_DATA"],
    queryFn: async () => await getDashboardData("admin"),
  });
};

export const useDealerDashboardInfo = () => {
  return useQuery({
    queryKey: ["GET_DEALER_DASHBOARD_DATA"],
    queryFn: async () => await getDashboardData("dealer"),
  });
};
