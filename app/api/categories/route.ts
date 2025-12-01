import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    })

    return NextResponse.json(
      { message: "Categories fetched successfully", categories },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 },
      )
    }

    const existingCategory = await prisma.category.findUnique({
      where: { name },
    })

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category name already exists" },
        { status: 409 },
      )
    }

    // Create category
    const category = await prisma.category.create({
      data: { name },
    })

    return NextResponse.json(
      {
        message: "Category created successfully",
        category: { id: category.id, name: category.name },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
