"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Star } from "lucide-react"

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
  const v = perfume.variants[0]
  const price = v ? Number(v.price) : 0
  const comparePrice = v?.comparePrice ? Number(v.comparePrice) : null
  const prefersReduced = useReducedMotion()

  return (
    <Link
      href={`/perfume/${perfume.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded-sm"
      aria-label={`${perfume.name} de ${perfume.brand.name}`}
    >
      <article className="flex flex-col">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-5 rounded-sm">
          {v?.imageUrl ? (
            <motion.img
              src={v.imageUrl}
              alt={perfume.name}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={prefersReduced ? {} : { scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-6xl text-muted-foreground/20 select-none">
                {perfume.brand.name[0]}
              </span>
            </div>
          )}
          {v?.stock === 0 && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground bg-background/90 px-4 py-2 rounded-sm">
                Agotado
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-0.5">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2">
            {perfume.brand.name}
          </p>
          <h3 className="font-serif text-lg leading-snug text-foreground group-hover:text-primary transition-colors duration-200 mb-3">
            {perfume.name}
          </h3>

          <div className="flex items-center gap-1.5 mt-auto">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-3 ${i < Math.round(perfume.averageRating) ? "fill-[#C9A96E] text-[#C9A96E]" : "text-border"}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">{perfume.reviewCount}</span>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-semibold text-foreground">
              ${price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
            {comparePrice && comparePrice > price && (
              <span className="text-xs text-muted-foreground line-through">
                ${comparePrice.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
