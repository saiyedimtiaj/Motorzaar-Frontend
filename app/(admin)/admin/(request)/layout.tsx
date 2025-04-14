import TabsRoutes from "@/components/AdminDashboard/TabsRoutes";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TabsRoutes />
      <div className="mt-5">{children}</div>
    </div>
  );
};

export default layout;
