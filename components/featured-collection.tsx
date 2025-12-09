"use client"

export function FeaturedCollection() {

  return (
    <section className="w-full py-0">
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/premium-loungewear-collection.jpg"
            alt="Featured Premium Lounge Collection"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
          <span className="text-sm md:text-base font-bold text-white/80 tracking-[0.2em] mb-4 uppercase">
            Featured Collection
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter max-w-2xl leading-none">
            Premium Lounge
          </h2>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Crafted for the moments in between. Experience our softest fabrics designed for recovery and relaxation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-100 transition shadow-xl hover:scale-105">
              Shop Women's
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition backdrop-blur-sm hover:scale-105">
              Shop Men's
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
