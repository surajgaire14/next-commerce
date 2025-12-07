"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useCart } from "@/app/context/cart-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { state } = useCart()
//   const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.fullName || !formData.address) {
    //   toast({
    //     title: "Missing information",
    //     description: "Please fill in all required fields",
    //     variant: "destructive",
    //   })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items,
          total: state.total,
          customerEmail: formData.email,
          customerName: formData.fullName,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen p-4">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Store
          </Button>
        </Link>
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <Link href="/cart">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Button>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl p-4">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your details to complete the purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St"
                      required
                    />
                  </div>

                  <div className="grid gap-4 grid-cols-2">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="10001" />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Pay with Stripe"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
