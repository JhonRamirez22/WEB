"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { useState, useEffect } from "react"
import { ArrowRight, Sparkles } from "lucide-react"

const heroImages = [
  { src: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1400&q=85", position: "center 30%" },
  { src: "https://images.unsplash.com/photo-1565843708714-52ecf69ab0f0?w=1400&q=85", position: "center 40%" },
  { src: "https://images.unsplash.com/photo-1594035910387-fae6c6c2abda?w=1400&q=85", position: "center 35%" },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const t = setInterval(() => setCurrent((p) => (p + 1) % heroImages.length), 6000)
    return () => clearInterval(t)
  }, [prefersReduced])

  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 lg:pb-32 overflow-hidden">
      {/* Full-bleed image layer */}
      <div className="absolute inset-0">
        {heroImages.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: prefersReduced ? 0 : 1.5, ease: "easeInOut" }}
          >
            <img
              src={img.src}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: img.position }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 max-w-[1400px] relative z-10">
        <motion.div
          className="max-w-2xl"
          initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50"
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
            animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Sparkles className="size-3.5 text-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
              Colección Exclusiva
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-foreground mb-6">
            El arte de
            <br />
            <span className="italic font-normal">la perfumería</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-10 font-light">
            Fragancias de nicho seleccionadas por maestros perfumistas. Cada esencia, una obra maestra. Cada frasco, una declaración.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/catalogo">
              <motion.button
                className="px-8 py-4 bg-foreground text-background rounded-full text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors inline-flex items-center gap-2 group"
                whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Descubrir Colección
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/quiz-olfativo">
              <motion.button
                className="px-8 py-4 rounded-full text-sm font-medium tracking-wide border border-border hover:bg-secondary transition-colors"
                whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Encuentra tu Esencia
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 right-8 lg:right-16 flex gap-3 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === current ? "bg-foreground w-6" : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
