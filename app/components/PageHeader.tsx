import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function PageHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <Badge className="mb-3 bg-slate-900 text-white">Clearwater Ridge Care Coordinator</Badge>
        <h1 className="text-3xl font-semibold text-slate-900">
          Shared Status Tracker Demo
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600">
          One live timeline keeps patients, nurses, doctors, and drivers in sync—no missed calls,
          no surprises.
        </p>
      </div>
      <nav className="flex flex-wrap gap-2">
        <Link href="/patient" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
          Patient
        </Link>
        <Link href="/nurse" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
          Nurse
        </Link>
        <Link href="/doctor" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
          Doctor
        </Link>
        <Link href="/driver" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
          Driver
        </Link>
      </nav>
    </header>
  );
}
