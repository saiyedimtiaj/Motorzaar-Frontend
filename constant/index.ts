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
