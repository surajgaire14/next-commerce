import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import fs from "fs/promises"
import path from "path"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await context.params
    const id = Number(idStr)
    const { name, images } = await request.json()

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 }
      )
    }

    const existing = await prisma.category.findUnique({
      where: { id },
      include: { images: true },
    })

    if (!existing) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      )
    }

    const duplicate = await prisma.category.findUnique({
      where: { name },
    })

    if (duplicate && duplicate.id !== id) {
      return NextResponse.json(
        { message: "Category name already exists" },
        { status: 409 }
      )
    }

    const newImageUrls = new Set(
      Array.isArray(images) ? images.map((img: any) => img.url) : []
    )

    for (const img of existing.images) {
      if (!newImageUrls.has(img.url) && img.url.startsWith("/images/")) {
        const filePath = path.join(process.cwd(), "public", img.url)
        try {
          await fs.unlink(filePath)
        } catch {
          // File may already be deleted or missing
        }
      }
    }

    await prisma.categoryImage.deleteMany({
      where: { categoryId: id },
    })

    const newImages = Array.isArray(images)
      ? images.map((img: any) => ({
        url: img.url,
        alt: img.alt ?? null,
      }))
      : []

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        images: {
          create: newImages,
        },
      },
      include: { images: true },
    })

    return NextResponse.json(
      { message: "Category updated successfully", category: updatedCategory },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await context.params
    const id = Number(idStr)

    const category = await prisma.category.findUnique({
      where: { id },
      include: { images: true },
    })

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      )
    }

    // Cannot delete category with linked products
    const productCount = await prisma.product.count({
      where: { categoryId: id },
    })

    if (productCount > 0) {
      return NextResponse.json(
        {
          message:
            "Cannot delete category because products are associated with it",
        },
        { status: 400 }
      )
    }

    for (const img of category.images) {
      if (img.url.startsWith("/images/")) {
        const filePath = path.join(process.cwd(), "public", img.url)
        try {
          await fs.unlink(filePath)
        } catch {
          // ignore missing file
        }
      }
    }

    await prisma.categoryImage.deleteMany({
      where: { categoryId: id },
    })

    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

