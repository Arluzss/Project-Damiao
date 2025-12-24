"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "Sonner";
import "./Sonner.css";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };
