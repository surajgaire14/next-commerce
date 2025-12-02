import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
   context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await context.params
    const id = Number(idStr)
    const { name, description, basePrice, categoryId } = await request.json()

    if (!name || !categoryId || basePrice === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({ where: { id } })
    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      )
    }

    // Validate category
    const category = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    })
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      )
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description: description || null,
        basePrice,
        categoryId: Number(categoryId),
      },
    })

    return NextResponse.json(
      {
        message: "Product updated successfully",
        product: updatedProduct,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { message: "Failed to update product" },
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

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      )
    }

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    )
  }
}
