export interface FormData {
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
  searchType?: string;
}
