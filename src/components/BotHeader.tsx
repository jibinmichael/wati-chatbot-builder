import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronLeft, Play } from "lucide-react"

export function BotHeader() {
  const [name, setName] = useState("Lead qualification bot 2026")
  const committedRef = useRef(name)
  const [showSaved, setShowSaved] = useState(false)
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
        className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full bg-white px-2 text-xs text-slate-600 hover:bg-slate-50"
      >
        <ChevronLeft size={12} />
        Exit
      </button>
      <div className="flex max-w-md min-w-0 shrink items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={commitIfChanged}
          className="min-w-0 flex-1 border-none bg-transparent px-2 py-0.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 focus:bg-transparent focus:outline-none focus:ring-0 focus:hover:bg-transparent"
          aria-label="Bot name"
        />
        {showSaved ? (
          <span className="shrink-0 text-xs text-slate-400">Saved</span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1" />
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="inline-flex h-6 items-center gap-1 rounded-full bg-white px-2 text-xs text-slate-600 hover:bg-slate-50"
        >
          <Play size={12} />
          <ChevronDown size={12} />
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
