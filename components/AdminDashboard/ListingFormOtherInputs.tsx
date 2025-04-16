import React, { Dispatch, SetStateAction } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TAddListingForm } from "@/types";
import { Textarea } from "../ui/textarea";

const ListingFormOtherInputs = ({
  formData,
  setFormData,
}: {
  formData: TAddListingForm;
  setFormData: Dispatch<SetStateAction<TAddListingForm>>;
}) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="registration">Registration</Label>
          <Input
            id="registration"
            value={formData.registration}
            onChange={(e) =>
              setFormData({ ...formData, registration: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
        <div>
          <Label htmlFor="regDate">Registration Date</Label>
          <Input
            id="regDate"
            type="date"
            value={formData.regDate}
            onChange={(e) =>
              setFormData({ ...formData, regDate: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
        <div>
          <Label htmlFor="owners">Previous Owners</Label>
          <Input
            id="owners"
            type="number"
            value={formData.owners}
            onChange={(e) =>
              setFormData({ ...formData, owners: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="motExpiry">MOT Expiry</Label>
          <Input
            id="motExpiry"
            type="date"
            value={formData.motExpiry}
            onChange={(e) =>
              setFormData({ ...formData, motExpiry: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
        <div>
          <Label htmlFor="vatStatus">VAT Status</Label>
          <Select
            value={formData.vatStatus}
            onValueChange={(value) =>
              setFormData({ ...formData, vatStatus: value })
            }
          >
            <SelectTrigger className="rounded-[5px]">
              <SelectValue placeholder="Select VAT status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TBC">TBC</SelectItem>
              <SelectItem value="VAT Qualifying">VAT Qualifying</SelectItem>
              <SelectItem value="VAT Margin">VAT Margin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Auction Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="auctionHouse">Auction House</Label>
          <Select
            value={formData.auctionHouse}
            onValueChange={(value) =>
              setFormData({ ...formData, auctionHouse: value })
            }
          >
            <SelectTrigger className="rounded-[5px]">
              <SelectValue placeholder="Select auction house" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manheim">Manheim</SelectItem>
              <SelectItem value="BCA">BCA</SelectItem>
              <SelectItem value="Aston Barclay">Aston Barclay</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="auctionDate">Auction Date</Label>
          <Input
            id="auctionDate"
            type="datetime-local"
            value={formData.auctionDate}
            onChange={(e) =>
              setFormData({ ...formData, auctionDate: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="allInPrice">All-in Price (£)</Label>
          <Input
            id="allInPrice"
            type="number"
            value={formData.allInPrice}
            onChange={(e) =>
              setFormData({ ...formData, allInPrice: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
      </div>

      {/* Additional Textareas */}
      <div className="space-y-2">
        <div>
          <Label htmlFor="additionalDetails">Additional Details</Label>
          <Textarea
            id="additionalDetails"
            className="min-h-[100px] rounded-[5px]"
            value={formData.additionalDetails}
            onChange={(e) =>
              setFormData({
                ...formData,
                additionalDetails: e.target.value,
              })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="carCondition">Car Condition</Label>
          <Textarea
            id="carCondition"
            className="min-h-[100px] rounded-[5px]"
            required
            value={formData.carCondition}
            onChange={(e) =>
              setFormData({ ...formData, carCondition: e.target.value })
            }
            placeholder="Enter the condition of the car..."
          />
        </div>

        <div>
          <Label htmlFor="additionalDealerDetails">
            Additional Dealer Details
          </Label>
          <Textarea
            id="additionalDealerDetails"
            className="min-h-[100px] rounded-[5px]"
            required
            value={formData.additionalDealerDetails}
            onChange={(e) =>
              setFormData({
                ...formData,
                additionalDealerDetails: e.target.value,
              })
            }
            placeholder="Enter any additional dealer-specific notes or requirements..."
          />
        </div>

        <div>
          <Label htmlFor="dealerUrl">Dealer Website URL</Label>
          <Input
            id="dealerUrl"
            type="url"
            value={formData.dealerUrl}
            onChange={(e) =>
              setFormData({ ...formData, dealerUrl: e.target.value })
            }
            placeholder="https://www.example.com"
            className="rounded-[5px] mb-5"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingFormOtherInputs;
