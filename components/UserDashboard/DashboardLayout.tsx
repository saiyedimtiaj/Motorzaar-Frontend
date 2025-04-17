"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, User, Menu, File } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/user.provider";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const navigation = [
    { id: "/dashboard", label: "Car Offers", icon: Car },
    { id: "/dashboard/your-offers", label: "Your Offers", icon: Car },
    { id: "/dashboard/your-requests", label: "Your Requests", icon: File },
    { id: "/dashboard/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Welcome Back, {user?.fullName}
              </h1>
              <p className="text-blue-100 text-base sm:text-lg font-semibold">
                Your car buying journey starts here
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
              <div className="bg-blue-500/30 backdrop-blur-sm rounded-sm p-3 sm:p-4 text-center min-w-[120px]">
                <p className="text-xs sm:text-sm font-medium text-blue-100">
                  Active Requests
                </p>
                <p className="text-xl sm:text-2xl font-bold">3</p>
              </div>
              <div className="bg-blue-500/30 backdrop-blur-sm rounded-sm p-3 sm:p-4 text-center min-w-[120px]">
                <p className="text-xs sm:text-sm font-medium text-blue-100">
                  Dealer Offers
                </p>
                <p className="text-xl sm:text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-1.5 sm:px-6 lg:px-8 -mt-4 sm:-mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[rgb(var(--color-border))] p-4">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.id === "/dashboard"
                      ? pathname === "/dashboard" ||
                        pathname.startsWith("/dashboard/offer")
                      : pathname.startsWith(item.id);

                  return (
                    <Link
                      key={item.id}
                      href={item.id}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left font-medium transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="bg-white">
                <Button
                  variant="outline"
                  size="icon"
                  className="fixed bottom-6 bg-white right-6 h-10 w-10 rounded-full shadow-lg"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[50vh]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="space-y-2 mt-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.id === "/dashboard"
                        ? pathname === "/dashboard" ||
                          pathname.startsWith("/dashboard/offer")
                        : pathname.startsWith(item.id);

                    return (
                      <Link
                        key={item.id}
                        href={item.id}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left font-medium transition-colors",
                          isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content */}
          <div className="md:flex-1 w-full -mt-8 md:mt-0">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[rgb(var(--color-border))] px-3 py-6 md:p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
