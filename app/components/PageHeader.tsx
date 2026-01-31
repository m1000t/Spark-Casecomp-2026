import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function PageHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-slate-900 text-white">Clearwater Ridge Care Coordinator</Badge>
          <Badge className="bg-lake text-white">Live Demo</Badge>
        </div>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
          Shared Status Tracker
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          A calm, high-contrast coordination hub so every patient, nurse, doctor, and driver sees
          the same truth in real time.
        </p>
      </div>
      <nav className="flex flex-wrap gap-2">
        {[
          { label: "Patient", href: "/patient" },
          { label: "Nurse", href: "/nurse" },
          { label: "Doctor", href: "/doctor" },
          { label: "Driver", href: "/driver" }
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
