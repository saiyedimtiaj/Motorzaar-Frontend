"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, User } from "lucide-react";

const navItems = [
  {
    href: "/dealer",
    label: "Offer Requests",
    icon: <Car className="w-5 h-5 mr-2" />,
  },
  {
    href: "/dealer/submitted",
    label: "Submitted Requests",
    icon: <Car className="w-5 h-5 mr-2" />,
  },
  {
    href: "/dealer/auction",
    label: "Auction",
    icon: <Car className="w-5 h-5 mr-2" />,
  },
  {
    href: "/dealer/profile",
    label: "Profile",
    icon: <User className="w-5 h-5 mr-2" />,
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Dealer Dashboard
              </h1>
              <p className="text-blue-100 text-base sm:text-lg font-semibold">
                Manage your offers and profile
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
              <div className="bg-blue-500/30 backdrop-blur-sm rounded-sm p-3 sm:p-4 text-center min-w-[120px]">
                <p className="text-xs sm:text-sm font-medium text-blue-100">
                  Active Requests
                </p>
                <p className="text-xl sm:text-2xl font-bold">12</p>
              </div>
              <div className="bg-blue-500/30 backdrop-blur-sm rounded-sm p-3 sm:p-4 text-center min-w-[120px]">
                <p className="text-xs sm:text-sm font-medium text-blue-100">
                  Accepted Offers
                </p>
                <p className="text-xl sm:text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation + Content */}
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 -mt-4 sm:-mt-8">
        <div className="bg-white rounded-sm shadow-lg border-2 border-[rgb(var(--color-border))] overflow-hidden">
          {/* Navigation Links */}
          <div className="px-2 md:px-6 pt-6">
            <div className="bg-gray-100/80 p-1 rounded-sm flex flex-wrap gap-2 w-full">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-sm px-3 sm:px-6 py-2 sm:py-3 flex items-center text-sm sm:text-base flex-1 justify-center transition
                      ${
                        isActive
                          ? "bg-[rgb(var(--color-primary))] text-white"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {item.icon}
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">
                      {item.label.split(" ")[0]}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Children Content */}
          <div className="px-4 sm:px-6 pb-6 mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
