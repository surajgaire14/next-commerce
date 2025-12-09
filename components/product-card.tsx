"use client"

import { useState } from "react"
import { Heart, ShoppingBag } from "lucide-react"
import { useCart } from "@/app/context/cart-context"

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  colors: string[]
  sizes: string[]
}

export function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showVariants, setShowVariants] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${selectedColor}-${selectedSize}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
      },
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="group relative flex flex-col h-full bg-transparent">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 hover:bg-white"
        >
          <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-black"} />
        </button>

        {/* Sale Badge */}
        {product.price < product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">
            Sale
          </div>
        )}

        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md text-black font-bold py-3 rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <ShoppingBag size={16} />
            {isAdded ? "Added" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold text-black leading-tight group-hover:underline decoration-1 underline-offset-4 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-500">{product.colors.length} Colors</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-base font-bold text-black">${product.price.toFixed(2)}</p>
          {product.price < product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
          )}
        </div>
      </div>

      {/* Mobile Add to Cart (Simple Text Button below) */}
      <div className="mt-3 md:hidden">
        <button
          onClick={handleAddToCart}
          className="w-full py-2 border border-black text-black font-bold text-xs uppercase tracking-wider rounded hover:bg-black hover:text-white transition-colors"
        >
          {isAdded ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}

function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    black: "bg-black",
    white: "bg-white border-gray-400",
    gray: "bg-gray-400",
    navy: "bg-blue-900",
    beige: "bg-yellow-100",
    "beige-black": "bg-gradient-to-br from-yellow-100 to-black",
    "black-red": "bg-gradient-to-br from-black to-red-600",
    "navy-white": "bg-gradient-to-br from-blue-900 to-white",
    red: "bg-red-600",
    blue: "bg-blue-600",
  }
  return colorMap[color] || "bg-gray-400"
}
