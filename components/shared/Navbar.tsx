"use client";

import { Car, Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { useUser } from "@/lib/user.provider";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { clearAuthCookies } from "@/services/auth.services";

const Navbar = () => {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const route = useRouter();

  // Only show logout on protected routes
  const isProtectedRoute =
    (pathname.startsWith("/dealer") && pathname !== "/dealers") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard");

  const handleLogout = () => {
    setIsLoading(true);
    clearAuthCookies().then(() => {
      route.push("/");
    });
  };

  return (
    <header className="bg-white text-black shadow-lg border-2 border-[rgb(var(--color-cta))] rounded-full mx-2 sm:mx-4 lg:mx-6 mt-2 sm:mt-4 lg:mt-6 mb-2 sm:mb-4 lg:mb-6 px-3 sm:px-4 lg:px-6 sticky top-2 sm:top-4 lg:top-6 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-12 sm:h-14 lg:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[rgb(var(--color-primary))]" />
              <span className="text-lg sm:text-xl font-bold hidden sm:inline">
                Motorzaar
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link
              href="/how-it-works"
              className="hover:text-[rgb(var(--color-cta))] font-semibold text-responsive-base"
            >
              How It Works
            </Link>
            <Link
              href="/reviews"
              className="hover:text-[rgb(var(--color-cta))] font-semibold text-responsive-base"
            >
              Reviews
            </Link>
            <Link
              href="/dealers"
              className="hover:text-[rgb(var(--color-cta))] font-semibold text-responsive-base"
            >
              Dealers
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Nav */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/how-it-works"
                    className="text-lg font-semibold px-2 py-1 rounded-lg hover:bg-gray-100"
                  >
                    How It Works
                  </Link>
                  <Link
                    href="/reviews"
                    className="text-lg font-semibold px-2 py-1 rounded-lg hover:bg-gray-100"
                  >
                    Reviews
                  </Link>
                  <Link
                    href="/dealers"
                    className="text-lg font-semibold px-2 py-1 rounded-lg hover:bg-gray-100"
                  >
                    Dealers
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Auth Section */}
            {user?.email ? (
              isProtectedRoute ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="primary" className="text-sm sm:text-base">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will end your session. You’ll need to log in again
                        to access your dashboard.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Link
                  href={
                    user.role === "admin"
                      ? "/admin"
                      : user.role === "dealer"
                      ? "/dealer"
                      : "/dashboard"
                  }
                >
                  <Button variant="primary" className="text-sm sm:text-base">
                    Dashboard
                  </Button>
                </Link>
              )
            ) : (
              <Link href="/signin">
                <Button variant="primary" className="text-sm sm:text-base">
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
