"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { useToast } from "@/hooks/use-toast"

interface Category {
  id: number
  name: string
  images: { id: number; url: string; alt?: string | null }[]
  videoUrl?: string | null
}

export function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  console.log("categories :", categories)

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    videoUrl: "",
  })

  // const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      console.log("data :", data)
      setCategories(data.categories)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleImageUpload() {
    if (!imageFile) return null

    const body = new FormData()
    body.append("file", imageFile)

    const res = await fetch("/api/upload", {
      method: "POST",
      body,
    })

    const data = await res.json()
    return data.url
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.name.trim()) return

    let finalImageUrl = formData.imageUrl

    if (imageFile) {
      const uploadedUrl = await handleImageUpload()
      if (uploadedUrl) finalImageUrl = uploadedUrl
    }

    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/categories/${editingId}` : "/api/categories"

    const payload = {
      name: formData.name,
      videoUrl: formData.videoUrl,
      images: finalImageUrl ? [{ url: finalImageUrl }] : [],
    }

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Failed to save category")
      return
    }

    setFormData({ name: "", imageUrl: "", videoUrl: "" })
    setEditingId(null)
    setOpen(false)
    setImageFile(null)
    setPreview(null)
    fetchCategories()
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this category?")) return

    await fetch(`/api/categories/${id}`, { method: "DELETE" })
    fetchCategories()
  }

  function handleEdit(category: Category) {
    setFormData({
      name: category.name,
      imageUrl: category.images?.[0]?.url || "",
      videoUrl: category.videoUrl || "",
    })
    setEditingId(category.id)
    setOpen(true)
  }

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen)
    if (!newOpen) {
      if (!newOpen) {
        setFormData({ name: "", imageUrl: "", videoUrl: "" })
        setEditingId(null)
      }
      setEditingId(null)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage product categories</CardDescription>
        </div>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Category" : "Add Category"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Category name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null
                    setImageFile(file)

                    if (file) {
                      const url = URL.createObjectURL(file)
                      setPreview(url)
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Or paste image URL</label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, imageUrl: e.target.value })
                    setPreview(e.target.value)
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Video URL (Optional)</label>
                <Input
                  placeholder="https://example.com/video.mp4"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                />
              </div>

              {preview && (
                <img
                  src={preview}
                  className="w-full h-40 object-cover rounded border"
                  alt="Preview"
                />
              )}


              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-muted-foreground">No categories yet</p>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {category.images?.[0]?.url ? (
                        <img
                          src={category.images[0].url}
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </TableCell>

                    <TableCell>{category.name}</TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                          className="text-destructive hover:bg-destructive/10"
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
