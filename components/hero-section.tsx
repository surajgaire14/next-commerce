"use client"

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-0">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-96 md:min-h-[500px]">
          {/* Text Side */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 md:p-12 flex flex-col justify-center rounded-r-lg md:rounded-r-0">
            <span className="text-sm font-bold text-blue-400 mb-4 block tracking-widest">NEW IN</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Discover Our Latest Collection</h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Explore premium streetwear designed for modern comfort and style.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                Shop Now
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative overflow-hidden rounded-l-lg md:rounded-l-0">
            <img
              src="/streetwear-models-new-collection.jpg"
              alt="New collection hero image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
