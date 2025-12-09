import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { images: true },
    });

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
    const body = await request.json();
    const { name, images, videoUrl } = body ?? {};
    console.log("POST body :", { name, images, videoUrl });

    if (!name || name.trim() === "") {
      return NextResponse.json({ message: "Category name is required" }, { status: 400 });
    }

    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory) {
      return NextResponse.json({ message: "Category name already exists" }, { status: 409 });
    }

    const imageData =
      Array.isArray(images) && images.length > 0
        ? images
          .filter((img: any) => img && typeof img.url === "string" && img.url.trim() !== "")
          .map((img: any) => ({ url: img.url.trim(), alt: img.alt ?? null }))
        : [];

    const category = await prisma.category.create({
      data: {
        name,
        videoUrl: videoUrl || null,
        images: imageData.length > 0 ? { create: imageData } : undefined,
      },
      include: { images: true },
    });

    console.log("Created category:", category);

    return NextResponse.json(
      { message: "Category created successfully", category },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    // return the error message in dev only if you want more visibility:
    return NextResponse.json({ message: "Internal server error", error: String(error) }, { status: 500 });
  }
}


