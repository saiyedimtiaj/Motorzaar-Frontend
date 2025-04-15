"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const JoinNowButton = () => {
  return (
    <Link href="/signup">
      <Button
        size="lg"
        className="text-lg px-8 bg-green-500 hover:bg-green-600 text-white"
      >
        Join Now
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  );
};

export default JoinNowButton;
