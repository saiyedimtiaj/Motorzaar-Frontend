import DashboardLayout from "@/components/DealerDashboard/DashboardLayout";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <DashboardLayout>{children}</DashboardLayout>
      <Footer />
    </>
  );
};

export default layout;
