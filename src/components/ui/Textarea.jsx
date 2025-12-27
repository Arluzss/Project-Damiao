import * as React from "react";
import { cn } from "./utils";
import "./Textarea.css";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn("textarea", className)}
      {...props}
    />
  );
}

export { Textarea };
