import * as React from "react";
import { cn } from "./utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-soft backdrop-blur",
        "transition-shadow hover:shadow-xl",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";
