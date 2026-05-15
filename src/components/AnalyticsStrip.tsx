const columnClass =
  "flex flex-1 flex-row items-center gap-2 border-l border-slate-200 px-4"

function RateBar({ width, colorClass }: { width: string; colorClass: string }) {
  return (
    <div className="relative h-1 w-9 shrink-0 rounded-full bg-slate-200">
      <div
        className={`absolute inset-y-0 left-0 rounded-full ${colorClass}`}
        style={{ width }}
      />
    </div>
  )
}

export function AnalyticsStrip() {
  return (
    <div className="flex h-9 w-full flex-row items-stretch border-b border-slate-200 bg-white">
      <div className="flex flex-1 flex-row items-center gap-2 pl-6 pr-4">
        <span className="text-xs font-medium text-slate-500">Sessions</span>
        <span className="text-xs font-mono font-semibold text-slate-900">
          12,847
        </span>
      </div>

      <div className={columnClass}>
        <span className="text-xs font-medium text-slate-500">Completion</span>
        <span className="text-xs font-mono font-semibold text-slate-900">
          71.9%
        </span>
        <RateBar width="71.9%" colorClass="bg-emerald-500" />
      </div>

      <div className={columnClass}>
        <span className="text-xs font-medium text-slate-500">Drop-offs</span>
        <span className="text-xs font-mono font-semibold text-slate-900">
          1,769
        </span>
        <RateBar width="13.8%" colorClass="bg-red-500" />
      </div>

      <div className={columnClass}>
        <span className="text-xs font-medium text-slate-500">Reassign</span>
        <span className="text-xs font-mono font-semibold text-slate-900">
          14.4%
        </span>
        <RateBar width="14.4%" colorClass="bg-amber-500" />
      </div>

      <div className={columnClass}>
        <span className="text-xs font-medium text-slate-500">Last 7 days</span>
        <div className="flex shrink-0 flex-row items-center gap-0.5">
          <div className="h-3 w-3 bg-emerald-300" />
          <div className="h-3 w-3 bg-emerald-400" />
          <div className="h-3 w-3 bg-emerald-200" />
          <div className="w-3 h-3 bg-emerald-500" />
          <div className="h-3 w-3 bg-emerald-300" />
          <div className="h-3 w-3 bg-emerald-600" />
          <div className="h-3 w-3 bg-emerald-400" />
        </div>
      </div>
    </div>
  )
}
