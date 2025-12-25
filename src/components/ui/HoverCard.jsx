"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "./utils";
import "./HoverCard.css";

function HoverCard(props) {
  return (
    <HoverCardPrimitive.Root
      data-slot="hover-card"
      {...props}
    />
  );
}

function HoverCardTrigger(props) {
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      {...props}
    />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn("hover-card-content", className)}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
};
