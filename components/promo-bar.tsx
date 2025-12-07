"use client"

import { ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export function PromoBar() {
  const promos = [
    "NEVERHOME PREMIER SHORTS IN BLACK NOW IN STOCK",
    "FREE SHIPPING ON ORDERS OVER $150 - SHOP NOW",
    "NEW COLLECTION JUST DROPPED - EXPLORE",
  ]

  const [currentPromo, setCurrentPromo] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-blue-600 text-white text-center py-3 text-sm font-bold tracking-wide overflow-hidden">
      <div className="flex items-center justify-center gap-2">
        <span>{promos[currentPromo]}</span>
        <ChevronRight size={16} />
      </div>
    </div>
  )
}
