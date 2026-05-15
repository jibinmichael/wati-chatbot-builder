import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import { createContext, useContext } from "react"
import {
  Bell,
  CircleCheck,
  Clock,
  Edit3,
  GitBranch,
  HelpCircle,
  MessageCircle,
  Sheet,
  Tag,
  Users,
  Webhook,
  type LucideIcon,
} from "lucide-react"

export const JourneyContext = createContext(false)

const NODE_CONFIG: Record<
  string,
  { color: string; borderColor: string; label: string; icon: LucideIcon }
> = {
  message: {
    color: "#ef4444",
    borderColor: "#fecaca",
    label: "Send message",
    icon: MessageCircle,
  },
  question: {
    color: "#f97316",
    borderColor: "#fed7aa",
    label: "Ask question",
    icon: HelpCircle,
  },
  condition: {
    color: "#8b5cf6",
    borderColor: "#ddd6fe",
    label: "Set condition",
    icon: GitBranch,
  },
  subscribe: {
    color: "#3b82f6",
    borderColor: "#bfdbfe",
    label: "Subscribe",
    icon: Bell,
  },
  attribute: {
    color: "#14b8a6",
    borderColor: "#99f6e4",
    label: "Update attribute",
    icon: Edit3,
  },
  tags: {
    color: "#06b6d4",
    borderColor: "#a5f3fc",
    label: "Set tags",
    icon: Tag,
  },
  delay: {
    color: "#0ea5e9",
    borderColor: "#bae6fd",
    label: "Time delay",
    icon: Clock,
  },
  assign: {
    color: "#a855f7",
    borderColor: "#e9d5ff",
    label: "Assign team",
    icon: Users,
  },
  webhook: {
    color: "#eab308",
    borderColor: "#fef08a",
    label: "Webhook",
    icon: Webhook,
  },
  spreadsheet: {
    color: "#22c55e",
    borderColor: "#bbf7d0",
    label: "Spreadsheet",
    icon: Sheet,
  },
  end: {
    color: "#64748b",
    borderColor: "#cbd5e1",
    label: "End",
    icon: CircleCheck,
  },
}

export interface FlowNodeData extends Record<string, unknown> {
  type: string
  body: string
  views: number
  /** Muted line below views (e.g. return-path note) */
  viewsFootnote?: string
  isStart?: boolean
  isEnd?: boolean
  /** Second source on bottom (e.g. loop-back) — right handle becomes id `forward` */
  extraReturnHandle?: boolean
  /** Extra target on bottom (e.g. return path from another node) */
  extraBottomTarget?: boolean
}

export type AppFlowNode = Node<FlowNodeData, "flowNode">

const hiddenHandle = {
  width: 1,
  height: 1,
  background: "transparent",
  border: "none",
  minWidth: 0,
  minHeight: 0,
}

export function FlowNode({ data }: NodeProps<AppFlowNode>) {
  const showJourney = useContext(JourneyContext)
  const config = NODE_CONFIG[data.type] || NODE_CONFIG.message
  const Icon = config.icon
  return (
    <div
      className="w-[170px] rounded-xl border bg-white shadow-[2px_4px_12px_rgba(15,15,15,0.06)]"
      style={{ borderColor: config.borderColor }}
    >
      {!data.isStart && (
        <>
          <Handle type="target" position={Position.Left} style={hiddenHandle} />
          {data.extraBottomTarget ? (
            <Handle
              id="bottom"
              type="target"
              position={Position.Bottom}
              style={hiddenHandle}
            />
          ) : null}
        </>
      )}

      <div className="flex items-center gap-2 px-3.5 pb-2 pt-3.5">
        <div
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px]"
          style={{ backgroundColor: config.color }}
        >
          <Icon size={12} className="text-white" strokeWidth={2.25} />
        </div>
        <span className="flex-1 truncate text-[10px] text-slate-500">
          {config.label}
        </span>
      </div>

      <div className="px-3.5 pb-2">
        <p className="truncate text-xs font-medium text-slate-900">{data.body}</p>
      </div>

      {showJourney ? (
        <div className="px-3.5 pb-3.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[11px] font-mono font-semibold text-slate-900">
              {data.views.toLocaleString()}
            </span>
            <span className="text-[10px] font-medium text-slate-600">views</span>
          </div>
          {data.viewsFootnote ? (
            <p className="mt-1 text-[9px] leading-snug text-slate-400">
              {data.viewsFootnote}
            </p>
          ) : null}
        </div>
      ) : null}

      {!data.isEnd && (
        <>
          <Handle
            id={data.extraReturnHandle ? "forward" : undefined}
            type="source"
            position={Position.Right}
            style={hiddenHandle}
          />
          {data.extraReturnHandle ? (
            <Handle
              id="return"
              type="source"
              position={Position.Bottom}
              style={hiddenHandle}
            />
          ) : null}
        </>
      )}
    </div>
  )
}
