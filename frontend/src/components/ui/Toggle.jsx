"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "./utils";
import "./Toggle.css";

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={cn("toggle", className)}
      {...props}
    />
  );
}

export { Toggle };
