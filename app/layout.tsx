import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Providers } from "@/components/provider"
import StripeProvider from "./stripe-provider"
import { CartProvider } from "./context/cart-context"

export const metadata: Metadata = {
  title: "Next Commerce – Fashion for Men, Women & Accessories",
  description:
    "Next Commerce is your modern e-commerce destination for stylish men's clothing, women's fashion, and essential accessories. Shop trends, quality products, and seamless online experiences.",
  generator: "Next Commerce",
  keywords: [
    "Next Commerce",
    "online shopping",
    "men's clothing",
    "women's clothing",
    "fashion accessories",
    "ecommerce",
    "fashion store",
    "apparel",
  ],
  authors: [{ name: "Next Commerce Team" }],
  applicationName: "Next Commerce",
  openGraph: {
    title: "Next Commerce – Fashion for Men, Women & Accessories",
    description:
      "Discover a curated collection of men's fashion, women's styles, and accessories at Next Commerce.",
    url: "https://next-commerce-vvvvvoneeeee.vercel.app/",
    siteName: "Next Commerce",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next Commerce – Fashion Store",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "logo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Providers session={session}>
          <CartProvider>
            <StripeProvider>
              {children}
            </StripeProvider>
          </CartProvider>
        </Providers>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
