import React from "react";
import { Card } from "../ui/card";

const AdminProfileScaleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 animate-pulse">
      {/* Main Profile Card Skeleton */}
      <Card className="md:col-span-2 px-4 py-8 md:p-8 border-2 border-[rgb(var(--color-border))] rounded-2xl">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div className="h-6 w-40 bg-muted rounded" />
            <div className="h-10 w-24 bg-muted rounded" />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-muted rounded-full" />
            <div className="h-10 w-32 bg-muted rounded" />
          </div>

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-10 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
          <div className="h-10 w-full bg-muted rounded" />
        </div>
      </Card>

      {/* Sidebar Skeleton */}
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <Card
            key={i}
            className="p-6 border-2 border-[rgb(var(--color-border))] rounded-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted rounded-lg" />
              <div className="h-5 w-32 bg-muted rounded" />
            </div>
            <div className="space-y-4">
              {[...Array(2)].map((__, j) => (
                <div key={j}>
                  <div className="h-4 w-20 bg-muted rounded" />
                  <div className="h-5 w-40 bg-muted rounded" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProfileScaleton;
