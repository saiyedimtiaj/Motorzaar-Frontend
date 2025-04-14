"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/custom-toast";
import { Loader2, Mail } from "lucide-react";
import { useForgotPassword } from "@/hooks/auth.hooks";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutate: resetPassword, isPending } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetPassword(
      { email },
      {
        onSuccess: (data) => {
          setSubmitted(true);
          if (data?.success) {
            toast.success(data?.message);
          } else {
            toast.error(data?.message);
          }
        },
      }
    );
  };
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
        <p className="text-[rgb(var(--color-text-light))] font-semibold">
          {!submitted
            ? "Enter your email to reset your password"
            : "Check your email for reset instructions"}
        </p>
      </div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 rounded-[5px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="w-full text-lg font-semibold"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Loading...
              </span>
            ) : (
              "   Reset Password"
            )}
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-[rgb(var(--color-text-light))] font-semibold">
            We&apos;ve sent password reset instructions to your email. Please
            check your inbox.
          </p>
          <Button
            variant="outline"
            className="w-full text-lg font-semibold"
            onClick={() => setSubmitted(false)}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
