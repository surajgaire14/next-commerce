"use client"

import { useState } from "react"
import { Menu, Search, User, ShoppingCart, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b border-gray-100">
      {/* Top Bar */}
      <div className="text-center py-2 bg-gray-50 text-xs font-medium text-gray-700 tracking-wider">
        FREE SHIPPING ON ORDERS OVER $150
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <nav className="flex gap-6 text-sm font-bold text-black">
              <button className="hover:opacity-60 transition">MENS</button>
              <button className="hover:opacity-60 transition">WOMENS</button>
              <button className="hover:opacity-60 transition">ACCESSORIES</button>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-1 text-center md:flex-none">
            <div className="text-2xl font-bold tracking-widest flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-black transform rotate-45" />
              </div>
              <span>Next Commerce</span>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex gap-6 items-center text-sm font-bold">
            <button className="hover:opacity-60 transition">BEST SELLERS</button>
            <button className="hover:opacity-60 transition">CONTACT US</button>
            <button className="hover:opacity-60 transition">BLOGS</button>
          </div>

          {/* Icons */}
          <div className="flex gap-4 items-center">
            <button className="p-2 hover:opacity-60 transition">
              <Search size={20} />
            </button>
            <button className="p-2 hover:opacity-60 transition">
              <User size={20} />
            </button>
            <button className="p-2 hover:opacity-60 transition relative">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
            <button className="text-left text-sm font-bold py-2 hover:opacity-60 transition">MENS</button>
            <button className="text-left text-sm font-bold py-2 hover:opacity-60 transition">WOMENS</button>
            <button className="text-left text-sm font-bold py-2 hover:opacity-60 transition">ACCESSORIES</button>
            <button className="text-left text-sm font-bold py-2 hover:opacity-60 transition">BEST SELLERS</button>
            <button className="text-left text-sm font-bold py-2 hover:opacity-60 transition">CONTACT US</button>
            <button className="text-left text-sm font-bold py-2 hover:opacity-60 transition">BLOGS</button>
          </nav>
        )}
      </div>
    </header>
  )
}
