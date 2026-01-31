import { Badge } from "@/components/ui/badge";

interface StatusTrackerProps {
  title: string;
  steps: string[];
  activeStep: number;
}

export function StatusTracker({ title, steps, activeStep }: StatusTrackerProps) {
  return (
    <div className="rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-soft backdrop-blur">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <Badge className="bg-slate-900 text-white">Shared Status Tracker</Badge>
      </div>
      <ol className="grid gap-3 md:grid-cols-2">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isComplete = index < activeStep;
          return (
            <li
              key={step}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold ${
                isActive
                  ? "border-lake bg-blue-50 text-lake"
                  : isComplete
                    ? "border-pine bg-emerald-50 text-pine"
                    : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                  isActive
                    ? "bg-lake text-white"
                    : isComplete
                      ? "bg-pine text-white"
                      : "bg-white text-slate-500"
                }`}
              >
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold">{step}</p>
                <p className="text-xs text-slate-500">
                  {isActive ? "Current step" : isComplete ? "Completed" : "Upcoming"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
