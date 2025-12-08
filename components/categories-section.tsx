"use client"

import React from "react"

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
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <button key={category.id} className="relative overflow-hidden rounded-lg group cursor-pointer h-96">
              <img
                src={category.images?.[0]?.url || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition flex items-end p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{category.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
