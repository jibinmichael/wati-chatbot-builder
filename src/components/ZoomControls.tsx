import { Panel, useReactFlow } from "@xyflow/react"
import { Minus, Plus } from "lucide-react"

const buttonClass =
  "flex h-5 w-5 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100"

export function ZoomControls() {
  const { zoomIn, zoomOut } = useReactFlow()

  return (
    <Panel position="bottom-left" className="!m-4">
      <div
        className="flex items-center rounded-full border border-slate-200 bg-white p-px shadow-sm"
        role="group"
        aria-label="Zoom controls"
      >
        <button
          type="button"
          onClick={() => zoomOut()}
          aria-label="Zoom out"
          className={buttonClass}
        >
          <Minus size={10} strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={() => zoomIn()}
          aria-label="Zoom in"
          className={buttonClass}
        >
          <Plus size={10} strokeWidth={2.25} />
        </button>
      </div>
    </Panel>
  )
}
