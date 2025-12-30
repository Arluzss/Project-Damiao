"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import "./Radio-group.css";

function RadioGroup({ className = "", ...props }) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={`radio-group ${className}`}
      {...props}
    />
  );
}

function RadioGroupItem({ className = "", ...props }) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={`radio-group-item ${className}`}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="radio-group-indicator"
      >
        <CircleIcon className="radio-group-icon" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
