import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id)
    const { name } = await request.json()

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 },
      )
    }

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      )
    }

    // Check if name already exists (other than current category)
    const nameExists = await prisma.category.findUnique({
      where: { name },
    })

    if (nameExists && nameExists.id !== id) {
      return NextResponse.json(
        { message: "Category name already exists" },
        { status: 409 },
      )
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    })

    return NextResponse.json(
      { message: "Category updated successfully", category: updatedCategory },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id)

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id },
    })

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      )
    }

    // Check if category has products
    const productCount = await prisma.product.count({
      where: { categoryId: id },
    })

    if (productCount > 0) {
      return NextResponse.json(
        {
          message:
            "Cannot delete category because products are associated with it",
        },
        { status: 400 },
      )
    }

    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
