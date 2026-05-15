import { useState } from "react"
import {
  Bell,
  Clock,
  Edit3,
  GitBranch,
  HelpCircle,
  MessageCircle,
  Sheet,
  Tag,
  Users,
  Webhook,
} from "lucide-react"

type Channel = "whatsapp" | "instagram" | "messenger"

const categories = [
  {
    title: "Communication",
    nodes: [
      { id: "send", label: "Send message", icon: MessageCircle, bg: "bg-red-500" },
      { id: "ask", label: "Ask question", icon: HelpCircle, bg: "bg-orange-500" },
      { id: "condition", label: "Set condition", icon: GitBranch, bg: "bg-violet-500" },
    ],
  },
  {
    title: "Operations",
    nodes: [
      { id: "subscribe", label: "Subscribe", icon: Bell, bg: "bg-blue-500" },
      { id: "update", label: "Update attribute", icon: Edit3, bg: "bg-teal-500" },
      { id: "tags", label: "Set tags", icon: Tag, bg: "bg-cyan-500" },
      { id: "delay", label: "Time delay", icon: Clock, bg: "bg-sky-500" },
      { id: "assign", label: "Assign team", icon: Users, bg: "bg-purple-500" },
    ],
  },
  {
    title: "Integrations",
    nodes: [
      { id: "webhook", label: "Webhook", icon: Webhook, bg: "bg-yellow-500" },
      { id: "sheet", label: "Spreadsheet", icon: Sheet, bg: "bg-green-500" },
    ],
  },
] as const

const channels = [
  { id: "whatsapp" as const, label: "WhatsApp", dot: "#22c55e" },
  { id: "instagram" as const, label: "Instagram", dot: "#f97316" },
  { id: "messenger" as const, label: "Messenger", dot: "#3b82f6" },
]

export function NodePanel() {
  const [channel, setChannel] = useState<Channel>("whatsapp")

  return (
    <aside className="flex h-full min-h-0 w-80 flex-col border-r border-[#FDFDFD] shadow-[3px_0_20px_-6px_rgba(15,15,15,0.05)]">
      <div className="p-4">
        <div className="flex h-8 flex-row gap-1 rounded-md bg-slate-100 p-1">
          {channels.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setChannel(c.id)}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded text-xs transition-colors ${
                channel === c.id
                  ? "border border-slate-200 bg-white text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: c.dot }}
              />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h3 className="mb-3 text-xs font-medium text-slate-500">{cat.title}</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-3">
              {cat.nodes.map((node) => {
                const Icon = node.icon
                return (
                  <div
                    key={node.id}
                    className="flex cursor-grab flex-col gap-2 rounded-md p-2 hover:bg-slate-50"
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-md ${node.bg}`}
                    >
                      <Icon size={14} className="text-white" strokeWidth={2} />
                    </div>
                    <span className="text-xs text-slate-900">{node.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
