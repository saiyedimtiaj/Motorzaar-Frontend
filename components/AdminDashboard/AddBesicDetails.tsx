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
import { fuelTypes, transmissionTypes } from "@/lib/vehicle-data";

const AddBesicDetails = ({
  formData,
  setFormData,
}: {
  formData: TAddListingForm;
  setFormData: Dispatch<SetStateAction<TAddListingForm>>;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            required
            className="rounded-[5px]"
          />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
            className="rounded-[5px]"
          />
        </div>
        <div>
          <Label htmlFor="mileage">Mileage</Label>
          <Input
            id="mileage"
            type="number"
            value={formData.mileage}
            onChange={(e) =>
              setFormData({ ...formData, mileage: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="fuel">Fuel Type</Label>
          <Select
            required
            value={formData.fuel}
            onValueChange={(value) => setFormData({ ...formData, fuel: value })}
          >
            <SelectTrigger className="rounded-[5px]">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              {fuelTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="transmission">Transmission</Label>
          <Select
            value={formData.transmission}
            onValueChange={(value) =>
              setFormData({ ...formData, transmission: value })
            }
          >
            <SelectTrigger className="rounded-[5px]">
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              {transmissionTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
        <div>
          <Label htmlFor="engineSize">Engine Size</Label>
          <Input
            id="engineSize"
            value={formData.engineSize}
            onChange={(e) =>
              setFormData({ ...formData, engineSize: e.target.value })
            }
            required
            className="rounded-[5px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AddBesicDetails;
