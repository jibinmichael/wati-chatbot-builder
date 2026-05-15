import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronLeft, Clock, Play, ScrollText } from "lucide-react"

const VERSION_OPTIONS = [
  {
    id: "v1",
    label: "v1",
    editedAt: "Edited May 2, 2026, 4:32 PM",
  },
  {
    id: "v2",
    label: "v2",
    editedAt: "Edited May 6, 2026, 11:05 AM",
  },
  {
    id: "v3",
    label: "v3",
    editedAt: "Edited May 8, 2026, 3:41 PM",
  },
  {
    id: "v4",
    label: "v4",
    editedAt: "Edited May 12, 2026, 9:22 AM",
  },
  {
    id: "v5",
    label: "v5",
    editedAt: "Edited May 14, 2026, 2:18 PM",
  },
] as const

function versionTriggerLabel(
  id: (typeof VERSION_OPTIONS)[number]["id"],
): string {
  return id === "v5" ? "Latest version" : id
}

export function BotHeader({
  showJourney,
  onJourneyChange,
}: {
  showJourney: boolean
  onJourneyChange: (v: boolean) => void
}) {
  const [name, setName] = useState("Lead qualification bot 2026")
  const committedRef = useRef(name)
  const [showSaved, setShowSaved] = useState(false)
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [versionOpen, setVersionOpen] = useState(false)
  const [versionId, setVersionId] =
    useState<(typeof VERSION_OPTIONS)[number]["id"]>("v5")
  const versionMenuRef = useRef<HTMLDivElement>(null)

  function flashSaved() {
    setShowSaved(true)
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    savedTimerRef.current = setTimeout(() => setShowSaved(false), 2500)
  }

  useEffect(
    () => () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    },
    [],
  )

  useEffect(() => {
    if (!versionOpen) return
    function onDocMouseDown(e: MouseEvent) {
      if (
        versionMenuRef.current &&
        !versionMenuRef.current.contains(e.target as Node)
      ) {
        setVersionOpen(false)
      }
    }
    document.addEventListener("mousedown", onDocMouseDown)
    return () => document.removeEventListener("mousedown", onDocMouseDown)
  }, [versionOpen])

  const versionLabel = versionTriggerLabel(versionId)

  function commitIfChanged() {
    if (name !== committedRef.current) {
      committedRef.current = name
      flashSaved()
    }
  }

  function handleSave() {
    committedRef.current = name
    flashSaved()
  }

  return (
    <header className="flex h-10 w-full items-center gap-3 bg-white px-6">
      <button
        type="button"
        className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-2 text-xs text-slate-600 hover:bg-slate-50"
      >
        <ChevronLeft size={12} />
        Exit
      </button>
      <div className="flex max-w-[400px] shrink-0 items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={commitIfChanged}
          className="field-sizing-content max-w-[400px] truncate border-none bg-transparent px-2 py-0.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 focus:bg-transparent focus:outline-none focus:ring-0 focus:hover:bg-transparent"
          aria-label="Bot name"
        />
        {showSaved ? (
          <span className="shrink-0 text-xs text-slate-400">Saved</span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1" />
      <div className="flex shrink-0 items-center gap-2">
        <label className="inline-flex h-6 cursor-pointer items-center gap-1.5">
          <span className="relative inline-flex h-3 w-5 shrink-0">
            <input
              type="checkbox"
              role="switch"
              checked={showJourney}
              onChange={(e) => onJourneyChange(e.target.checked)}
              className="peer sr-only"
            />
            <span className="absolute inset-0 rounded-full bg-slate-200 transition-colors peer-checked:bg-[#1FB97D]" />
            <span className="absolute top-0.5 left-0.5 h-2 w-2 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-2" />
          </span>
          <span className="text-xs font-medium text-slate-600">Show journey</span>
        </label>
        <button
          type="button"
          className="inline-flex h-6 items-center gap-1 rounded-full border border-slate-200 bg-white px-2 text-xs text-slate-600 hover:bg-slate-50"
        >
          <Play size={12} />
          <ChevronDown size={12} />
        </button>
        <div className="relative" ref={versionMenuRef}>
          <button
            type="button"
            onClick={() => setVersionOpen((o) => !o)}
            aria-expanded={versionOpen}
            aria-haspopup="listbox"
            aria-label={`Version history, current ${versionLabel}`}
            className="inline-flex h-6 w-fit shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-2 text-slate-600 hover:bg-slate-50"
          >
            <Clock size={12} strokeWidth={2.25} />
            <ChevronDown
              size={12}
              className={`shrink-0 transition-transform ${versionOpen ? "rotate-180" : ""}`}
            />
          </button>
          {versionOpen ? (
            <ul
              role="listbox"
              className="absolute right-0 z-50 mt-1 w-max rounded-lg border border-slate-200 bg-white py-0.5 shadow-md"
            >
              {VERSION_OPTIONS.map((opt) => (
                <li key={opt.id} role="option" aria-selected={opt.id === versionId}>
                  <button
                    type="button"
                    className={`flex w-full flex-col gap-0.5 px-2.5 py-1.5 text-left hover:bg-slate-50 ${opt.id === versionId ? "bg-slate-50" : ""}`}
                    onClick={() => {
                      setVersionId(opt.id)
                      setVersionOpen(false)
                    }}
                  >
                    <span
                      className={`text-xs tabular-nums text-slate-900 ${opt.id === versionId ? "font-semibold" : "font-medium"}`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-[10px] leading-tight text-slate-500">
                      {opt.editedAt}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <button
          type="button"
          className="inline-flex h-6 shrink-0 items-center gap-1 rounded-lg border border-transparent bg-transparent px-3 text-xs font-medium text-slate-600 hover:bg-slate-100"
        >
          <ScrollText size={12} strokeWidth={2.25} />
          Logs
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="h-6 shrink-0 rounded-lg bg-[#1FB97D] px-3 text-xs font-medium text-white transition-colors hover:bg-[#1AA56C]"
        >
          Save
        </button>
      </div>
    </header>
  )
}
