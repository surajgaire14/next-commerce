"use client"

export function CategoriesSection() {
  const categories = [
    {
      name: "MENS",
      image: "/mens-streetwear-collection-clothing.jpg",
    },
    {
      name: "WOMENS",
      image: "/womens-streetwear-collection-clothing.jpg",
    },
    {
      name: "ACCESSORIES",
      image: "/streetwear-accessories-hats-caps.jpg",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <button key={category.name} className="relative overflow-hidden rounded-lg group cursor-pointer">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-end">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 ml-6">{category.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
