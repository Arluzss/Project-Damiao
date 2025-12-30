"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import {
  CheckIcon,
  ChevronRightIcon,
  CircleIcon,
} from "lucide-react";

import "./Context-Menu.css";

/* Root */

export function ContextMenu(props) {
  return (
    <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
  );
}

export function ContextMenuTrigger(props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      {...props}
    />
  );
}

export function ContextMenuGroup(props) {
  return (
    <ContextMenuPrimitive.Group
      data-slot="context-menu-group"
      {...props}
    />
  );
}

export function ContextMenuPortal(props) {
  return (
    <ContextMenuPrimitive.Portal
      data-slot="context-menu-portal"
      {...props}
    />
  );
}

export function ContextMenuSub(props) {
  return (
    <ContextMenuPrimitive.Sub
      data-slot="context-menu-sub"
      {...props}
    />
  );
}

export function ContextMenuRadioGroup(props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

/* Sub trigger */

export function ContextMenuSubTrigger({
  inset,
  children,
  className = "",
  ...props
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={`context-menu-sub-trigger ${className}`}
      {...props}
    >
      {children}
      <ChevronRightIcon className="context-menu-chevron" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

/* Sub content */

export function ContextMenuSubContent({ className = "", ...props }) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={`context-menu-content ${className}`}
      {...props}
    />
  );
}

/* Content */

export function ContextMenuContent({ className = "", ...props }) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={`context-menu-content ${className}`}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

/* Item */

export function ContextMenuItem({
  inset,
  variant = "default",
  className = "",
  ...props
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={`context-menu-item ${className}`}
      {...props}
    />
  );
}

/* Checkbox item */

export function ContextMenuCheckboxItem({
  checked,
  children,
  className = "",
  ...props
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={`context-menu-check-item ${className}`}
      checked={checked}
      {...props}
    >
      <span className="context-menu-indicator">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

/* Radio item */

export function ContextMenuRadioItem({
  children,
  className = "",
  ...props
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={`context-menu-check-item ${className}`}
      {...props}
    >
      <span className="context-menu-indicator">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="radio-dot" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

/* Label */

export function ContextMenuLabel({
  inset,
  className = "",
  ...props
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={`context-menu-label ${className}`}
      {...props}
    />
  );
}

/* Separator */

export function ContextMenuSeparator({ className = "", ...props }) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={`context-menu-separator ${className}`}
      {...props}
    />
  );
}

/* Shortcut */

export function ContextMenuShortcut({ className = "", ...props }) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={`context-menu-shortcut ${className}`}
      {...props}
    />
  );
}
