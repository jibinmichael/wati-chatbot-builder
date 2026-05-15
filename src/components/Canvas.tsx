import { useState } from "react"
import {
  ReactFlow,
  useNodesState,
  type Edge,
  type EdgeTypes,
  type NodeTypes,
} from "@xyflow/react"
import { FlowNode, type AppFlowNode, JourneyContext } from "./FlowNode"
import { ZoomControls } from "./ZoomControls"
import { GradientEdge } from "./GradientEdge"

const nodeTypes = { flowNode: FlowNode } satisfies NodeTypes
const edgeTypes = { gradient: GradientEdge } satisfies EdgeTypes

const NC = {
  message: "#ef4444",
  question: "#f97316",
  condition: "#8b5cf6",
  attribute: "#14b8a6",
  tags: "#06b6d4",
  delay: "#0ea5e9",
  assign: "#a855f7",
  webhook: "#eab308",
  end: "#64748b",
}

const initialNodes: AppFlowNode[] = [
  {
    id: "welcome",
    type: "flowNode",
    position: { x: 50, y: 280 },
    data: {
      type: "message",
      body: "Welcome to Wati 👋",
      views: 12720,
      isStart: true,
    },
  },
  {
    id: "q1",
    type: "flowNode",
    position: { x: 630, y: 280 },
    data: {
      type: "question",
      body: "New or existing customer?",
      views: 12150,
    },
  },
  {
    id: "n1",
    type: "flowNode",
    position: { x: 920, y: 80 },
    data: {
      type: "message",
      body: "Awesome! Let's set you up.",
      views: 5468,
    },
  },
  {
    id: "n2",
    type: "flowNode",
    position: { x: 1210, y: 80 },
    data: {
      type: "question",
      body: "What's your industry?",
      views: 5310,
    },
  },
  {
    id: "n3",
    type: "flowNode",
    position: { x: 1500, y: 80 },
    data: { type: "attribute", body: "Save industry", views: 5150 },
  },
  {
    id: "n4",
    type: "flowNode",
    position: { x: 1790, y: 80 },
    data: { type: "tags", body: "Tag: new_signup", views: 5100 },
  },
  {
    id: "n5",
    type: "flowNode",
    position: { x: 2080, y: 80 },
    data: {
      type: "webhook",
      body: "Create CRM lead",
      views: 5050,
    },
  },
  {
    id: "end-new",
    type: "flowNode",
    position: { x: 2370, y: 80 },
    data: {
      type: "end",
      body: "New user routed",
      views: 4820,
      isEnd: true,
    },
  },
  {
    id: "e1",
    type: "flowNode",
    position: { x: 920, y: 485 },
    data: { type: "question", body: "How can I help?", views: 6683 },
  },
  {
    id: "p1",
    type: "flowNode",
    position: { x: 1210, y: 370 },
    data: { type: "message", body: "Here are our plans", views: 1920 },
  },
  {
    id: "p2",
    type: "flowNode",
    position: { x: 1500, y: 370 },
    data: { type: "assign", body: "Sales team", views: 1890 },
  },
  {
    id: "end-sales",
    type: "flowNode",
    position: { x: 1790, y: 370 },
    data: {
      type: "end",
      body: "Sales handoff",
      views: 1840,
      isEnd: true,
    },
  },
  {
    id: "s1",
    type: "flowNode",
    position: { x: 1210, y: 600 },
    data: {
      type: "webhook",
      body: "Check open tickets",
      views: 4480,
      viewsFootnote: "The number includes users who have returned to this node.",
      extraBottomTarget: true,
    },
  },
  {
    id: "s2",
    type: "flowNode",
    position: { x: 1500, y: 600 },
    data: { type: "condition", body: "Has open ticket?", views: 4410 },
  },
  {
    id: "t1",
    type: "flowNode",
    position: { x: 1790, y: 530 },
    data: { type: "message", body: "Tracking your ticket", views: 1533 },
  },
  {
    id: "t2",
    type: "flowNode",
    position: { x: 2080, y: 530 },
    data: {
      type: "delay",
      body: "Wait 30s",
      views: 1500,
    },
  },
  {
    id: "end-status",
    type: "flowNode",
    position: { x: 2370, y: 530 },
    data: {
      type: "end",
      body: "Status sent",
      views: 1490,
      isEnd: true,
    },
  },
  {
    id: "nt1",
    type: "flowNode",
    position: { x: 1790, y: 700 },
    data: {
      type: "question",
      body: "What's the issue?",
      views: 2847,
      extraReturnHandle: true,
    },
  },
  {
    id: "nt2",
    type: "flowNode",
    position: { x: 2080, y: 700 },
    data: { type: "webhook", body: "Create ticket", views: 2800 },
  },
  {
    id: "nt3",
    type: "flowNode",
    position: { x: 2370, y: 700 },
    data: { type: "assign", body: "Support team", views: 2750 },
  },
  {
    id: "end-ticket",
    type: "flowNode",
    position: { x: 2660, y: 700 },
    data: {
      type: "end",
      body: "Ticket created",
      views: 2720,
      isEnd: true,
    },
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "welcome",
    target: "q1",
    type: "gradient",
    data: { sourceColor: NC.message, targetColor: NC.question },
  },
  {
    id: "eq1-n1",
    source: "q1",
    target: "n1",
    type: "gradient",
    data: {
      sourceColor: NC.question,
      targetColor: NC.message,
      label: "45%",
    },
  },
  {
    id: "eq1-e1",
    source: "q1",
    target: "e1",
    type: "gradient",
    data: {
      sourceColor: NC.question,
      targetColor: NC.question,
      label: "55%",
    },
  },
  {
    id: "en1-n2",
    source: "n1",
    target: "n2",
    type: "gradient",
    data: { sourceColor: NC.message, targetColor: NC.question },
  },
  {
    id: "en2-n3",
    source: "n2",
    target: "n3",
    type: "gradient",
    data: { sourceColor: NC.question, targetColor: NC.attribute },
  },
  {
    id: "en3-n4",
    source: "n3",
    target: "n4",
    type: "gradient",
    data: { sourceColor: NC.attribute, targetColor: NC.tags },
  },
  {
    id: "en4-n5",
    source: "n4",
    target: "n5",
    type: "gradient",
    data: { sourceColor: NC.tags, targetColor: NC.webhook },
  },
  {
    id: "en5-end",
    source: "n5",
    target: "end-new",
    type: "gradient",
    data: { sourceColor: NC.webhook, targetColor: NC.end },
  },
  {
    id: "ee1-p1",
    source: "e1",
    target: "p1",
    type: "gradient",
    data: {
      sourceColor: NC.question,
      targetColor: NC.message,
      label: "30%",
    },
  },
  {
    id: "ee1-s1",
    source: "e1",
    target: "s1",
    type: "gradient",
    data: {
      sourceColor: NC.question,
      targetColor: NC.webhook,
      label: "70%",
    },
  },
  {
    id: "ep1-p2",
    source: "p1",
    target: "p2",
    type: "gradient",
    data: { sourceColor: NC.message, targetColor: NC.assign },
  },
  {
    id: "ep2-end",
    source: "p2",
    target: "end-sales",
    type: "gradient",
    data: { sourceColor: NC.assign, targetColor: NC.end },
  },
  {
    id: "es1-s2",
    source: "s1",
    target: "s2",
    type: "gradient",
    data: { sourceColor: NC.webhook, targetColor: NC.condition },
  },
  {
    id: "es2-t1",
    source: "s2",
    target: "t1",
    type: "gradient",
    data: {
      sourceColor: NC.condition,
      targetColor: NC.message,
      label: "35%",
    },
  },
  {
    id: "es2-nt1",
    source: "s2",
    target: "nt1",
    type: "gradient",
    data: {
      sourceColor: NC.condition,
      targetColor: NC.question,
      label: "65%",
    },
  },
  {
    id: "et1-t2",
    source: "t1",
    target: "t2",
    type: "gradient",
    data: { sourceColor: NC.message, targetColor: NC.delay },
  },
  {
    id: "et2-end",
    source: "t2",
    target: "end-status",
    type: "gradient",
    data: { sourceColor: NC.delay, targetColor: NC.end },
  },
  {
    id: "ent1-s1",
    source: "nt1",
    target: "s1",
    sourceHandle: "return",
    targetHandle: "bottom",
    type: "gradient",
    data: {
      sourceColor: NC.question,
      targetColor: NC.webhook,
      label: "15% returned back",
      labelTone: "amber",
    },
  },
  {
    id: "ent1-nt2",
    source: "nt1",
    target: "nt2",
    sourceHandle: "forward",
    type: "gradient",
    data: { sourceColor: NC.question, targetColor: NC.webhook },
  },
  {
    id: "ent2-nt3",
    source: "nt2",
    target: "nt3",
    type: "gradient",
    data: { sourceColor: NC.webhook, targetColor: NC.assign },
  },
  {
    id: "ent3-end",
    source: "nt3",
    target: "end-ticket",
    type: "gradient",
    data: { sourceColor: NC.assign, targetColor: NC.end },
  },
]

export function Canvas({ showJourney }: { showJourney: boolean }) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [isPanning, setIsPanning] = useState(false)

  return (
    <JourneyContext.Provider value={showJourney}>
      <div
        className={`relative h-full w-full overflow-hidden bg-[#FAFAFA] ${isPanning ? "rf-panning" : ""}`}
      >
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.05, minZoom: 0.35, maxZoom: 1 }}
          minZoom={0.35}
          maxZoom={1}
          proOptions={{ hideAttribution: true }}
          className="h-full w-full bg-[#FAFAFA]"
          onMoveStart={() => setIsPanning(true)}
          onMoveEnd={() => setIsPanning(false)}
          panOnDrag={true}
          panOnScroll={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <ZoomControls />
        </ReactFlow>
      </div>
    </JourneyContext.Provider>
  )
}
