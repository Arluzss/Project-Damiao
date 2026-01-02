import { Toaster as Sonner } from "sonner";
import "./Sonner.css";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      richColors
      closeButton
    />
  );
}
