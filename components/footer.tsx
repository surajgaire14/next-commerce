export function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white transform rotate-45" />
              </div>
              <span className="text-lg font-bold tracking-widest">NEVERHOME</span>
            </div>
            <p className="text-gray-400 text-sm">Premium streetwear for the modern lifestyle.</p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">SHOP</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button className="hover:text-white transition">Mens</button>
              </li>
              <li>
                <button className="hover:text-white transition">Womens</button>
              </li>
              <li>
                <button className="hover:text-white transition">Accessories</button>
              </li>
              <li>
                <button className="hover:text-white transition">New Arrivals</button>
              </li>
              <li>
                <button className="hover:text-white transition">Best Sellers</button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button className="hover:text-white transition">Contact Us</button>
              </li>
              <li>
                <button className="hover:text-white transition">Shipping Info</button>
              </li>
              <li>
                <button className="hover:text-white transition">Returns</button>
              </li>
              <li>
                <button className="hover:text-white transition">FAQ</button>
              </li>
              <li>
                <button className="hover:text-white transition">Size Guide</button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">STAY UPDATED</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get updates on new releases and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-900 text-white text-sm px-3 py-2 rounded-l-lg outline-none focus:outline-none"
              />
              <button className="bg-white text-black px-3 py-2 rounded-r-lg font-bold text-sm hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 NeverHome. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-white transition">Privacy Policy</button>
              <button className="hover:text-white transition">Terms of Service</button>
              <button className="hover:text-white transition">Cookies</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
