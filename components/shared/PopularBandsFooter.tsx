"use client";

import { useRouter } from "next/navigation";
import { toast } from "../ui/custom-toast";

const PopularBandsFooter = () => {
  const router = useRouter();
  const handleCarClick = (make: string, model: string) => {
    localStorage.setItem(
      "selectedCar",
      JSON.stringify({
        make: make.toLowerCase(),
        model: model.toLocaleLowerCase(),
      })
    );
    toast.success("Car selected! Taking you to customization...");

    // Navigate to vehicles page
    router.push("/vehicles");
  };
  return (
    <div>
      <h3 className="font-semibold mb-2 sm:mb-4 text-sm sm:text-base">
        Popular Brands
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        <li
          className="cursor-pointer"
          onClick={() => handleCarClick("Toyota", "RAV4")}
        >
          Toyota
        </li>
        <li
          className="cursor-pointer"
          onClick={() => handleCarClick("Ford", "Puma")}
        >
          Ford
        </li>
        <li
          className="cursor-pointer"
          onClick={() => handleCarClick("Honda", "Civic")}
        >
          Honda
        </li>
        <li
          className="cursor-pointer"
          onClick={() => handleCarClick("BMW", "X1")}
        >
          BMW
        </li>
      </ul>
    </div>
  );
};

export default PopularBandsFooter;
