"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const heroImages = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
  "https://images.unsplash.com/photo-1565843708714-52ecf69ab0f0?w=800&q=80",
  "https://images.unsplash.com/photo-1594035910387-fae6c6c2abda?w=800&q=80",
  "https://images.unsplash.com/photo-1523293182086-38f79cf89a5b?w=800&q=80",
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [prefersReduced])

  return (
    <section className="min-h-[100dvh] flex items-center relative overflow-hidden">
      {/* Background gradient + texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-50" />
      <div className="absolute inset-0 opacity-[0.03] noise" />

      <div className="container mx-auto px-4 lg:px-12 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            className="space-y-8"
            initial={prefersReduced ? {} : { opacity: 0, x: -40 }}
            animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-xs tracking-wide uppercase"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Nueva Colección 2024
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-zinc-950 font-serif">
              Descubre tu{" "}
              <span className="text-emerald-600">Esencia</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-[55ch]">
              Perfumería de lujo con las fragancias más exclusivas del mundo.
              Autenticidad garantizada en cada botella.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalogo">
                <Button
                  size="lg"
                  className="bg-zinc-950 text-white hover:bg-zinc-800 rounded-full px-8"
                >
                  Explorar Catálogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/quiz-olfativo">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 border-zinc-200 hover:bg-zinc-100"
                >
                  Quiz Olfativo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual - Image carousel */}
          <motion.div
            className="relative aspect-[4/5] lg:aspect-square"
            initial={prefersReduced ? {} : { opacity: 0, x: 40 }}
            animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main image with crossfade */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-zinc-100">
              {heroImages.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt={`Perfume ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === currentImage ? 1 : 0 }}
                  transition={{ duration: prefersReduced ? 0 : 1 }}
                />
              ))}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/20 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-16 h-16 border border-white/30 rounded-full" />
            <div className="absolute bottom-12 left-12 w-12 h-12 border border-white/20 rounded-full" />

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentImage ? "bg-white w-5" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
