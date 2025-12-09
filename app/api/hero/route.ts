import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const heroes = await prisma.hero.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(
            { message: "Heroes fetched successfully", heroes },
            { status: 200 },
        )
    } catch (error) {
        console.error("Error fetching heroes:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, subtitle, videoUrl, imageUrl, link, buttonText, isActive } = body ?? {};

        if (!title) {
            return NextResponse.json({ message: "Title is required" }, { status: 400 });
        }

        // If setting as active, deactivate others (optional logic, but good for single hero)
        if (isActive) {
            await prisma.hero.updateMany({
                where: { isActive: true },
                data: { isActive: false }
            });
        }

        const hero = await prisma.hero.create({
            data: {
                title,
                subtitle,
                videoUrl,
                imageUrl,
                link,
                buttonText,
                isActive: isActive || false,
            },
        });

        return NextResponse.json(
            { message: "Hero created successfully", hero },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating hero:", error);
        return NextResponse.json({ message: "Internal server error", error: String(error) }, { status: 500 });
    }
}
