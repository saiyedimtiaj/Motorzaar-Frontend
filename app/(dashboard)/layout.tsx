"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import DashboardLayout from "@/components/UserDashboard/DashboardLayout";
import { ReactNode } from "react";

export default function DashboardPage({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <DashboardLayout>{children}</DashboardLayout>
      <div className="mb-12"></div>
      <Footer />
    </>
  );
}
