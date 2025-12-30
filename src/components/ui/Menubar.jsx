import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import "./Menubar.css";

export function Menubar({ className = "", ...props }) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={`menubar-root ${className}`}
      {...props}
    />
  );
}

export function MenubarMenu(props) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

export function MenubarGroup(props) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

export function MenubarPortal(props) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

export function MenubarRadioGroup(props) {
  return (
    <MenubarPrimitive.RadioGroup
      data-slot="menubar-radio-group"
      {...props}
    />
  );
}

export function MenubarTrigger({ className = "", ...props }) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={`menubar-trigger ${className}`}
      {...props}
    />
  );
}

export function MenubarContent({
  className = "",
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={`menubar-content ${className}`}
        {...props}
      />
    </MenubarPortal>
  );
}

export function MenubarItem({
  className = "",
  inset,
  variant = "default",
  ...props
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={`menubar-item ${className}`}
      {...props}
    />
  );
}

export function MenubarCheckboxItem({
  className = "",
  children,
  checked,
  ...props
}) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={`menubar-checkbox-item ${className}`}
      checked={checked}
      {...props}
    >
      <span className="menubar-indicator">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="icon-sm" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

export function MenubarRadioItem({ className = "", children, ...props }) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={`menubar-radio-item ${className}`}
      {...props}
    >
      <span className="menubar-indicator">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="icon-xs" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

export function MenubarLabel({ className = "", inset, ...props }) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={`menubar-label ${className}`}
      {...props}
    />
  );
}

export function MenubarSeparator({ className = "", ...props }) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={`menubar-separator ${className}`}
      {...props}
    />
  );
}

export function MenubarShortcut({ className = "", ...props }) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={`menubar-shortcut ${className}`}
      {...props}
    />
  );
}

export function MenubarSub(props) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

export function MenubarSubTrigger({
  className = "",
  inset,
  children,
  ...props
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={`menubar-sub-trigger ${className}`}
      {...props}
    >
      {children}
      <ChevronRightIcon className="icon-sm ml-auto" />
    </MenubarPrimitive.SubTrigger>
  );
}

export function MenubarSubContent({ className = "", ...props }) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={`menubar-sub-content ${className}`}
      {...props}
    />
  );
}
