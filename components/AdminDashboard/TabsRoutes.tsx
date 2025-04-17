"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
  { href: "/admin", label: "New Requests" },
  { href: "/admin/sent-dealer", label: "Sent to Dealer" },
  { href: "/admin/price-submitted", label: "Price Submitted)" },
  { href: "/admin/deposits", label: "Active Deposits" },
  { href: "/admin/progress", label: "Progress Tracking" },
];

const TabsRoutes = () => {
  const pathname = usePathname();

  return (
    <Card className="p-1.5 mt-4 bg-[#F5F5F5] rounded-sm">
      <div className="w-full flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              "flex-1 text-sm sm:text-base px-3 py-1 rounded-sm text-center font-medium transition",
              pathname === tab.href ? "bg-white text-black" : "text-gray-500"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default TabsRoutes;
