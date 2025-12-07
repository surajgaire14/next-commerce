"use client"
import { ProductCard } from "@/components/product-card"

export function NewArrivals() {
  const products = [
    {
      id: 1,
      name: "Premium Hoodie",
      price: 129.99,
      originalPrice: 129.99,
      image: "/black-hoodie-streetwear.png",
      colors: ["black", "gray", "navy", "beige"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 2,
      name: "Oversized T-Shirt",
      price: 49.99,
      originalPrice: 49.99,
      image: "/blue-t-shirt-streetwear.jpg",
      colors: ["blue", "black", "white", "red"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 3,
      name: "Varsity Jacket",
      price: 179.99,
      originalPrice: 179.99,
      image: "/varsity-jacket-streetwear.jpg",
      colors: ["beige-black", "black-red", "navy-white"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 4,
      name: "Classic Cap",
      price: 39.99,
      originalPrice: 39.99,
      image: "/black-cap-baseball-hat.jpg",
      colors: ["black", "white", "gray", "navy"],
      sizes: ["One Size"],
    },
  ]

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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
