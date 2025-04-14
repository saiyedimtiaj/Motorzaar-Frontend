"use client";

import SignupForm from "@/components/Forms/SignupForm";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg))] px-4">
      <Card className="w-full max-w-md p-8 space-y-6 rounded-2xl border-2 border-[rgb(var(--color-border))]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-[rgb(var(--color-text-light))] font-semibold">
            Join us to find your perfect car
          </p>
        </div>
        <SignupForm />
      </Card>
    </div>
  );
}
