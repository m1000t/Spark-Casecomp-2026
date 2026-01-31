import { cn } from "./utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-6 w-full animate-pulse rounded-2xl bg-slate-200",
        className
      )}
    />
  );
}
