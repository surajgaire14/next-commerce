import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    const formatted = products.map((p) => ({
      ...p,
      categoryName: p.category?.name ?? null,
    }))

    return NextResponse.json(
      { message: "Products fetched successfully", products: formatted },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, basePrice, categoryId } = await request.json()

    if (!name || !categoryId || basePrice === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      )
    }

    // Validate category exists
    const category = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    })

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        basePrice,
        categoryId: Number(categoryId),
      },
    })

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    )
  }
}
