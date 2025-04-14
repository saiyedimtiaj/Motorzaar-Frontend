"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/custom-toast";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { useCreateUser } from "@/hooks/auth.hooks";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const SignupForm = () => {
  const { mutate: createAccount, isPending } = useCreateUser();
  const searchParams = useSearchParams();
  const route = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    createAccount(formData, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.message);
          route.push("/signin");
        } else {
          toast.error(data?.message);
        }
      },
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
            <Input
              id="name"
              placeholder="Enter your full name"
              className="pl-10 rounded-[5px]"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 rounded-[5px]"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="pl-10 rounded-[5px]"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="pl-10 rounded-[5px]"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full text-lg font-semibold">
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              Creating...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
      <div className="text-center">
        <p className="text-[rgb(var(--color-text-light))] font-semibold">
          Already have an account?{" "}
          <Link
            href={`/signin${
              searchParams.get("redirect")
                ? `?redirect=${searchParams.get("redirect")}`
                : ""
            }`}
            className="text-[rgb(var(--color-primary))] hover:underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignupForm;
