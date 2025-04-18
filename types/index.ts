export type TUser = {
  _id?: string;
  fullName: string;
  email?: string;
  role?: string;
  phone?: string;
  website?: string;
  avater?: string;
  createdAt?: Date;
  addressline1?: string;
  addressline2?: string;
  town?: string;
  country?: string;
  postcode?: string;

  businessType?: string;
  companyRegNumber?: string;
  fcaRegNumber?: string;
  vatNumber?: string;
  yearEstablished?: string;

  trustPilotUrl?: string;
  googleReviewsUrl?: string;

  primaryFirstName?: string;
  primaryLastName?: string;
  primaryRole?: string;
  primaryPhone?: string;

  secondaryFirstName?: string;
  secondaryLastName?: string;
  secondaryRole?: string;
  secondaryEmail?: string;
  secondaryPhone?: string;

  weekdayStart?: string;
  weekdayEnd?: string;
  saturdayStart?: string;
  saturdayEnd?: string;
  sundayStart?: string;
  sundayEnd?: string;
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
  count?: number;
  listingId?: string;
  status: string;
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
  userId: string | TUser;
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
  sentToDealerDate?: string;
  min: number;
  max: number;
};

export type TAddDEpositForm = {
  userId: string;
  dealerId: string | TUser;
  listingId: string;
  requestId: string;
  status: string;
  allInPrice: number;
  _id?: string;
  offerId?: string;
};

export type TDealerRequest = {
  userId: string | TUser;
  dealerId: TUser;
  listingId: TListing;
  requestId: string;
  status: string;
  allInPrice: number;
  _id: string;
  testDriveDate: string;
  createdAt?: string;
  depositDate?: string;
  offerId?: string;
};

export type TTimeline = {
  status: string;
  date: Date;
  note: string;
  requestId: string;
};
