import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const perfume = await prisma.perfume.findUnique({
      where: { slug },
      include: {
        brand: true,
        family: true,
        variants: {
          where: { isAvailable: true },
          orderBy: { sizeMl: "asc" },
        },
        perfumeNotes: {
          include: {
            note: true,
          },
          orderBy: {
            position: "asc",
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!perfume) {
      return NextResponse.json(
        { error: "Perfume no encontrado" },
        { status: 404 }
      )
    }

    // Group notes by position
    const notesByPosition = {
      SALIDA: perfume.perfumeNotes.filter((n) => n.position === "SALIDA"),
      CORAZON: perfume.perfumeNotes.filter((n) => n.position === "CORAZON"),
      FONDO: perfume.perfumeNotes.filter((n) => n.position === "FONDO"),
    }

    const avgRating =
      perfume.reviews.length > 0
        ? perfume.reviews.reduce((sum, r) => sum + r.rating, 0) /
          perfume.reviews.length
        : 0

    return NextResponse.json({
      ...perfume,
      notesByPosition,
      averageRating: Math.round(avgRating * 10) / 10,
    })
  } catch (error) {
    console.error("Error fetching perfume:", error)
    return NextResponse.json(
      { error: "Error al obtener perfume" },
      { status: 500 }
    )
  }
}
