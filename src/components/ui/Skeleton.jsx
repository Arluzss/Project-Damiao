import { cn } from "./utils";
import "./Skeleton.css";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="Skeleton"
      className={cn("Skeleton", className)}
      {...props}
    />
  );
}

export { Skeleton };
