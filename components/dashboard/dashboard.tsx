"use client"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { ContentArea } from "./content-area"
import { useState } from "react"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <ContentArea />
      </div>
    </div>
  )
}


