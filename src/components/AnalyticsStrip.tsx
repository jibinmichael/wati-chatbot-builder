import { Calendar, ChevronDown } from "lucide-react"

/** Proportional columns: date (auto) + 6 metrics so the row stays one line */
const stripGrid =
  "grid h-9 w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.12fr)_minmax(0,1.1fr)] items-center gap-x-2 bg-white pl-6 pr-4"

const cellClass =
  "flex min-w-0 flex-row flex-nowrap items-center gap-1 whitespace-nowrap"

function RateBar({ width, colorClass }: { width: string; colorClass: string }) {
  return (
    <div className="relative h-1 w-8 shrink-0 rounded-full bg-slate-200">
      <div
        className={`absolute inset-y-0 left-0 rounded-full ${colorClass}`}
        style={{ width }}
      />
    </div>
  )
}

function StatPair({ value, percent }: { value: string; percent: string }) {
  return (
    <span className="flex min-w-0 shrink items-baseline gap-0.5 whitespace-nowrap">
      <span className="text-[11px] font-mono font-semibold tabular-nums text-slate-900">
        {value}
      </span>
      <span className="text-[10px] text-slate-300">·</span>
      <span className="text-[9px] font-mono font-medium text-slate-500">
        {percent}
      </span>
    </span>
  )
}

export function AnalyticsStrip() {
  return (
    <div className={stripGrid}>
      <div className="flex shrink-0 items-center">
        <button
          type="button"
          className="inline-flex h-6 w-fit items-center gap-1 rounded-full border border-slate-200 bg-white px-2 text-slate-600 hover:bg-slate-50"
          aria-label="Date range"
        >
          <Calendar size={12} strokeWidth={2.25} />
          <ChevronDown size={12} strokeWidth={2.25} />
        </button>
      </div>

      <div className={cellClass}>
        <span className="shrink-0 text-[11px] font-medium text-slate-500">
          Sessions
        </span>
        <span className="text-[11px] font-mono font-semibold text-slate-900">
          12,847
        </span>
      </div>

      <div className={cellClass}>
        <span className="shrink-0 text-[11px] font-medium text-slate-500">
          Completion
        </span>
        <StatPair value="9,238" percent="71.9%" />
        <RateBar width="71.9%" colorClass="bg-emerald-500" />
      </div>

      <div className={cellClass}>
        <span className="shrink-0 text-[11px] font-medium text-slate-500">
          Drop-offs
        </span>
        <StatPair value="1,769" percent="13.8%" />
        <RateBar width="13.8%" colorClass="bg-red-500" />
      </div>

      <div className={cellClass}>
        <span className="shrink-0 text-[11px] font-medium text-slate-500">
          Reassign
        </span>
        <StatPair value="1,850" percent="14.4%" />
        <RateBar width="14.4%" colorClass="bg-amber-500" />
      </div>

      <div
        className={cellClass}
        title="Median time from first message to end-state. Excludes sessions reassigned to humans."
      >
        <span className="min-w-0 shrink text-[11px] font-medium text-slate-500">
          Avg Resolution time
        </span>
        <StatPair value="2.4 min" percent="−8%" />
      </div>

      <div className={cellClass}>
        <span className="shrink-0 text-[11px] font-medium text-slate-500">
          Last 7 days
        </span>
        <div className="flex shrink-0 flex-row items-center gap-0.5">
          <div className="h-3 w-3 bg-emerald-300" />
          <div className="h-3 w-3 bg-emerald-400" />
          <div className="h-3 w-3 bg-emerald-200" />
          <div className="h-3 w-3 bg-emerald-500" />
          <div className="h-3 w-3 bg-emerald-300" />
          <div className="h-3 w-3 bg-emerald-600" />
          <div className="h-3 w-3 bg-emerald-400" />
        </div>
      </div>
    </div>
  )
}
