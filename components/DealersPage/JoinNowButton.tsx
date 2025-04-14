"use client";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const JoinNowButton = () => {
  return (
    <Button
      size="lg"
      className="text-lg px-8 bg-green-500 hover:bg-green-600 text-white"
      onClick={() => {
        const form = document.getElementById("signup-form");
        form?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Join Now
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
};

export default JoinNowButton;
