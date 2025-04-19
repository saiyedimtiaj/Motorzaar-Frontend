import DashboardLayout from "@/components/AdminDashboard/DashboardLayout";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function AdminDashboardPage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <DashboardLayout>{children}</DashboardLayout>
      <div className="mb-12"></div>
      <Footer />
    </>
  );
}
