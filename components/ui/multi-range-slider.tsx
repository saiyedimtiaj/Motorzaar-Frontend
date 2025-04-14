/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface MultiRangeSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  formatValue?: (value: number) => string;
  label?: string;
  description?: string;
  showOnlyMax?: boolean;
  snapValues?: number[];
  className?: string;
}

const MultiRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  MultiRangeSliderProps
>(
  (
    {
      className,
      formatValue,
      label,
      description,
      showOnlyMax = false,
      snapValues,
      ...props
    },
    ref
  ) => {
    const defaultFormatValue = (value: number) => value.toString();
    const format = formatValue || defaultFormatValue;
    const values = (props.value as number[]) ||
      (props.defaultValue as number[]) || [0, 100];

    return (
      <div className="space-y-4">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-blue-100">
            <SliderPrimitive.Range
              className={cn(
                "absolute h-full bg-blue-500",
                showOnlyMax
                  ? "left-0 right-[var(--right)]"
                  : "left-[var(--left)] right-[var(--right)]"
              )}
            />
          </SliderPrimitive.Track>
          {values.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className={cn(
                "block h-5 w-5 rounded-full border-2 border-blue-500 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                index === 0 && showOnlyMax && "hidden"
              )}
            />
          ))}
        </SliderPrimitive.Root>
        <div className="flex justify-between text-lg font-semibold text-blue-600">
          <span className={cn(showOnlyMax && "opacity-0")}>
            {format(values[0])}
          </span>
          <span>{format(values[1])}</span>
        </div>
      </div>
    );
  }
);

MultiRangeSlider.displayName = "MultiRangeSlider";

export { MultiRangeSlider };
