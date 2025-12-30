"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import "./Aspect-Ratio.css";

export function AspectRatio(props) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      {...props}
    />
  );
}
