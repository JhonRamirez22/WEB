import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { PerfumeDetailContent } from "./perfume-detail-content"

async function getPerfume(slug: string) {
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
        include: { note: true },
        orderBy: { position: "asc" },
      },
      reviews: {
        include: {
          user: { select: { name: true, image: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!perfume) return null

  const notesByPosition = {
    SALIDA: perfume.perfumeNotes.filter((n) => n.position === "SALIDA"),
    CORAZON: perfume.perfumeNotes.filter((n) => n.position === "CORAZON"),
    FONDO: perfume.perfumeNotes.filter((n) => n.position === "FONDO"),
  }

  const avgRating =
    perfume.reviews.length > 0
      ? Math.round((perfume.reviews.reduce((sum, r) => sum + r.rating, 0) / perfume.reviews.length) * 10) / 10
      : 0

  return {
    ...perfume,
    notesByPosition,
    averageRating: avgRating,
  }
}

export default async function PerfumeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const perfume = await getPerfume(slug)

  if (!perfume) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CartDrawer />

      <main className="flex-1 container mx-auto px-4 py-8">
        <PerfumeDetailContent perfume={perfume} />
      </main>

      <Footer />
    </div>
  )
}
