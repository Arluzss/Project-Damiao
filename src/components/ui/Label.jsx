"use client";

import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "./utils";
import "./Label.css";

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn("label", className)}
      {...props}
    />
  );
}

export { Label };
