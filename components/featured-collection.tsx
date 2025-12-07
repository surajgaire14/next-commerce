"use client"

export function FeaturedCollection() {
  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div>
            <span className="text-sm font-bold text-blue-600 tracking-widest mb-4 block">FEATURED</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Premium Lounge Collection</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Our softest, newest rest day sets to lounge and live in this season. Crafted from premium materials for
              ultimate comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition">
                Shop Women's
              </button>
              <button className="px-8 py-3 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition">
                Shop Men's
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
            <img
              src="/premium-loungewear-collection.jpg"
              alt="Featured Premium Lounge Collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
