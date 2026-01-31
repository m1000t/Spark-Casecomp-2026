export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      {subtitle ? <p className="mt-2 text-base text-slate-600">{subtitle}</p> : null}
    </div>
  );
}
