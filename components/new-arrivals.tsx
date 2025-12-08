"use client"
import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  colors: string[]
  sizes: string[]
}

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()

        if (Array.isArray(data)) {
          const formattedProducts = data.slice(0, 4).map((p: any) => ({
            id: p.id,
            name: p.name,
            price: Number(p.basePrice),
            originalPrice: Number(p.basePrice), // Use basePrice as original for now
            image: p.images?.[0]?.url || "/placeholder.svg",
            colors: p.variants ? ([...new Set(p.variants.map((v: any) => v.color))].filter(Boolean) as string[]) : [],
            sizes: p.variants ? ([...new Set(p.variants.map((v: any) => v.size))].filter(Boolean) as string[]) : [],
          }))
          setProducts(formattedProducts)
        }
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black">NEW ARRIVALS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">NEW ARRIVALS</h2>
          <button className="text-sm font-bold text-black hover:opacity-60 transition flex items-center gap-2">
            VIEW ALL
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No new arrivals found.</p>
          )}
        </div>
      </div>
    </section>
  )
}
