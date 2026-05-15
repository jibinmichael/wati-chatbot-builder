import { AnalyticsStrip } from "@/components/AnalyticsStrip"
import { BotHeader } from "@/components/BotHeader"

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <BotHeader />
      <AnalyticsStrip />
      <main className="bg-slate-100 min-h-[calc(100vh-180px)]" />
    </div>
  )
}

export default App
