import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const imagesDir = path.join(process.cwd(), "public", "images")
    await mkdir(imagesDir, { recursive: true })

    const filename =
      Date.now() +
      "-" +
      file.name.replace(/\s+/g, "_").toLowerCase()

    const filepath = path.join(imagesDir, filename)

    await writeFile(filepath, buffer)

    const url = `/images/${filename}`

    return NextResponse.json({ url })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
