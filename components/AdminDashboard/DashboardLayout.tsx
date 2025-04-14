"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, User } from "lucide-react";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Admin Dashboard
              </h1>
              <p className="text-blue-100 text-base sm:text-lg font-semibold">
                Manage user requests and your profile
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
              <div className="bg-blue-500/30 backdrop-blur-sm rounded-sm p-3 sm:p-4 text-center min-w-[120px]">
                <p className="text-xs sm:text-sm font-medium text-blue-100">
                  Total Users
                </p>
                <p className="text-xl sm:text-2xl font-bold">1,234</p>
              </div>
              <div className="bg-blue-500/30 backdrop-blur-sm rounded-sm p-3 sm:p-4 text-center min-w-[120px]">
                <p className="text-xs sm:text-sm font-medium text-blue-100">
                  Active Requests
                </p>
                <p className="text-xl sm:text-2xl font-bold">56</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-8">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-[rgb(var(--color-border))] overflow-hidden">
          <div className="px-6 pt-6">
            <div className="bg-gray-100/80 p-1 rounded-sm flex flex-wrap gap-2 w-full">
              <Link
                href={`/admin`}
                className={`rounded-sm px-3 sm:px-6 py-2 sm:py-3 flex-1 text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
                  pathname === "/admin"
                    ? "bg-[rgb(var(--color-primary))] text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="hidden sm:inline">User Requests</span>
                <span className="sm:hidden">Requests</span>
              </Link>

              <Link
                href={`/admin/profile`}
                className={`rounded-sm px-3 sm:px-6 py-2 sm:py-3 flex-1 text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
                  pathname === "/admin/profile"
                    ? "bg-[rgb(var(--color-primary))] text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <User className="w-5 h-5" />
                Profile
              </Link>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-4 sm:px-6 pb-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
