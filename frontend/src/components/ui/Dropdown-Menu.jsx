"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {CheckIcon,ChevronRightIcon,CircleIcon,} from "lucide-react";

import "./Dropdown-Menu.css";

export function DropdownMenu(props) {
  return (
    <DropdownMenuPrimitive.Root
      data-slot="dropdown-menu"
      {...props}
    />
  );
}

export function DropdownMenuPortal(props) {
  return (
    <DropdownMenuPrimitive.Portal
      data-slot="dropdown-menu-portal"
      {...props}
    />
  );
}

export function DropdownMenuTrigger(props) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

export function DropdownMenuContent({
  className = "",
  sideOffset = 4,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={`dropdown-content ${className}`}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuGroup(props) {
  return (
    <DropdownMenuPrimitive.Group
      data-slot="dropdown-menu-group"
      {...props}
    />
  );
}

export function DropdownMenuItem({
  className = "",
  inset,
  variant = "default",
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={`dropdown-item ${className}`}
      {...props}
    />
  );
}

export function DropdownMenuCheckboxItem({
  className = "",
  children,
  checked,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={`dropdown-checkbox-item ${className}`}
      checked={checked}
      {...props}
    >
      <span className="dropdown-indicator">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="icon" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuRadioGroup(props) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

export function DropdownMenuRadioItem({
  className = "",
  children,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={`dropdown-radio-item ${className}`}
      {...props}
    >
      <span className="dropdown-indicator">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="icon-small" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

export function DropdownMenuLabel({
  className = "",
  inset,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={`dropdown-label ${className}`}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className = "",
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={`dropdown-separator ${className}`}
      {...props}
    />
  );
}

export function DropdownMenuShortcut({
  className = "",
  ...props
}) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={`dropdown-shortcut ${className}`}
      {...props}
    />
  );
}

export function DropdownMenuSub(props) {
  return (
    <DropdownMenuPrimitive.Sub
      data-slot="dropdown-menu-sub"
      {...props}
    />
  );
}

export function DropdownMenuSubTrigger({
  className = "",
  inset,
  children,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={`dropdown-sub-trigger ${className}`}
      {...props}
    >
      {children}
      <ChevronRightIcon className="icon-right" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export function DropdownMenuSubContent({
  className = "",
  ...props
}) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={`dropdown-sub-content ${className}`}
      {...props}
    />
  );
}
