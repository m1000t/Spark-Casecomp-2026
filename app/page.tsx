import Link from "next/link";
import { PageHeader } from "./components/PageHeader";
import { Card } from "@/components/ui/card";

const roles = [
  {
    title: "Patient (Voice-first)",
    description: "Large buttons, spoken guidance, and instant answers.",
    href: "/patient",
    cta: "Start as Patient"
  },
  {
    title: "Nurse Control Center",
    description: "Priority alerts + one-click fixes with a shared tracker.",
    href: "/nurse",
    cta: "Open Nurse Dashboard"
  },
  {
    title: "Doctor View",
    description: "Confirm visits and send quick notes back to nursing.",
    href: "/doctor",
    cta: "Doctor View"
  },
  {
    title: "Driver View",
    description: "Mobile-ready ride workflow with large status buttons.",
    href: "/driver",
    cta: "Driver View"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <PageHeader />

      <section className="grid gap-6 md:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.title} className="flex flex-col justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{role.title}</h2>
              <p className="mt-2 text-base text-slate-600">{role.description}</p>
            </div>
            <Link
              href={role.href}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-lake px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {role.cta}
            </Link>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <h3 className="text-xl font-semibold text-slate-900">30-second demo flow</h3>
          <ol className="mt-4 grid gap-3 text-base text-slate-700">
            <li>1. Patient asks: “What’s my next appointment?” (voice + transcript)</li>
            <li>2. Patient sees a missing ride alert.</li>
            <li>3. Nurse assigns driver in one click.</li>
            <li>4. Driver accepts, picks up, completes ride.</li>
            <li>5. Nurse sees status update instantly and closes the loop.</li>
          </ol>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold text-slate-900">Why it works</h3>
          <ul className="mt-4 space-y-3 text-base text-slate-700">
            <li>✅ One shared tracker means no conflicting updates.</li>
            <li>✅ High-contrast, large controls for elders.</li>
            <li>✅ Voice-first commands with visible transcript.</li>
          </ul>
        </Card>
      </div>

      <Card>
        <h3 className="text-xl font-semibold text-slate-900">Demo accounts (role-based)</h3>
        <p className="mt-2 text-sm text-slate-600">No passwords—tap a role above.</p>
        <div className="mt-4 grid gap-3 text-base text-slate-700 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4">Nurse: Maya Brooks</div>
          <div className="rounded-2xl border border-slate-200 p-4">Doctor: Dr. Patel</div>
          <div className="rounded-2xl border border-slate-200 p-4">Driver: Avery Diaz</div>
          <div className="rounded-2xl border border-slate-200 p-4">Patient: Elsie Gray</div>
        </div>
      </Card>
    </div>
  );
}
