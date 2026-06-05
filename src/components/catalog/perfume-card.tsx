"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Star, Check } from "lucide-react"
import { useState, useCallback } from "react"

interface PerfumeCardProps {
  perfume: {
    id: string
    name: string
    slug: string
    brand: { name: string }
    family?: { name: string }
    concentration: string
    gender: string
    isVerified: boolean
    averageRating: number
    reviewCount: number
    variants: {
      id: string
      sizeMl: number
      price: number
      comparePrice?: number
      imageUrl: string | null
      stock: number
    }[]
  }
}

export function PerfumeCard({ perfume }: PerfumeCardProps) {
  const firstVariant = perfume.variants[0]
  const price = firstVariant ? Number(firstVariant.price) : 0
  const comparePrice = firstVariant?.comparePrice ? Number(firstVariant.comparePrice) : null
  const familyName = perfume.family?.name || "default"
  const imageUrl = firstVariant?.imageUrl

  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    setRotate({ x: rotateX, y: rotateY })
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50 })
  }, [])

  return (
    <Link href={`/perfume/${perfume.slug}`} className="group block">
      <motion.div
        className="bg-white rounded-xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-xl hover:shadow-zinc-200/30 transition-all duration-300 h-full flex flex-col relative"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glare overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
          }}
        />

        {/* Image area */}
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={perfume.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 relative">
              <span className="text-6xl font-bold text-zinc-200/80 select-none">
                {perfume.brand.name[0]}
              </span>
              <div className="absolute top-6 right-6 w-16 h-16 border border-zinc-200/50 rounded-full" />
              <div className="absolute bottom-8 left-8 w-10 h-10 border border-zinc-200/30 rounded-full" />
            </div>
          )}

          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Family color indicator dot */}
          <div className="absolute top-3 left-3">
            <div
              className="w-2.5 h-2.5 rounded-full ring-2 ring-white/80"
              style={{ backgroundColor: getFamilyColor(familyName) }}
            />
          </div>

          {/* Verified badge */}
          {perfume.isVerified && (
            <Badge
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border-0 text-xs font-medium text-zinc-700 shadow-sm"
            >
              <Check className="w-3 h-3 mr-1 text-emerald-600" />
              Auténtico
            </Badge>
          )}

          {/* Stock overlay */}
          {firstVariant?.stock === 0 && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="secondary" className="bg-zinc-900 text-white border-0 text-sm px-3 py-1">
                Agotado
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            {/* Brand + Family */}
            <div className="flex items-center gap-2 mb-1.5">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                {perfume.brand.name}
              </p>
              <span className="text-zinc-200">·</span>
              <p className="text-[11px] text-zinc-400">
                {familyName}
              </p>
            </div>

            {/* Name */}
            <h3 className="font-semibold text-zinc-950 text-[15px] leading-snug group-hover:text-emerald-700 transition-colors duration-200">
              {perfume.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(perfume.averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-zinc-600">{perfume.averageRating}</span>
              <span className="text-xs text-zinc-400">({perfume.reviewCount})</span>
            </div>
          </div>

          {/* Price + Concentration */}
          <div className="flex items-end justify-between mt-4 pt-3 border-t border-zinc-50">
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-lg font-bold text-zinc-950">
                  ${price.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                {comparePrice && comparePrice > price && (
                  <p className="text-xs text-zinc-400 line-through">
                    ${comparePrice.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </p>
                )}
              </div>
              {firstVariant && (
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {firstVariant.sizeMl}ml
                </p>
              )}
            </div>
            <Badge variant="outline" className="text-[10px] font-normal rounded-full border-zinc-200 text-zinc-500 bg-transparent">
              {formatConcentration(perfume.concentration)}
            </Badge>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function getFamilyColor(familyName: string): string {
  const colors: Record<string, string> = {
    "Cítrica": "#F59E0B",
    "Floral": "#EC4899",
    "Oriental": "#D97706",
    "Amaderada": "#92400E",
    "Fougère": "#059669",
    "Chipre": "#6B7280",
    "Cuero": "#451A03",
    "Frutal": "#E11D48",
    "Acuática": "#0EA5E9",
  }
  return colors[familyName] || "#10B981"
}

function formatConcentration(c: string): string {
  const map: Record<string, string> = {
    EAU_DE_COLOGNE: "Eau de Cologne",
    EAU_DE_TOILETTE: "Eau de Toilette",
    EAU_DE_PARFUM: "Eau de Parfum",
    PARFUM: "Parfum",
    EXTRAIT: "Extrait",
  }
  return map[c] || c.replace(/_/g, " ")
}
