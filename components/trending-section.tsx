"use client"

import { ProductCard } from "@/components/product-card"

export function TrendingSection() {
  const trendingProducts = [
    {
      id: 5,
      name: "Essential Joggers",
      price: 89.99,
      originalPrice: 89.99,
      image: "/black-joggers-streetwear.jpg",
      colors: ["black", "gray", "navy"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 6,
      name: "Crew Neck Sweatshirt",
      price: 99.99,
      originalPrice: 99.99,
      image: "/crew-neck-sweatshirt.jpg",
      colors: ["black", "white", "navy", "red"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 7,
      name: "Track Pants",
      price: 119.99,
      originalPrice: 119.99,
      image: "/track-pants-athletic.jpg",
      colors: ["black", "navy", "gray"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 8,
      name: "Premium Beanie",
      price: 45.99,
      originalPrice: 45.99,
      image: "/beanie-winter-hat.jpg",
      colors: ["black", "white", "navy", "red"],
      sizes: ["One Size"],
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-blue-600 tracking-widest mb-4 block">TRENDING NOW</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Best Sellers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover the styles our customers love most</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-black text-black font-bold rounded-lg hover:bg-black hover:text-white transition">
            VIEW ALL COLLECTIONS
          </button>
        </div>
      </div>
    </section>
  )
}
