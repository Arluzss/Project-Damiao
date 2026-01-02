"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import "./Collapsible.css";

export function Collapsible(props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className="collapsible-root"
      {...props}
    />
  );
}

export function CollapsibleTrigger(props) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className="collapsible-trigger"
      {...props}
    />
  );
}

export function CollapsibleContent(props) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className="collapsible-content"
      {...props}
    />
  );
}
