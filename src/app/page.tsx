import Link from "next/link"
import { prisma } from "@/lib/db"
import { serializeData } from "@/lib/utils"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { PerfumeCard } from "@/components/catalog/perfume-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react"
import { Reveal } from "@/components/animations/reveal"
import { HeroSection } from "@/components/sections/hero-section"

async function getFeaturedPerfumes() {
  const perfumes = await prisma.perfume.findMany({
    take: 8,
    include: {
      brand: true,
      family: true,
      variants: { where: { isAvailable: true }, orderBy: { price: "asc" } },
      reviews: { select: { rating: true } },
    },
    orderBy: { createdAt: "desc" },
  })
  return perfumes.map((p) =>
    serializeData({
      ...p,
      averageRating: p.reviews.length
        ? Math.round((p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length) * 10) / 10
        : 0,
      reviewCount: p.reviews.length,
    })
  )
}

export default async function HomePage() {
  const featured = await getFeaturedPerfumes()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1" id="main-content">
        {/* HERO — Full-bleed editorial */}
        <HeroSection />

        {/* TRUST BAR */}
        <section className="border-y border-border bg-card/60">
          <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
              {[
                { icon: ShieldCheck, label: "Autenticidad Garantizada", desc: "Cada fragancia es 100% original" },
                { icon: Truck, label: "Envío Express", desc: "Entrega en 24-48 horas" },
                { icon: RotateCcw, label: "30 Días de Prueba", desc: "Devolución sin preguntas" },
                { icon: ShieldCheck, label: "Atención Personalizada", desc: "Asesoría por expertos" },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3 px-6 py-6 lg:px-8 lg:py-7">
                    <item.icon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PERFUMES */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <Reveal>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">
                    Selección del Mes
                  </p>
                  <h2 className="font-serif text-4xl lg:text-5xl text-foreground leading-none">
                    Fragancias
                    <br />
                    <span className="italic font-normal gold-gradient">Destacadas</span>
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <Link href="/catalogo">
                  <Button variant="outline" className="rounded-full border-border hover:bg-secondary">
                    Ver Colección Completa
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </Reveal>
            </div>

            {featured.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {featured.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.06}>
                    <PerfumeCard perfume={p as any} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p className="font-serif text-2xl mb-2">Colección en preparación</p>
                <p className="text-sm">Nuestros maestros perfumistas están seleccionando las mejores fragancias.</p>
              </div>
            )}
          </div>
        </section>

        {/* BRAND SHOWCASE — Editorial grid */}
        <section className="py-12 lg:py-16 bg-card/60 border-y border-border">
          <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {["Chanel", "Dior", "Creed", "Tom Ford", "YSL", "Hermès", "Le Labo", "Byredo"].map((brand, i) => (
                <div key={brand} className="bg-card py-10 flex items-center justify-center">
                  <Reveal delay={i * 0.05}>
                    <span className="font-serif text-xl tracking-[0.2em] uppercase text-muted-foreground/40 hover:text-foreground transition-colors cursor-default select-none">
                      {brand}
                    </span>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES — Dramatic split */}
        <section className="py-24 lg:py-32 texture-paper">
          <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Explora
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl text-foreground leading-none mb-16">
                Por Categoría
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: "/catalogo?gender=MASCULINO", label: "Para Él", desc: "Fragancias masculinas", img: "https://images.unsplash.com/photo-1588701607060-4104b1776b62?w=800&q=80" },
                { href: "/catalogo?gender=FEMENINO", label: "Para Ella", desc: "Fragancias femeninas", img: "https://images.unsplash.com/photo-1565843708714-52ecf69ab0f0?w=800&q=80" },
                { href: "/catalogo", label: "Nichos & Exclusivos", desc: "Ediciones limitadas", img: "https://images.unsplash.com/photo-1594035910387-fae6c6c2abda?w=800&q=80" },
              ].map((cat, i) => (
                <Reveal key={cat.label} delay={i * 0.1}>
                  <Link href={cat.href} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4">
                      <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-serif text-2xl text-white">{cat.label}</h3>
                        <p className="text-sm text-white/70 mt-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {cat.desc}
                          <ArrowRight className="size-3.5" />
                        </p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* QUIZ CTA */}
        <section className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] noise" />
          <div className="container mx-auto px-6 lg:px-16 max-w-[1400px] relative z-10">
            <div className="max-w-2xl">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-background/50 mb-4">
                  Guía Personalizada
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl text-background leading-none mb-6">
                  Encuentra tu
                  <br />
                  <span className="italic font-normal">fragancia ideal</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base text-background/60 leading-relaxed mb-8 max-w-lg font-light">
                  Responde nuestro quiz olfativo y descubre las 3 fragancias perfectas para tu personalidad y estilo.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <Link href="/quiz-olfativo">
                  <button className="px-8 py-4 bg-background text-foreground rounded-full text-sm font-medium tracking-wide hover:bg-background/90 transition-colors inline-flex items-center gap-2 group">
                    Iniciar Quiz
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
