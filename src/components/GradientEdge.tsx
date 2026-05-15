import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
} from "@xyflow/react"

export interface GradientEdgeData extends Record<string, unknown> {
  sourceColor: string
  targetColor: string
  label?: string
}

export type AppGradientEdge = Edge<GradientEdgeData, "gradient">

export function GradientEdge({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  data,
}: EdgeProps<AppGradientEdge>) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const gradientId = `gradient-${id}`
  const sourceColor = data?.sourceColor ?? "#cbd5e1"
  const targetColor = data?.targetColor ?? "#cbd5e1"

  return (
    <>
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={sourceX}
          y1={sourceY}
          x2={targetX}
          y2={targetY}
        >
          <stop offset="0%" stopColor={sourceColor} />
          <stop offset="100%" stopColor={targetColor} />
        </linearGradient>
      </defs>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: `url(#${gradientId})`, strokeWidth: 2 }}
      />
      {data?.label ? (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
            className="pointer-events-none rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-900 shadow-sm"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  )
}
