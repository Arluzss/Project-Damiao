"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import "./Drawer.css";

export function Drawer(props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

export function DrawerTrigger(props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export function DrawerPortal(props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

export function DrawerClose(props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

export function DrawerOverlay({ className = "", ...props }) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={`drawer-overlay ${className}`}
      {...props}
    />
  );
}

export function DrawerContent({ children, className = "", ...props }) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={`drawer-content ${className}`}
        {...props}
      >
        <div className="drawer-handle" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

export function DrawerHeader({ className = "", ...props }) {
  return (
    <div
      data-slot="drawer-header"
      className={`drawer-header ${className}`}
      {...props}
    />
  );
}

export function DrawerFooter({ className = "", ...props }) {
  return (
    <div
      data-slot="drawer-footer"
      className={`drawer-footer ${className}`}
      {...props}
    />
  );
}

export function DrawerTitle({ className = "", ...props }) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={`drawer-title ${className}`}
      {...props}
    />
  );
}

export function DrawerDescription({ className = "", ...props }) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={`drawer-description ${className}`}
      {...props}
    />
  );
}
