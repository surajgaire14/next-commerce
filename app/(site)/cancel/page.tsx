"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle } from "lucide-react"

export default function CancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <Card className="w-full max-w-md text-center">
                <CardContent className="pt-6 pb-6">
                    <div className="mb-4 flex justify-center">
                        <XCircle className="h-16 w-16 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
                    <p className="text-gray-600 mb-6">
                        Your payment was not processed. No charges were made.
                    </p>
                    <div className="space-y-4">
                        <Link href="/checkout">
                            <Button className="w-full">Try Again</Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" className="w-full">
                                Return to Store
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
