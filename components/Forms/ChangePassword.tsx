"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { useChangePassword } from "@/hooks/auth.hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "../ui/custom-toast";

const ChangePassword = () => {
  const { mutate: resetPassword, isPending } = useChangePassword();
  const searchParams = useSearchParams();
  const route = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchParams.get("confirmationLink")) {
      toast.error("Please try again!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword(
      {
        password: newPassword,
        token: searchParams.get("confirmationLink") as string,
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            toast.success(data.message);
            route.push("/signin");
          } else {
            toast.error(data.message);
          }
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* New Password */}
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
          <Input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="pl-10 pr-10 rounded-[5px]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute right-3 top-2.5 text-[rgb(var(--color-text-light))]"
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--color-text-light))]" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            className="pl-10 pr-10 rounded-[5px]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-2.5 text-[rgb(var(--color-text-light))]"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <Button
        disabled={isPending}
        type="submit"
        className="w-full text-lg font-semibold"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" />
            Resetting...
          </span>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
};

export default ChangePassword;
