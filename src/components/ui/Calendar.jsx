// src/components/ui/Calendar.jsx
"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import "./Calendar.css";

export function Calendar({
  className = "",
  classNames = {},
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`calendar ${className}`}
      classNames={{
        months: "calendar-months",
        month: "calendar-month",
        caption: "calendar-caption",
        caption_label: "calendar-caption-label",
        nav: "calendar-nav",
        nav_button: "calendar-nav-button",
        nav_button_previous: "calendar-nav-prev",
        nav_button_next: "calendar-nav-next",
        table: "calendar-table",
        head_row: "calendar-head-row",
        head_cell: "calendar-head-cell",
        row: "calendar-row",
        cell: "calendar-cell",
        day: "calendar-day",
        day_range_start: "calendar-day-range-start",
        day_range_end: "calendar-day-range-end",
        day_selected: "calendar-day-selected",
        day_today: "calendar-day-today",
        day_outside: "calendar-day-outside",
        day_disabled: "calendar-day-disabled",
        day_range_middle: "calendar-day-range-middle",
        day_hidden: "calendar-day-hidden",
        ...classNames,
      }}
      components={{
        IconLeft: (props) => (
          <ChevronLeft {...props} className="calendar-icon" />
        ),
        IconRight: (props) => (
          <ChevronRight {...props} className="calendar-icon" />
        ),
      }}
      {...props}
    />
  );
}
