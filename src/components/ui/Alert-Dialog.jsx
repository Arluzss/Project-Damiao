"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "./utils";
import { buttonVariants } from "./Button";
import "./Alert-Dialog.css";

export function AlertDialog(props) {
  return (
    <AlertDialogPrimitive.Root
      data-slot="alert-dialog"
      {...props}
    />
  );
}

export function AlertDialogTrigger(props) {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

export function AlertDialogPortal(props) {
  return (
    <AlertDialogPrimitive.Portal
      data-slot="alert-dialog-portal"
      {...props}
    />
  );
}

export function AlertDialogOverlay({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn("alert-dialog-overlay", className)}
      {...props}
    />
  );
}

export function AlertDialogContent({ className, ...props }) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn("alert-dialog-content", className)}
        {...props}
      />
    </AlertDialogPortal>
  );
}

export function AlertDialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("alert-dialog-header", className)}
      {...props}
    />
  );
}

export function AlertDialogFooter({ className, ...props }) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("alert-dialog-footer", className)}
      {...props}
    />
  );
}

export function AlertDialogTitle({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("alert-dialog-title", className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("alert-dialog-description", className)}
      {...props}
    />
  );
}

export function AlertDialogAction({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

export function AlertDialogCancel({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}
