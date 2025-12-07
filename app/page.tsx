"use client"

import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedCollection } from "@/components/featured-collection"
import { TrendingSection } from "@/components/trending-section"
import { NewArrivals } from "@/components/new-arrivals"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      <HeroSection />
      <CategoriesSection />
      <FeaturedCollection />
      <TrendingSection />
      <NewArrivals />
      <Footer />
    </div>
  )
}
