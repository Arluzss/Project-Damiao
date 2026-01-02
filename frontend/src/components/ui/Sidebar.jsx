"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "./use-mobile";
import { cn } from "./utils";
import { Button } from "./Button";
import { Input } from "./Input";
import { Separator } from "./Separator";
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,} from "./Sheet";
import { Skeleton } from "./Skeleton";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "./Tooltip";

import "./Sidebar.css";

/* -------------------------------------------------------------------------- */
/* Context */
/* -------------------------------------------------------------------------- */

const SidebarContext = React.createContext(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* Provider */
/* -------------------------------------------------------------------------- */

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);

  const open = openProp ?? _open;

  const setOpen = (value) => {
    const next = typeof value === "function" ? value(open) : value;
    onOpenChange ? onOpenChange(next) : _setOpen(next);
  };

  const toggleSidebar = () => {
    isMobile ? setOpenMobile((v) => !v) : setOpen((v) => !v);
  };

  const state = open ? "expanded" : "collapsed";

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }}
    >
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          className={cn("sidebar-wrapper", className)}
          style={style}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar */
/* -------------------------------------------------------------------------- */

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side={side} className="sidebar-mobile">
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Mobile sidebar</SheetDescription>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      data-slot="sidebar"
      data-state={state}
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      className={cn("sidebar", className)}
    >
      {children}
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Trigger */
/* -------------------------------------------------------------------------- */

export function SidebarTrigger({ className, ...props }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("sidebar-trigger", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout helpers */
/* -------------------------------------------------------------------------- */

export const SidebarContent = ({ className, ...props }) => (
  <div className={cn("sidebar-content", className)} {...props} />
);

export const SidebarHeader = ({ className, ...props }) => (
  <div className={cn("sidebar-header", className)} {...props} />
);

export const SidebarFooter = ({ className, ...props }) => (
  <div className={cn("sidebar-footer", className)} {...props} />
);

export const SidebarSeparator = (props) => (
  <Separator className="sidebar-separator" {...props} />
);

export const SidebarInput = ({ className, ...props }) => (
  <Input className={cn("sidebar-input", className)} {...props} />
);

/* -------------------------------------------------------------------------- */
/* Menu */
/* -------------------------------------------------------------------------- */

export const SidebarMenu = ({ className, ...props }) => (
  <ul className={cn("sidebar-menu", className)} {...props} />
);

export const SidebarMenuItem = ({ className, ...props }) => (
  <li className={cn("sidebar-menu-item", className)} {...props} />
);

const menuButtonVariants = cva("sidebar-menu-button", {
  variants: {
    size: {
      sm: "sm",
      default: "md",
      lg: "lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export function SidebarMenuButton({
  asChild = false,
  size,
  isActive,
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { state, isMobile } = useSidebar();

  const button = (
    <Comp
      data-active={isActive}
      className={cn(menuButtonVariants({ size }), className)}
      {...props}
    />
  );

  if (!tooltip) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent hidden={state !== "collapsed" || isMobile}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

/* -------------------------------------------------------------------------- */
/* Skeleton */
/* -------------------------------------------------------------------------- */

export function SidebarMenuSkeleton({ showIcon }) {
  return (
    <div className="sidebar-menu-skeleton">
      {showIcon && <Skeleton className="icon" />}
      <Skeleton className="text" />
    </div>
  );
}
