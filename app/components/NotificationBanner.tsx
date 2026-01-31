import { cn } from "@/components/ui/utils";

interface NotificationBannerProps {
  message: string;
  tone?: "info" | "warning" | "urgent";
}

export function NotificationBanner({ message, tone = "info" }: NotificationBannerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-3xl border px-5 py-4 text-base font-semibold",
        tone === "urgent" && "border-alert/40 bg-red-50 text-alert",
        tone === "warning" && "border-sun/40 bg-amber-50 text-amber-700",
        tone === "info" && "border-slate-200 bg-white text-slate-700"
      )}
    >
      <span>📣 {message}</span>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase">In-app</span>
    </div>
  );
}
