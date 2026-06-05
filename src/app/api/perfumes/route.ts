import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const brand = searchParams.get("brand")
    const family = searchParams.get("family")
    const concentration = searchParams.get("concentration")
    const gender = searchParams.get("gender")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const inStock = searchParams.get("inStock")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")

    const skip = (page - 1) * limit

    const where: any = {}

    if (brand) {
      where.brand = { slug: brand }
    }

    if (family) {
      where.family = { slug: family }
    }

    if (concentration) {
      where.concentration = concentration.toUpperCase().replace(/-/g, "_")
    }

    if (gender) {
      where.gender = gender.toUpperCase()
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { brand: { name: { contains: search, mode: "insensitive" } } },
      ]
    }

    if (inStock === "true") {
      where.variants = {
        some: {
          stock: { gt: 0 },
          isAvailable: true,
        },
      }
    }

    const [perfumes, total] = await Promise.all([
      prisma.perfume.findMany({
        where,
        include: {
          brand: true,
          family: true,
          variants: {
            where: { isAvailable: true },
            orderBy: { price: "asc" },
          },
          perfumeNotes: {
            include: {
              note: true,
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.perfume.count({ where }),
    ])

    // Calculate average rating
    const perfumesWithRating = perfumes.map((perfume) => {
      const avgRating =
        perfume.reviews.length > 0
          ? perfume.reviews.reduce((sum, r) => sum + r.rating, 0) /
            perfume.reviews.length
          : 0

      return {
        ...perfume,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: perfume.reviews.length,
        reviews: undefined,
      }
    })

    return NextResponse.json({
      perfumes: perfumesWithRating,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching perfumes:", error)
    return NextResponse.json(
      { error: "Error al obtener perfumes" },
      { status: 500 }
    )
  }
}
