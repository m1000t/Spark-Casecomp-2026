import { Badge } from "@/components/ui/badge";

interface StatusTrackerProps {
  title: string;
  steps: string[];
  activeStep: number;
}

export function StatusTracker({ title, steps, activeStep }: StatusTrackerProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <Badge className="bg-slate-100 text-slate-700">Shared Status Tracker</Badge>
      </div>
      <ol className="flex flex-wrap gap-3">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isComplete = index < activeStep;
          return (
            <li
              key={step}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                isActive
                  ? "bg-lake text-white"
                  : isComplete
                    ? "bg-pine text-white"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                {index + 1}
              </span>
              {step}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
