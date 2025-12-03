import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { name: true },
        },
        variants: true,
        images: true,
      },
    })

    // Transform to match the SQL output format
    const formatted = products.map((p) => ({
      ...p,
      categoryName: p.category?.name || null,
      variants: p.variants || [],
      images: p.images || [],
      category: undefined, // remove category object from output
    }))

    return Response.json(formatted)
  } catch (error) {
    console.error("Error fetching products:", error)
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}


export async function POST(request: NextRequest) {
  try {
    const { name, description, basePrice, categoryId, variants, images } =
      await request.json()

    // Validate required fields
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

    // Create product with optional variants & images
    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        basePrice,
        categoryId: Number(categoryId),

        // Create variants if provided
        variants: variants?.length
          ? {
              create: variants.map((v: any) => ({
                size: v.size,
                color: v.color,
                sku: v.sku,
                stock: v.stock ?? 0,
                price: v.price ?? null,
              })),
            }
          : undefined,

        // Create images if provided
        images: images?.length
          ? {
              create: images.map((img: any) => ({
                url: img.url,
                alt: img.alt || null,
              })),
            }
          : undefined,
      },

      // Include created variants & images in the response
      include: {
        variants: true,
        images: true,
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
