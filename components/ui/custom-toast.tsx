import { toast as sonnerToast } from "sonner";
import { XCircle, CheckCircle } from "lucide-react";
import React from "react";

interface ToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    sonnerToast(
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-white" />
        <span>{message}</span>
      </div>,
      {
        ...options,
        style: {
          background: "#007BFF",
          border: "1px solid #007BFF",
          borderRadius: "0.75rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          maxWidth: "300px",
          margin: "1rem",
          fontFamily: '"Urbanist", sans-serif',
          color: "white",
        },
        unstyled: true,
      }
    );
  },

  error: (message: string, options?: ToastOptions) => {
    sonnerToast(
      <div className="flex items-center gap-2">
        <XCircle className="h-5 w-5 text-white" />
        <span>{message}</span>
      </div>,
      {
        ...options,
        style: {
          background: "#DC3545",
          border: "1px solid #DC3545",
          borderRadius: "0.75rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          maxWidth: "300px",
          margin: "1rem",
          fontFamily: '"Urbanist", sans-serif',
          color: "white",
        },
        unstyled: true,
      }
    );
  },
};
