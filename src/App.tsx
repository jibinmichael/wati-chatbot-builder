import { useState } from "react"
import { AnalyticsStrip } from "@/components/AnalyticsStrip"
import { BotHeader } from "@/components/BotHeader"
import { Canvas } from "@/components/Canvas"
import { NodePanel } from "@/components/NodePanel"
import { SessionLogsDrawer } from "@/components/SessionLogsDrawer"

function App() {
  const [showJourney, setShowJourney] = useState(true)
  const [logsOpen, setLogsOpen] = useState(false)

  return (
    <>
      <div className="flex h-screen max-h-screen overflow-hidden">
        <aside
          className="w-12 shrink-0 bg-[#FAFAFA]"
          aria-label="Application navigation"
        />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <BotHeader
            showJourney={showJourney}
            onJourneyChange={setShowJourney}
            onOpenLogs={() => setLogsOpen(true)}
          />
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
              showJourney ? "max-h-9 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <AnalyticsStrip />
          </div>
          <main className="relative flex-1 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-80">
              <NodePanel />
            </div>
            <div className="absolute inset-y-0 left-80 right-0">
              <Canvas showJourney={showJourney} />
            </div>
          </main>
        </div>
      </div>
      <SessionLogsDrawer
        open={logsOpen}
        onClose={() => setLogsOpen(false)}
      />
    </>
  )
}

export default App
