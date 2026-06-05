"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="min-h-[100dvh] flex items-center relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-50" />
      <div className="absolute inset-0 opacity-[0.03] noise" />

      <div className="container mx-auto px-4 lg:px-12 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge 
              variant="secondary" 
              className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-xs tracking-wide uppercase"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Nueva Colección 2024
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-zinc-950">
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

          {/* Right: Visual */}
          <motion.div
            className="relative aspect-[4/5] lg:aspect-square"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-zinc-100 to-zinc-200/50 rounded-3xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[12rem] md:text-[16rem] font-bold text-zinc-200/60 select-none">
                L&apos;E
              </span>
            </div>
            {/* Decorative rings */}
            <div className="absolute top-8 right-8 w-24 h-24 border border-emerald-200/40 rounded-full" />
            <div className="absolute bottom-12 left-12 w-16 h-16 border border-zinc-200/60 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
