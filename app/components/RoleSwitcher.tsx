import Link from "next/link";

export function RoleSwitcher() {
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
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
        >
          {role.label}
        </Link>
      ))}
    </nav>
  );
}
