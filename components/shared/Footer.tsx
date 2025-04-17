import Link from "next/link";
import { Car, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import PopularBandsFooter from "./PopularBandsFooter";

const Footer = () => {
  return (
    <div className="mt-16">
      <footer className="bg-white border-t border-[rgb(var(--color-border))] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <Car className="h-6 w-6 sm:h-8 sm:w-8 text-[rgb(var(--color-primary))]" />
                <span className="text-lg sm:text-xl font-bold">Motorzaar</span>
              </div>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-[rgb(var(--color-text-light))]">
                Making car buying simple and stress-free.
              </p>
              <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
                <Facebook className="h-5 w-5 text-[rgb(var(--color-text-light))] hover:text-[rgb(var(--color-primary))]" />
                <Twitter className="h-5 w-5 text-[rgb(var(--color-text-light))] hover:text-[rgb(var(--color-primary))]" />
                <Instagram className="h-5 w-5 text-[rgb(var(--color-text-light))] hover:text-[rgb(var(--color-primary))]" />
                <Youtube className="h-5 w-5 text-[rgb(var(--color-text-light))] hover:text-[rgb(var(--color-primary))]" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 sm:mb-4 text-sm sm:text-base">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-[rgb(var(--color-text-light))] hover:text-[rgb(var(--color-text))]"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reviews"
                    className="text-[rgb(var(--color-text-light))] hover:text-[rgb(var(--color-text))]"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dealers"
                    className="text-[rgb(var(--color-text-light))] hover:text-[rgb(var(--color-text))]"
                  >
                    Dealers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-[rgb(var(--color-text-light))] hover:text-[rgb(var(--color-text))]"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <PopularBandsFooter />

            <div>
              <h3 className="font-semibold mb-2 sm:mb-4 text-sm sm:text-base">
                Contact
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="text-[rgb(var(--color-text-light))]">
                  support@cardeals.com
                </li>
                <li className="text-[rgb(var(--color-text-light))]">
                  1-800-CAR-DEAL
                </li>
                <li className="text-[rgb(var(--color-text-light))]">
                  Mon - Fri: 9:00 - 18:00
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[rgb(var(--color-border))] mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm sm:text-base text-[rgb(var(--color-text-light))]">
            <p>
              &copy; {new Date().getFullYear()} CarDeals. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
