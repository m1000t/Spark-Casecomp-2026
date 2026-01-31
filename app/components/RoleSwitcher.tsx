"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/utils";

export function RoleSwitcher() {
  const pathname = usePathname();
  const roles = [
    { label: "Patient", href: "/patient" },
    { label: "Nurse", href: "/nurse" },
    { label: "Doctor", href: "/doctor" },
    { label: "Driver", href: "/driver" }
  ];

  return (
    <nav className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <Link
          key={role.label}
          href={role.href}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            pathname === role.href
              ? "border-lake bg-lake text-white shadow-lg shadow-blue-500/20"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
          )}
        >
          {role.label}
        </Link>
      ))}
    </nav>
  );
}
