import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import "./Badge.css";

const Badge = ({
  className,
  variant = "default",
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="Badge"
      className={cn("Badge", `Badge-${variant}`, className)}
      {...props}
    />
  );
};

export { Badge };
