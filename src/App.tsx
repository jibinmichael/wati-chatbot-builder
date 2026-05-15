import { useState } from "react"
import { AnalyticsStrip } from "@/components/AnalyticsStrip"
import { BotHeader } from "@/components/BotHeader"
import { Canvas } from "@/components/Canvas"
import { NodePanel } from "@/components/NodePanel"

function App() {
  const [showJourney, setShowJourney] = useState(true)

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden">
      <BotHeader showJourney={showJourney} onJourneyChange={setShowJourney} />
      <AnalyticsStrip />
      <main className="flex-1 flex flex-row min-h-0 overflow-hidden">
        <div className="m-1 flex min-h-0 shrink-0 self-stretch">
          <NodePanel />
        </div>
        <Canvas showJourney={showJourney} />
      </main>
    </div>
  )
}

export default App
