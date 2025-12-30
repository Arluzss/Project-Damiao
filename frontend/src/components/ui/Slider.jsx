"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "./utils";
import "./Slider.css";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const values = React.useMemo(() => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(defaultValue)) return defaultValue;
    return [min, max];
  }, [value, defaultValue, min, max]);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn("slider-root", className)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="slider-track"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="slider-range"
        />
      </SliderPrimitive.Track>

      {Array.from({ length: values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="slider-thumb"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
