"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/custom-toast";
import { useSendEmailToDealer } from "@/hooks/request.hooks";

interface ContactDealerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dealerName: string;
  dealerEmail: string;
  dealerPhone: string;
  offerNumber: string;
  userProfile: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
}

type ContactMode = "initial" | "call" | "message";

export default function ContactDealerModal({
  open,
  onOpenChange,
  dealerName,
  dealerEmail,
  dealerPhone,
  offerNumber,
  userProfile = {
    fullName: "",
    email: "",
    phone: "",
  },
}: ContactDealerProps) {
  const [mode, setMode] = useState<ContactMode>("initial");
  const { mutate: sendEmai, isPending } = useSendEmailToDealer();
  const [formData, setFormData] = useState({
    fullName: userProfile.fullName,
    email: userProfile.email,
    phone: userProfile.phone,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendEmai(
      {
        dealerEmail,
        fullName: formData.fullName as string,
        email: formData.email as string,
        message: formData.message,
        phone: formData.message,
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            toast.success(data?.message);
            onOpenChange(false);
            setMode("initial");
          } else {
            toast.error(data?.message);
          }
        },
      }
    );
  };

  const renderContent = () => {
    switch (mode) {
      case "call":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-2 md:p-4 rounded-sm">
              <p className="font-semibold mb-2">
                Make a note of your Offer Number below, {dealerName} will ask
                you for it:
              </p>
              <p className="text-base md:text-xl font-bold text-blue-700">
                #{offerNumber}
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Call {dealerName}</p>
              <p className="text-base md:text-xl  font-bold text-blue-700">
                {dealerPhone}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Carvaly uses your details in accordance with our privacy policy.
              By calling you agree that we will pass your details to the seller
              who will use your details in accordance with their privacy policy.
            </p>
            <div className="border-t pt-4">
              <p className="text-center text-gray-600">
                Alternatively, you can{" "}
                <button
                  className="text-blue-600 hover:underline font-semibold"
                  onClick={() => setMode("message")}
                >
                  send a message
                </button>
              </p>
            </div>
          </div>
        );

      case "message":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid  gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
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
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Enter your message..."
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Sending...
                </span>
              ) : (
                " Send Message"
              )}
            </Button>
            <div className="border-t pt-4">
              <p className="text-center text-gray-600">
                Alternatively, you can{" "}
                <button
                  className="text-blue-600 hover:underline font-semibold"
                  onClick={() => setMode("call")}
                >
                  call the dealer
                </button>
              </p>
            </div>
          </form>
        );

      default:
        return (
          <div className="space-y-4">
            <Button
              className="w-full"
              size="lg"
              onClick={() => setMode("call")}
            >
              <Phone className="mr-2 h-4 w-4" /> Call Dealer
            </Button>
            <Button
              className="w-full"
              size="lg"
              variant="outline"
              onClick={() => setMode("message")}
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Message Dealer
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        onOpenChange(newOpen);
        if (!newOpen) setMode("initial");
      }}
    >
      <DialogContent className="sm:max-w-[425px] py-6 px-3 md:px-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact {dealerName}</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
