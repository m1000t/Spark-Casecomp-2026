import * as React from "react";
import { cn } from "./utils";

export const Badge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700",
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";
