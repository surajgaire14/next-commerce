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
    <div className="bg-white rounded-lg overflow-hidden group h-full flex flex-col border border-gray-100">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 h-80">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 bg-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>

        {/* Sale Badge */}
        {product.price < product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-sm font-bold text-black mb-2 line-clamp-2">{product.name}</h3>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-black">${product.price.toFixed(2)}</p>
              {product.price < product.originalPrice && (
                <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
              )}
            </div>
          </div>

          {/* Color Preview */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-700 mb-2">Available in {product.colors.length} colors</p>
            <div className="flex gap-2">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 transition cursor-pointer ${selectedColor === color ? "border-black scale-110" : "border-gray-300"
                    } ${getColorClass(color)}`}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                  +{product.colors.length - 4}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Variant Selector */}
        <button
          onClick={() => setShowVariants(!showVariants)}
          className="w-full text-left text-xs font-medium text-gray-600 hover:text-black transition mb-3 pb-3 border-b border-gray-200"
        >
          Select Options
        </button>

        {/* Variants Dropdown */}
        {showVariants && (
          <div className="mb-3 pb-3 border-b border-gray-200 space-y-3">
            {/* Colors */}
            <div>
              <p className="text-xs font-bold text-gray-700 mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition ${selectedColor === color ? "border-black scale-110" : "border-gray-300"
                      } ${getColorClass(color)}`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-xs font-bold text-gray-700 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-xs font-medium border rounded transition ${selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-gray-700 hover:border-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 ${isAdded ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-900"
            }`}
        >
          <ShoppingBag size={16} />
          {isAdded ? "ADDED!" : "ADD TO CART"}
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
