import ChangePassword from "@/components/Forms/ChangePassword";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg))] px-4">
      <Card className="w-full max-w-md p-8 space-y-6 rounded-2xl border-2 border-[rgb(var(--color-border))]">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">Set a New Password</h1>
          <p className="text-sm text-[rgb(var(--color-text-light))] font-medium">
            Please enter a new password to secure your account.
          </p>
          <p className="text-sm text-[rgb(var(--color-text-light))] font-medium">
            Make sure it’s strong and not previously used.
          </p>
        </div>
        <Suspense fallback={<div>Loading form...</div>}>
          <ChangePassword />
        </Suspense>

        <div className="text-center">
          <Link
            href="/signin"
            className="inline-flex items-center text-[rgb(var(--color-primary))] hover:underline font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
