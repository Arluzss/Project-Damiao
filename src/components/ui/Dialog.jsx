"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import "./Dialog.css";

/* Root */

export function Dialog(props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export function DialogTrigger(props) {
  return (
    <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
  );
}

export function DialogPortal(props) {
  return (
    <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
  );
}

export function DialogClose(props) {
  return (
    <DialogPrimitive.Close data-slot="dialog-close" {...props} />
  );
}

/* Overlay */

export function DialogOverlay({ className = "", ...props }) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={`dialog-overlay ${className}`}
      {...props}
    />
  );
}

/* Content */

export function DialogContent({ children, className = "", ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={`dialog-content ${className}`}
        {...props}
      >
        {children}

        <DialogPrimitive.Close className="dialog-close-button">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/* Layout */

export function DialogHeader({ className = "", ...props }) {
  return (
    <div
      data-slot="dialog-header"
      className={`dialog-header ${className}`}
      {...props}
    />
  );
}

export function DialogFooter({ className = "", ...props }) {
  return (
    <div
      data-slot="dialog-footer"
      className={`dialog-footer ${className}`}
      {...props}
    />
  );
}

/* Text */

export function DialogTitle({ className = "", ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={`dialog-title ${className}`}
      {...props}
    />
  );
}

export function DialogDescription({ className = "", ...props }) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={`dialog-description ${className}`}
      {...props}
    />
  );
}
