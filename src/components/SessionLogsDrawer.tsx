import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
  X,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { MOCK_SESSIONS, type SessionStatus } from "@/data/sessions"

const PAGE_SIZE = 25

const selectTriggerClass =
  "h-7 gap-1 border-slate-200 text-[11px] [&_svg]:size-3 [&_svg]:text-slate-500"

function statusPill(
  status: SessionStatus,
): { label: string; pillClass: string } {
  switch (status) {
    case "completed":
      return { label: "Completed", pillClass: "bg-emerald-50 text-emerald-700" }
    case "dropoff":
      return { label: "Drop-off", pillClass: "bg-red-50 text-red-700" }
    case "reassigned":
      return { label: "Reassigned", pillClass: "bg-amber-50 text-amber-700" }
    case "in_progress":
      return { label: "In Progress", pillClass: "bg-blue-50 text-blue-700" }
    default:
      return { label: "", pillClass: "bg-slate-50 text-slate-700" }
  }
}

/** Under 24h: Nh ago; 1–6d: Nd ago; 7d+: Nw ago */
function formatSessionStartedRelative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(ms / 60000)
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) {
    if (mins < 1) return "0h ago"
    return `${Math.max(1, hrs)}h ago`
  }
  const days = Math.floor(hrs / 24)
  if (days <= 6) {
    return `${days}d ago`
  }
  const weeks = Math.floor(days / 7)
  return `${Math.max(1, weeks)}w ago`
}

function formatAbsoluteTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export function SessionLogsDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [page, setPage] = useState(0)

  const filteredSessions = MOCK_SESSIONS

  const total = filteredSessions.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const start = total === 0 ? 0 : safePage * PAGE_SIZE + 1
  const end = Math.min(total, safePage * PAGE_SIZE + PAGE_SIZE)
  const pageRows =
    total === 0
      ? []
      : filteredSessions.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        aria-label="Close session logs"
        className={cn(
          "absolute inset-y-0 left-0 right-[560px] z-0 border-0 bg-transparent p-0",
          !open && "hidden",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "absolute right-0 top-0 bottom-0 z-10 flex w-[560px] flex-col border-l border-slate-200 bg-white shadow-[-8px_0_24px_rgba(15,15,15,0.04)] transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          <h2 className="text-[13px] font-medium text-slate-900">
            Session logs
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 px-4 py-2">
          <Select defaultValue="30">
            <SelectTrigger size="sm" className={cn(selectTriggerClass, "w-[100px]")}>
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7" className="text-[11px]">
                7 days
              </SelectItem>
              <SelectItem value="30" className="text-[11px]">
                30 days
              </SelectItem>
              <SelectItem value="90" className="text-[11px]">
                90 days
              </SelectItem>
              <SelectItem value="custom" className="text-[11px]">
                Custom
              </SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger size="sm" className={cn(selectTriggerClass, "w-[132px]")}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-[11px]">
                All statuses
              </SelectItem>
              <SelectItem value="dropoff" className="text-[11px]">
                Drop-off
              </SelectItem>
              <SelectItem value="reassigned" className="text-[11px]">
                Reassigned
              </SelectItem>
              <SelectItem value="completed" className="text-[11px]">
                Completed
              </SelectItem>
              <SelectItem value="in_progress" className="text-[11px]">
                In Progress
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-2 size-3 -translate-y-1/2 text-slate-400"
              strokeWidth={2}
              aria-hidden
            />
            <Input
              placeholder="Search by Conversation ID"
              className="h-7 border-slate-200 pr-2 pl-8 text-[11px] md:text-[11px]"
            />
          </div>
        </div>

        <div className="shrink-0 px-4 py-1.5">
          <p className="font-mono text-[10px] text-slate-500">
            {total} sessions
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {total === 0 ? (
            <div className="flex h-full items-center justify-center px-4 py-12">
              <p className="text-[11px] text-slate-500">
                No sessions match these filters.
              </p>
            </div>
          ) : (
            <>
              <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-2">
                <span className="w-24 shrink-0 text-[9px] font-medium tracking-wider text-slate-500 uppercase">
                  Status
                </span>
                <span className="w-36 shrink-0 text-[9px] font-medium tracking-wider text-slate-500 uppercase">
                  Contact
                </span>
                <span className="min-w-0 flex-1 text-[9px] font-medium tracking-wider text-slate-500 uppercase">
                  Last node
                </span>
                <span className="w-24 shrink-0 text-[9px] font-medium tracking-wider text-slate-500 uppercase">
                  Started
                </span>
                <span className="w-8 shrink-0 text-right text-[9px] font-medium tracking-wider text-slate-500 uppercase">
                  Nodes
                </span>
                <div className="w-4 shrink-0" aria-hidden />
              </div>
              {pageRows.map((session) => {
                const pill = statusPill(session.status)
                return (
                  <button
                    key={session.id}
                    type="button"
                    className="group flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50"
                    onClick={() =>
                      window.open(
                        `https://app.wati.io/teamInbox/${session.conversationId}`,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <div className="w-24 shrink-0">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium whitespace-nowrap",
                          pill.pillClass,
                        )}
                      >
                        {pill.label}
                      </span>
                    </div>
                    <div className="w-36 shrink-0">
                      <p className="truncate text-xs font-medium text-slate-900">
                        {session.contactName}
                      </p>
                      <p className="font-mono text-[10px] text-slate-500">
                        {session.phone}
                      </p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] text-slate-700">
                        {session.lastNodeBody}
                      </p>
                    </div>
                    <div className="flex w-24 shrink-0 flex-col">
                      <span className="text-[11px] text-slate-700">
                        {formatSessionStartedRelative(session.sessionStart)}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {formatAbsoluteTimestamp(session.sessionStart)}
                      </span>
                    </div>
                    <p className="w-8 shrink-0 text-right font-mono text-[11px] font-semibold text-slate-900">
                      {session.nodesTraversed}
                    </p>
                    <span
                      className="flex w-4 shrink-0 justify-end"
                      aria-hidden
                    >
                      <ExternalLink
                        size={12}
                        className="text-slate-300 group-hover:text-slate-500"
                        strokeWidth={2}
                      />
                    </span>
                  </button>
                )
              })}
            </>
          )}
        </div>

        <div className="flex h-10 shrink-0 items-center justify-between px-4">
          <p className="font-mono text-[10px] text-slate-500">
            {total === 0
              ? "Showing 0 of 0"
              : `Showing ${start}–${end} of ${total}`}
          </p>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              className={cn(
                "rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900",
                safePage <= 0 && "pointer-events-none opacity-30",
              )}
              disabled={safePage <= 0}
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeft size={14} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={cn(
                "rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900",
                safePage >= pageCount - 1 && "pointer-events-none opacity-30",
              )}
              disabled={safePage >= pageCount - 1}
              aria-label="Next page"
              onClick={() =>
                setPage((p) => Math.min(pageCount - 1, p + 1))
              }
            >
              <ChevronRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
