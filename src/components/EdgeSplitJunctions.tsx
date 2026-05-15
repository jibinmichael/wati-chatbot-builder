import { useMemo } from "react"
import { EdgeLabelRenderer, useEdges, useNodes } from "@xyflow/react"

const NODE_WIDTH = 170
const NODE_HEIGHT = 96
const JUNCTION_OFFSET = 14

/** Tines-style fork brace where one node splits to multiple targets. */
export function EdgeSplitJunctions() {
  const edges = useEdges()
  const nodes = useNodes()

  const junctions = useMemo(() => {
    const outgoing = new Map<string, number>()
    for (const edge of edges) {
      outgoing.set(edge.source, (outgoing.get(edge.source) ?? 0) + 1)
    }

    return [...outgoing.entries()]
      .filter(([, count]) => count >= 2)
      .map(([sourceId]) => {
        const node = nodes.find((n) => n.id === sourceId)
        if (!node) return null
        return {
          id: sourceId,
          x: node.position.x + NODE_WIDTH + JUNCTION_OFFSET,
          y: node.position.y + NODE_HEIGHT / 2,
        }
      })
      .filter((j): j is NonNullable<typeof j> => j !== null)
  }, [edges, nodes])

  if (junctions.length === 0) return null

  return (
    <EdgeLabelRenderer>
      {junctions.map((j) => (
        <svg
          key={j.id}
          aria-hidden
          width={12}
          height={22}
          viewBox="0 0 12 22"
          className="pointer-events-none overflow-visible"
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${j.x}px, ${j.y}px)`,
          }}
        >
          <path
            d="M10 2 C4 6 4 16 10 20"
            fill="none"
            stroke="#60a5fa"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      ))}
    </EdgeLabelRenderer>
  )
}
