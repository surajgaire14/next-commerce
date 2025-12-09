import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Providers } from "@/components/provider"
import StripeProvider from "./stripe-provider"
import { CartProvider } from "./context/cart-context"

export const metadata: Metadata = {
  title: "Next Commerce – Gym Clothes & Workout Wear",
  description:
    "Shop Next Commerce for the latest gym clothes and workout wear. Premium fitness apparel for men and women designed for performance and style.",
  generator: "Next Commerce",
  keywords: [
    "Next Commerce",
    "gym clothes",
    "workout wear",
    "fitness apparel",
    "activewear",
    "men's gym clothes",
    "women's gym clothes",
    "sportswear",
  ],
  authors: [{ name: "Next Commerce Team" }],
  applicationName: "Next Commerce",
  openGraph: {
    title: "Next Commerce – Gym Clothes & Workout Wear",
    description:
      "Discover premium gym clothes and workout accessories at Next Commerce. Elevate your training with our latest collections.",
    url: "https://next-commerce-vvvvvoneeeee.vercel.app/",
    siteName: "Next Commerce",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next Commerce – Gym & Fitness",
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
