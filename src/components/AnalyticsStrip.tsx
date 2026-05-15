const lastSevenDaysHeights = [50, 75, 40, 90, 60, 100, 85] as const

const columnClass =
  "flex flex-1 flex-col justify-center px-5 py-1"

const labelClass = "mb-1 text-xs font-medium text-black/45"
const valueClass = "text-xs font-mono font-semibold text-black"

function RateBar({
  width,
  colorClass,
}: {
  width: string
  colorClass: string
}) {
  return (
    <div className="relative mt-2 h-1 w-20 rounded-full bg-black/10">
      <div
        className={`absolute inset-y-0 left-0 rounded-full ${colorClass}`}
        style={{ width }}
      />
    </div>
  )
}

export function AnalyticsStrip() {
  return (
    <section className="flex h-16 w-full flex-row items-stretch bg-white">
      <div className="flex flex-1 flex-col justify-center px-5 py-1">
        <p className={labelClass}>Sessions</p>
        <p className={valueClass}>12,847</p>
      </div>

      <div className={columnClass}>
        <p className={labelClass}>Completion rate</p>
        <p className={valueClass}>71.9%</p>
        <RateBar width="71.9%" colorClass="bg-emerald-500" />
      </div>

      <div className={columnClass}>
        <p className={labelClass}>Drop-offs</p>
        <p className={valueClass}>1,769</p>
        <RateBar width="13.8%" colorClass="bg-red-500" />
      </div>

      <div className={columnClass}>
        <p className={labelClass}>Reassignment rate</p>
        <p className={valueClass}>14.4%</p>
        <RateBar width="14.4%" colorClass="bg-amber-500" />
      </div>

      <div className="flex flex-[1.5] flex-col justify-center px-5 py-1">
        <p className="mb-2 text-xs font-medium text-black/45">Last 7 days</p>
        <div className="flex h-7 w-32 flex-row items-end gap-1">
          {lastSevenDaysHeights.map((pct, i) => (
            <div
              key={i}
              className="w-3 rounded-sm bg-black/35"
              style={{ height: `${pct}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
