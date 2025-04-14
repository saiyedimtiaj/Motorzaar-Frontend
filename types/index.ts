export type TUser = {
  fullName: string;
  email: string;
  role: string;
  _id: string;
  createdAt?: string;
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
}
