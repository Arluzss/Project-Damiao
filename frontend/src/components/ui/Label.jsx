import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "./utils";
import "./Label.css";

const Label = React.forwardRef(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn("label", className)}
      {...props}
    />
  )
);

Label.displayName = "Label";

export { Label };
