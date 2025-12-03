"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Variant {
  size: string
  color: string
  sku: string
  stock: number
  price?: number
}

interface VariantManagerProps {
  variants: Variant[]
  onVariantsChange: (variants: Variant[]) => void
}

export function VariantManager({ variants, onVariantsChange }: VariantManagerProps) {
  const [newVariant, setNewVariant] = useState<Variant>({
    size: "",
    color: "",
    sku: "",
    stock: 0,
    price: undefined,
  })

  function addVariant(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (!newVariant.size.trim() || !newVariant.color.trim() || !newVariant.sku.trim()) {
      return
    }

    onVariantsChange([...variants, newVariant])
    setNewVariant({ size: "", color: "", sku: "", stock: 0, price: undefined })
  }

  function removeVariant(index: number) {
    onVariantsChange(variants.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Product Variants</CardTitle>
        <CardDescription>Add sizes and colors for this product</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          <Input
            placeholder="Size (e.g., M, L, XL)"
            value={newVariant.size}
            onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
          />
          <Input
            placeholder="Color (e.g., Red, Blue)"
            value={newVariant.color}
            onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
          />
          <Input
            placeholder="SKU"
            value={newVariant.sku}
            onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Stock"
            value={newVariant.stock}
            onChange={(e) => setNewVariant({ ...newVariant, stock: Number.parseInt(e.target.value) || 0 })}
          />
          <Input
            type="number"
            placeholder="Price (optional)"
            step="0.01"
            value={newVariant.price || ""}
            onChange={(e) =>
              setNewVariant({ ...newVariant, price: e.target.value ? Number.parseFloat(e.target.value) : undefined })
            }
          />
          <Button onClick={addVariant} className="gap-2 md:col-span-3">
            <Plus className="w-4 h-4" />
            Add Variant
          </Button>
        </div>

        {variants.length > 0 && (
          <div className="rounded-lg border overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Size</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-12">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variants.map((variant, index) => (
                  <TableRow key={index}>
                    <TableCell>{variant.size}</TableCell>
                    <TableCell>{variant.color}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{variant.sku}</TableCell>
                    <TableCell>{variant.stock}</TableCell>
                    <TableCell>{variant.price ? `$${variant.price.toFixed(2)}` : "—"}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVariant(index)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
