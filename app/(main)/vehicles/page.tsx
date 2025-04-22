import VehicleSearch from "@/components/vehicles/VehiclesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vehicles - Motorzaar",
  keywords: "car deals, new cars, car comparison, car buying, car prices",
};

const page = () => {
  return (
    <div>
      <VehicleSearch />
    </div>
  );
};

export default page;
