"use client";

import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import "./Breadcrumb.css";

export function Breadcrumb(props) {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
  );
}

export function BreadcrumbList({ className = "", ...props }) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={`breadcrumb-list ${className}`}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className = "", ...props }) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={`breadcrumb-item ${className}`}
      {...props}
    />
  );
}

export function BreadcrumbLink({ asChild, className = "", ...props }) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={`breadcrumb-link ${className}`}
      {...props}
    />
  );
}

export function BreadcrumbPage({ className = "", ...props }) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`breadcrumb-page ${className}`}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({ children, className = "", ...props }) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={`breadcrumb-separator ${className}`}
      {...props}
    >
      {children || <ChevronRight />}
    </li>
  );
}

export function BreadcrumbEllipsis({ className = "", ...props }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={`breadcrumb-ellipsis ${className}`}
      {...props}
    >
      <MoreHorizontal className="breadcrumb-ellipsis-icon" />
      <span className="sr-only">More</span>
    </span>
  );
}
