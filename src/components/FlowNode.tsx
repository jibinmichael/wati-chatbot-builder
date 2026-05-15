import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import {
  ChevronLeft,
  ChevronRight,
  GitBranch,
  HelpCircle,
  MessageCircle,
  type LucideIcon,
} from "lucide-react"
import { createContext, useContext } from "react"

export const JourneyContext = createContext(false)

const NODE_CONFIG: Record<
  string,
  { color: string; borderColor: string; label: string; icon: LucideIcon }
> = {
  message: {
    color: "#ef4444",
    borderColor: "#fecaca",
    label: "Send a message",
    icon: MessageCircle,
  },
  question: {
    color: "#f97316",
    borderColor: "#fed7aa",
    label: "Ask a question",
    icon: HelpCircle,
  },
  condition: {
    color: "#8b5cf6",
    borderColor: "#ddd6fe",
    label: "Set a condition",
    icon: GitBranch,
  },
}

export interface FlowNodeData extends Record<string, unknown> {
  type: string
  body: string
  sessions: number
  editedDaysAgo?: number
}

export type AppFlowNode = Node<FlowNodeData, "flowNode">

function ConnectorHandle({
  type,
  position,
}: {
  type: "source" | "target"
  position: Position
}) {
  const Icon = type === "source" ? ChevronRight : ChevronLeft

  return (
    <Handle
      type={type}
      position={position}
      className="!h-5 !w-5 !border-none !bg-transparent"
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 shadow-sm">
        <Icon size={10} className="text-white" strokeWidth={2.5} />
      </div>
    </Handle>
  )
}

export function FlowNode({ id, data }: NodeProps<AppFlowNode>) {
  const showJourney = useContext(JourneyContext)
  const config = NODE_CONFIG[data.type] || NODE_CONFIG.message
  const Icon = config.icon
  const isEdited = data.editedDaysAgo !== undefined
  const isEntryNode = id === "1"

  return (
    <div
      className="w-[140px] rounded-md border bg-white shadow-[2px_4px_12px_rgba(15,15,15,0.08)]"
      style={{ borderColor: config.borderColor }}
    >
      {isEntryNode ? null : (
        <ConnectorHandle type="target" position={Position.Left} />
      )}

      <div className="flex items-center gap-2 px-2.5 pb-1 pt-2">
        <div
          className="flex h-3 w-3 shrink-0 items-center justify-center rounded-sm"
          style={{ backgroundColor: config.color }}
        >
          <Icon size={8} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="flex-1 truncate text-[11px] text-slate-500">
          {config.label}
        </span>
        {isEdited ? (
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
        ) : null}
      </div>

      <div className="border-t" style={{ borderColor: config.borderColor }} />

      <div className="px-2.5 py-2">
        <p className="truncate text-xs font-medium text-slate-900">{data.body}</p>
      </div>

      {showJourney ? (
        <>
          <div className="border-t" style={{ borderColor: config.borderColor }} />
          <div className="flex items-center gap-1.5 px-2.5 py-2 text-[11px]">
            <span className="font-mono font-semibold text-slate-900">
              {data.sessions.toLocaleString()}
            </span>
            <span className="text-slate-400">sessions</span>
            {isEdited ? (
              <>
                <span className="text-slate-400">·</span>
                <span className="italic text-amber-600">
                  edited {data.editedDaysAgo}d ago
                </span>
              </>
            ) : null}
          </div>
        </>
      ) : null}

      <ConnectorHandle type="source" position={Position.Right} />
    </div>
  )
}
