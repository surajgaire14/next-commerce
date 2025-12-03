"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductImage {
  url: string
  alt?: string
}

interface ImageManagerProps {
  images: ProductImage[]
  onImagesChange: (images: ProductImage[]) => void
}

export function ImageManager({ images, onImagesChange }: ImageManagerProps) {
  const [newImage, setNewImage] = useState<ProductImage>({ url: "", alt: "" })

  function addImage(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (!newImage.url.trim()) {
      return
    }

    onImagesChange([...images, { url: newImage.url, alt: newImage.alt || "" }])
    setNewImage({ url: "", alt: "" })
  }

  function removeImage(index: number) {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Product Images</CardTitle>
        <CardDescription>Add images for this product</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Image URL"
            value={newImage.url}
            onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
          />
          <Input
            placeholder="Alt text (optional)"
            value={newImage.alt || ""}
            onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
          />
          <Button onClick={addImage} className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Add Image
          </Button>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {images.map((image, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden border">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || `Product image ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeImage(index)}
                    className="text-destructive hover:bg-destructive/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {image.alt && <p className="text-xs text-muted-foreground p-1 truncate">{image.alt}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
