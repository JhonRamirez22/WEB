import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const families = await prisma.olfactoryFamily.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { perfumes: true },
        },
      },
    })

    return NextResponse.json(families)
  } catch (error) {
    console.error("Error fetching families:", error)
    return NextResponse.json(
      { error: "Error al obtener familias olfativas" },
      { status: 500 }
    )
  }
}
