const metrics = [
  {
    label: "Sessions",
    value: "12,847",
    footer: "+10% vs last period",
    footerClass: "text-emerald-600",
  },
  {
    label: "Completion Rate",
    value: "71.9%",
    footer: "vs industry avg",
    footerClass: "text-slate-500",
  },
  {
    label: "Drop-offs",
    value: "1,769",
    footer: "−10% vs last period",
    footerClass: "text-red-600",
  },
  {
    label: "Reassignment Rate",
    value: "14.4%",
    footer: "handed to agents",
    footerClass: "text-slate-500",
  },
] as const

export function AnalyticsStrip() {
  return (
    <section className="flex w-full flex-row gap-3 border-b border-slate-200 bg-white px-6 py-4">
      {metrics.map((tile) => (
        <div
          key={tile.label}
          className="flex flex-1 flex-col rounded-lg bg-slate-50 p-4"
        >
          <p className="mb-2 text-xs font-medium text-slate-500">{tile.label}</p>
          <p className="mb-1 text-2xl font-semibold text-slate-900">{tile.value}</p>
          <p className={`text-xs ${tile.footerClass}`}>{tile.footer}</p>
        </div>
      ))}
    </section>
  )
}
