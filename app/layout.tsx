import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/Provider";
import { Toaster as SoonerToaster } from "@/components/ui/sonner";

import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarDeals | Find the Best New Car Deals",
  description:
    "Compare new car deals from trusted dealers. Get the best price on your next car purchase.",
  keywords: "car deals, new cars, car comparison, car buying, car prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.className}>
      <body>
        <Providers> {children}</Providers>
        <Toaster />
        <SoonerToaster />
      </body>
    </html>
  );
}
