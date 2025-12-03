"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { VariantManager } from "./variant-manager"
import { ImageManager } from "./image-manager"

interface Category {
  id: number
  name: string
}

interface Variant {
  size: string
  color: string
  sku: string
  stock: number
  price?: number
}

interface ProductImage {
  url: string
  alt?: string
}

interface Product {
  id: number
  name: string
  description: string | null
  basePrice: string
  categoryId: number
  categoryName: string
  variants: Variant[]
  images: ProductImage[]
}

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    categoryId: "",
    variants: [] as Variant[],
    images: [] as ProductImage[],
  })
  // const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [productsRes, categoriesRes] = await Promise.all([fetch("/api/products"), fetch("/api/categories")])

      
      const productsData = await productsRes.json()
      const categoriesData = await categoriesRes.json()

      console.log("product response ", productsData, "category response", categoriesData)
      setProducts(productsData)
      setCategories(categoriesData.categories)
    } catch (error) {
      // toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.name.trim() || !formData.categoryId || !formData.basePrice) {
      // toast({ title: "Error", description: "Fill in all required fields", variant: "destructive" })
      return
    }

    if (formData.variants.length === 0) {
      // toast({ title: "Error", description: "Add at least one variant", variant: "destructive" })
      return
    }

    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/products/${editingId}` : "/api/products"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          basePrice: Number.parseFloat(formData.basePrice),
          categoryId: Number.parseInt(formData.categoryId),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      setFormData({ name: "", description: "", basePrice: "", categoryId: "", variants: [], images: [] })
      setEditingId(null)
      setOpen(false)
      fetchData()
      // toast({ title: "Success", description: editingId ? "Product updated" : "Product created" })
    } catch (error: any) {
      // toast({ title: "Error", description: error.message, variant: "destructive" })
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      fetchData()
      // toast({ title: "Success", description: "Product deleted" })
    } catch (error: any) {
      // toast({ title: "Error", description: error.message, variant: "destructive" })
    }
  }

  function handleEdit(product: Product) {
    setFormData({
      name: product.name,
      description: product.description || "",
      basePrice: product.basePrice,
      categoryId: product.categoryId.toString(),
      variants: product.variants || [],
      images: product.images || [],
    })
    setEditingId(product.id)
    setOpen(true)
  }

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen)
    if (!newOpen) {
      setFormData({ name: "", description: "", basePrice: "", categoryId: "", variants: [], images: [] })
      setEditingId(null)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your product catalog with variants and images</CardDescription>
        </div>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Product name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-20"
              />
              <Input
                type="number"
                placeholder="Base price *"
                step="0.01"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              />
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category *" />
                </SelectTrigger>
                <SelectContent>
                  {categories && categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <VariantManager
                variants={formData.variants}
                onVariantsChange={(variants) => setFormData({ ...formData, variants })}
              />

              <ImageManager
                images={formData.images}
                onImagesChange={(images) => setFormData({ ...formData, images })}
              />

              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading products...</p>
        ) : products?.length === 0 ? (
          <p className="text-muted-foreground">No products yet</p>
        ) : (
          <div className="rounded-lg border overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Variants</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        {product.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.categoryName}</TableCell>
                    <TableCell>${Number.parseFloat(product.basePrice).toFixed(2)}</TableCell>
                    <TableCell className="text-sm">{product.variants?.length || 0} variant(s)</TableCell>
                    <TableCell className="text-sm">{product.images?.length || 0} image(s)</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(product)} className="h-8 w-8 p-0">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
