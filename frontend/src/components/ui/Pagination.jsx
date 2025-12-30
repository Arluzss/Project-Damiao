import React from "react";
import {ChevronLeftIcon,ChevronRightIcon,MoreHorizontalIcon,} from "lucide-react";

import { cn } from "./utils";
import { Button, buttonVariants } from "./Button";
import "./Pagination.css";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("pagination", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("pagination-content", className)}
      {...props}
    />
  );
}

function PaginationItem(props) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pagination-prev", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="pagination-text">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pagination-next", className)}
      {...props}
    >
      <span className="pagination-text">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("pagination-ellipsis", className)}
      {...props}
    >
      <MoreHorizontalIcon className="pagination-ellipsis-icon" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
