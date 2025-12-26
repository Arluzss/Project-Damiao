"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import "./Checkbox.css";

export function Checkbox({ className = "", ...props }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={`checkbox-root ${className}`}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="checkbox-indicator"
      >
        <CheckIcon className="checkbox-icon" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
