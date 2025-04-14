"use client";
import { Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import { toast } from "../ui/custom-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserLogin } from "@/hooks/auth.hooks";
import { Loader2 } from "lucide-react"; // Spinner icon
import { useUser } from "@/lib/user.provider";

const LoginForm = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const { setIsLoading } = useUser();
  const { mutate: login, isPending } = useUserLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }
    console.log(formData);
    login(formData, {
      onSuccess: (data) => {
        if (data?.success) {
          setIsLoading(true);
          toast.success(data?.message);
          route.push(searchParams.get("redirect") || "/");
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
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
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/reset-password"
                className="text-sm font-semibold text-[rgb(var(--color-primary))] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10 rounded-[5px]"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full text-lg font-semibold"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
      <div className="text-center">
        <p className="text-[rgb(var(--color-text-light))] font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup${
              searchParams.get("redirect")
                ? `?redirect=${searchParams.get("redirect")}`
                : ""
            }`}
            className="text-[rgb(var(--color-primary))] hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
