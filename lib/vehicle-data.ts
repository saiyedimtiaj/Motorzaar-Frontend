export const carMakes = [
  "Audi",
  "BMW",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Mercedes-Benz",
  "Nissan",
  "Toyota",
  "Volkswagen",
];

export const carModels: Record<string, string[]> = {
  bmw: [
    "1 Series",
    "2 Series",
    "3 Series",
    "4 Series",
    "5 Series",
    "X1",
    "X3",
    "X5",
  ],
  audi: ["A1", "A3", "A4", "A5", "Q3", "Q5", "Q7"],
  "mercedes-benz": [
    "A-Class",
    "B-Class",
    "C-Class",
    "E-Class",
    "GLA",
    "GLC",
    "GLE",
  ],
  ford: ["Fiesta", "Focus", "Kuga", "Puma", "Mustang"],
  honda: ["Civic", "CR-V", "HR-V", "Jazz"],
  hyundai: ["i10", "i20", "i30", "Kona", "Tucson"],
  kia: ["Picanto", "Rio", "Ceed", "Sportage", "Niro"],
  nissan: ["Micra", "Juke", "Qashqai", "X-Trail"],
  toyota: ["Yaris", "Corolla", "RAV4", "C-HR", "Camry"],
  volkswagen: ["Polo", "Golf", "T-Roc", "Tiguan", "Passat"],
};

export const fuelTypes = [
  { id: "petrol", label: "Petrol" },
  { id: "diesel", label: "Diesel" },
  { id: "hybrid", label: "Hybrid" },
  { id: "plug-in hybrid", label: "Plug-In Hybrid" },
  { id: "electric", label: "Electric" },
];

export const mileageRanges = [
  { id: "0-30000", label: "0 - 30,000 miles" },
  { id: "30000-50000", label: "30,000 - 50,000 miles" },
  { id: "50000-70000", label: "50,000 - 70,000 miles" },
];

export const transmissionTypes = [
  { id: "automatic", label: "Automatic" },
  { id: "manual", label: "Manual" },
];

export const carTypes = [
  { id: "suv", label: "SUV" },
  { id: "hatchback", label: "Hatchback" },
  { id: "saloon", label: "Saloon" },
  { id: "estate", label: "Estate" },
  { id: "coupe", label: "Coupe" },
];
