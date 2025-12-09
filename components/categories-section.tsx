"use client"

import React from "react"
import Link from "next/link"
export function CategoriesSection() {
  const [categories, setCategories] = React.useState<any[]>([])

  console.log("CategoriesSection render", categories)

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        console.log("categories data :", data)
        if (data.categories) {
          setCategories(data.categories)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-12 uppercase tracking-tighter">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ category }: { category: any }) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => { })
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isHovered])

  return (
    <Link
      href={`/categories/${category.id}`}
      className="group relative h-[500px] w-full overflow-hidden rounded-xl bg-gray-900 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Media */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        {category.videoUrl && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            src={category.videoUrl}
          />
        )}

        {/* Fallback/Main Image - Show if no video, or if video is not hovering (opacity layering handled above, but we keep image always visible behind video or if video missing) 
                    Actually, if video exists, we fade it in over the image.
                */}
        <img
          src={category.images?.[0]?.url || "/placeholder.svg"}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {category.videoUrl && (
          /* Video Layer again for opacity transition logic simplicity */
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            src={category.videoUrl}
          />
        )}

      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
          {category.name}
        </h3>
        <div className="h-1 w-12 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
      </div>
    </Link>
  )
}
