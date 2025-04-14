import LoginForm from "@/components/Forms/LoginForm";
import { Card } from "@/components/ui/card";
import { Car } from "lucide-react";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="min-h-screen flex bg-[rgb(var(--color-bg))]">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-blue-700 items-center justify-center p-12">
        <div className="max-w-xl text-white">
          <div className="flex items-center gap-3 mb-8">
            <Car className="w-12 h-12" />
            <h1 className="text-4xl font-bold">Motorzaar</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome back to Motorzaar</h2>
          <p className="text-xl text-blue-100">
            Find your perfect car at the best price. Compare offers from trusted
            dealers and save thousands.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 space-y-8 rounded-2xl border-2 border-[rgb(var(--color-border))]">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
              <Car className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold">Motorzaar</h1>
            </div>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-[rgb(var(--color-text-light))] font-medium">
              Sign in to your account
            </p>
          </div>

          {/* Login in form is a client component */}
          <Suspense fallback={<div>Loading form...</div>}>
            <LoginForm />
          </Suspense>
        </Card>
      </div>
    </div>
  );
};

export default page;
