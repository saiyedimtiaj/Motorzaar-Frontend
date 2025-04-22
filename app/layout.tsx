import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/Provider";
import { Toaster as SoonerToaster } from "@/components/ui/sonner";

import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Motozaar",
  description:
    "Compare new car deals from trusted dealers. Get the best price on your next car purchase.",
  keywords: "car deals, new cars, car comparison, car buying, car prices",
  // alternates:{
  //   canonical:""
  // }
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
