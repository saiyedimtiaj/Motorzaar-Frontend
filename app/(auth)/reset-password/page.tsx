import ResetPassword from "@/components/Forms/ResetPassword";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg))] px-4">
      <Card className="w-full max-w-md p-8 space-y-6 rounded-2xl border-2 border-[rgb(var(--color-border))]">
        <Suspense fallback={<div>Loading form...</div>}>
          <ResetPassword />
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
}
