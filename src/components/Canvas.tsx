import { ReactFlow, type Edge, type EdgeTypes, type NodeTypes } from "@xyflow/react"
import { FlowNode, type AppFlowNode, JourneyContext } from "./FlowNode"
import { GradientEdge } from "./GradientEdge"

const nodeTypes = { flowNode: FlowNode } satisfies NodeTypes
const edgeTypes = { gradient: GradientEdge } satisfies EdgeTypes

const NODE_COLORS: Record<string, string> = {
  message: "#ef4444",
  question: "#f97316",
  condition: "#8b5cf6",
}

const initialNodes: AppFlowNode[] = [
  {
    id: "1",
    type: "flowNode",
    position: { x: 50, y: 200 },
    data: { type: "message", body: "Welcome to Wati 👋", sessions: 1247 },
  },
  {
    id: "2",
    type: "flowNode",
    position: { x: 250, y: 200 },
    data: { type: "question", body: "Are you new?", sessions: 1189 },
  },
  {
    id: "3",
    type: "flowNode",
    position: { x: 450, y: 80 },
    data: {
      type: "message",
      body: "Welcome aboard!",
      sessions: 247,
      editedDaysAgo: 3,
    },
  },
  {
    id: "4",
    type: "flowNode",
    position: { x: 450, y: 320 },
    data: { type: "message", body: "Welcome back!", sessions: 154 },
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "gradient",
    data: {
      sourceColor: NODE_COLORS.message,
      targetColor: NODE_COLORS.question,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "gradient",
    data: {
      sourceColor: NODE_COLORS.question,
      targetColor: NODE_COLORS.message,
      label: "87%",
    },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    type: "gradient",
    data: {
      sourceColor: NODE_COLORS.question,
      targetColor: NODE_COLORS.message,
      label: "13%",
    },
  },
]

export function Canvas({ showJourney }: { showJourney: boolean }) {
  return (
    <JourneyContext.Provider value={showJourney}>
      <div className="min-h-0 flex-1 bg-[#FEFEFE]">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.35 }}
          proOptions={{ hideAttribution: true }}
          className="h-full w-full bg-[#FEFEFE]"
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        />
      </div>
    </JourneyContext.Provider>
  )
}
