"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Hero {
  id: number
  title: string
  subtitle?: string | null
  videoUrl?: string | null
  imageUrl?: string | null
  link?: string | null
  buttonText?: string | null
  isActive: boolean
}

export function HeroSection() {
  const [hero, setHero] = React.useState<Hero | null>(null)
  // Use a default hero if no active one found
  const defaultHero: Hero = {
    id: 0,
    title: "Discover Our Latest Collection",
    subtitle: "Explore premium streetwear designed for modern comfort and style.",
    imageUrl: "/streetwear-models-new-collection.jpg",
    link: "/shop",
    buttonText: "Shop Now",
    isActive: true,
  }

  React.useEffect(() => {
    async function fetchHero() {
      try {
        const response = await fetch("/api/hero")
        const data = await response.json()
        if (data.heroes && data.heroes.length > 0) {
          // Find the active one, or default to the first one created
          const activeHero = data.heroes.find((h: Hero) => h.isActive) || data.heroes[0]
          setHero(activeHero)
        }
      } catch (error) {
        console.error("Error fetching hero:", error)
      }
    }
    fetchHero()
  }, [])

  const currentHero = hero || defaultHero

  return (
    <section className="relative w-full h-[85vh] overflow-hidden bg-black">
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        {currentHero.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src={currentHero.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={currentHero.imageUrl || "/placeholder.svg"}
            alt={currentHero.title}
            className="w-full h-full object-cover opacity-80"
          />
        )}
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col justify-center items-start px-6 md:px-12 pb-20">
        <span className="text-white/90 text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Gymshark Style
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tighter max-w-4xl leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {currentHero.title}
        </h1>
        {currentHero.subtitle && (
          <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {currentHero.subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Link href={currentHero.link || "/shop"}>
            <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold px-8 py-6 rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
              {currentHero.buttonText || "Shop Now"}
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="border-white/40 text-black hover:bg-white/10 hover:border-white font-bold px-8 py-6 rounded-full text-lg backdrop-blur-sm transition-all hover:scale-105">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
