import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-lake text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700",
  secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-100",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  destructive: "bg-alert text-white shadow-lg shadow-red-500/20 hover:bg-red-700"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
