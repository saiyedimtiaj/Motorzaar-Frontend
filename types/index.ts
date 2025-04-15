export type TUser = {
  fullName: string;
  email: string;
  role: string;
  _id: string;
  createdAt?: string;
  phone: string;
};

export interface TRequest {
  userId: TUser;
  make: string;
  model: string;
  budget: [number, number];
  yearRange: [number, number];
  fuelTypes: string[];
  maxMileage: number | null;
  maxMileageTouched: boolean;
  transmission: string[];
  carTypes: string[];
  preferredBrand: "yes" | "no";
  preferredBrandMake: string;
  budgetTouched: boolean;
  yearRangeTouched: boolean;
  hasPartExchange: boolean;
  partExchangeReg?: string;
  createdAt: string;
  _id: string;
  searchType: string;
  status: string;
  timeline: {
    status: string;
    date: Date;
    note: string;
  }[];
}

export type TAddListingForm = {
  make: string;
  model: string;
  year: string | number;
  mileage: string;
  fuel: string;
  transmission: string;
  color: string;
  engineSize: string;
  registration: string;
  regDate: string;
  owners: string;
  motExpiry: string;
  vatStatus: string;
  additionalDetails: string;
  auctionHouse: string;
  auctionDate: string;
  hammerPrice: string;
  allInPrice: string;
  images: File[];
  additionalDealerDetails: string;
  carCondition: string;
  dealerUrl: string;
};

export type TListing = {
  _id: string;
  status: string;
  userId: string;
  requestId: string | TRequest;
  make: string;
  model: string;
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  color: string;
  engineSize: string;
  registration: string;
  regDate: string; // ISO date string (e.g., "2020-06-15")
  owners: string;
  motExpiry: string; // ISO date string
  vatStatus: string;
  additionalDetails: string;
  auctionHouse: string;
  auctionDate: string; // ISO date string
  hammerPrice: string; // or number if you're parsing to numeric
  allInPrice: string; // or number
  images: string[]; // Array of image filenames or URLs
  additionalDealerDetails: string;
  carCondition: string;
  dealerUrl: string;
  count?: number;
};

export type TAddDEpositForm = {
  userId: string;
  dealerId: string | TUser;
  listingId: string;
  requestId: string;
  status: string;
  allInPrice: number;
  _id?: string;
};
