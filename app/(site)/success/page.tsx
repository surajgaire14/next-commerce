"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"
import { useCart } from "@/app/context/cart-context"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")
  const { dispatch } = useCart()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      dispatch({ type: "CLEAR_CART" })
      setLoading(false)
      setOrder({ id: orderId })
    }
  }, [orderId, dispatch])

  if (!orderId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-4">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
            <Link href="/cart" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                View Cart
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
