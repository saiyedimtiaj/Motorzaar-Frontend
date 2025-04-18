import { TUser } from "@/types";

type Step = {
  title: string;
  description?: string;
};

export const specificCarSteps: Step[] = [
  { title: "Car Details", description: "Select the make and model" },
  { title: "Budget", description: "Set your maximum budget" },
  { title: "Year", description: "Select preferred year range" },
  { title: "Preferences", description: "Select your preferences" },
];

export const unsureSteps: Step[] = [
  { title: "Budget", description: "Set your maximum budget" },
  { title: "Car Type", description: "Select preferred car types" },
  { title: "Preferences", description: "Select your preferences" },
  { title: "Brand", description: "Any preferred brands?" },
  { title: "Confirm", description: "Review your selections" },
];

export const offerStatuses: Record<
  string,
  { label: string; className: string }
> = {
  Approved: { label: "Approved", className: "bg-gray-100 text-gray-800" },
  submitted: {
    label: "Price Submitted",
    className: "bg-blue-100 text-blue-800",
  },
  "Deposit Paid": {
    label: "Deposit Paid",
    className: "bg-black text-white",
  },
  "auction-won": {
    label: "Auction Won",
    className: "bg-green-100 text-green-800",
  },
  "auction-lost": {
    label: "Auction Lost",
    className: "bg-red-100 text-red-800",
  },
  "test-drive-scheduled": {
    label: "Test Drive Scheduled",
    className: "bg-yellow-100 text-yellow-800",
  },
  completed: {
    label: "Sale Complete",
    className: "bg-green-200 text-green-900",
  },
  cancelled: { label: "Cancelled", className: "bg-red-200 text-red-900" },
  "Pre-Approval": { label: "Pre-Approval", className: "border border-black" },
  ready: { label: "ready", className: "bg-black text-white" },
};

export const defaultDealer: TUser = {
  _id: "",
  fullName: "",
  email: "",
  role: "",
  phone: "",
  website: "",
  avater: "",
  createdAt: new Date(),
  addressline1: "",
  addressline2: "",
  town: "",
  country: "",
  postcode: "",
  businessType: "",
  companyRegNumber: "",
  fcaRegNumber: "",
  vatNumber: "",
  yearEstablished: "",
  trustPilotUrl: "",
  googleReviewsUrl: "",

  // Primary Contact
  primaryFirstName: "",
  primaryLastName: "",
  primaryRole: "",
  primaryPhone: "",

  // Secondary Contact
  secondaryFirstName: "",
  secondaryLastName: "",
  secondaryRole: "",
  secondaryEmail: "",
  secondaryPhone: "",

  // Business Address

  // Operating Hours
  weekdayStart: "9:00",
  weekdayEnd: "",
  saturdayStart: "",
  saturdayEnd: "",
  sundayStart: "",
  sundayEnd: "",
};
