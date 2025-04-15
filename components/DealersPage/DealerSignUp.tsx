"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "../ui/custom-toast";
import { useMutation } from "@tanstack/react-query";
import { sendDealerContact } from "@/services/email.services";
import { Loader2 } from "lucide-react";

const DealerSignUp = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendDealerContact,
  });
  const [formData, setFormData] = useState({
    dealershipName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };
  return (
    <section id="signup-form" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-3 md:px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Join Our Network
          </h2>
          <p className="text-lg lg:text-xl font-semibold text-[rgb(var(--color-text-light))]">
            Fill out the form below and our team will get in touch with you
          </p>
        </div>
        <Card className="px-4 py-8 md:p-8 rounded-2xl border-2 border-[rgb(var(--color-border))]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="dealershipName">Dealership Name</Label>
                <Input
                  id="dealershipName"
                  value={formData.dealershipName}
                  onChange={(e) =>
                    setFormData({ ...formData, dealershipName: e.target.value })
                  }
                  className="rounded-[5px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                  className="rounded-[5px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="rounded-[5px]"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="rounded-[5px]"
                />
              </div>
              <div>
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  className="rounded-[5px]"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your dealership and current sales volume..."
                />
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Sending...
                </span>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default DealerSignUp;
