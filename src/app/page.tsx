import Link from "next/link"
import { prisma } from "@/lib/db"
import { serializeData } from "@/lib/utils"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { PerfumeCard } from "@/components/catalog/perfume-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react"
import { Reveal } from "@/components/animations/reveal"
import { HeroSection } from "@/components/sections/hero-section"

async function getFeaturedPerfumes() {
  const perfumes = await prisma.perfume.findMany({
    take: 6,
    include: {
      brand: true,
      family: true,
      variants: {
        where: { isAvailable: true },
        orderBy: { price: "asc" },
      },
      reviews: { select: { rating: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return perfumes.map((p) => serializeData({
    ...p,
    averageRating: p.reviews.length > 0
      ? Math.round((p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length) * 10) / 10
      : 0,
    reviewCount: p.reviews.length,
  }))
}

export default async function HomePage() {
  const featuredPerfumes = await getFeaturedPerfumes()

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Header />
      <CartDrawer />

      <main className="flex-1" id="main-content">
        {/* HERO — Split-screen layout with motion */}
        <HeroSection />

        {/* TRUST BAR — Under hero, NOT inside it */}
        <section className="border-y border-zinc-200 bg-white">
          <div className="container mx-auto px-4 lg:px-12 max-w-[1400px]">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-100">
              {[
                { icon: ShieldCheck, label: "100% Auténtico", desc: "Garantía de originalidad" },
                { icon: Truck, label: "Envío Rápido", desc: "24-48 horas" },
                { icon: RotateCcw, label: "Devolución 30 Días", desc: "Satisfacción garantizada" },
                { icon: Sparkles, label: "Experiencia Premium", desc: "Atención personalizada" },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.1}>
                  <div className="flex items-start gap-3 p-6 lg:p-8">
                    <item.icon className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-zinc-900">{item.label}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED — Asymmetric header + grid */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-12 max-w-[1400px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <Reveal>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
                    Fragancias Destacadas
                  </h2>
                  <p className="text-zinc-500 mt-3 max-w-md leading-relaxed">
                    Nuestras piezas más codiciadas, seleccionadas por su arte y longevidad.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <Link href="/catalogo">
                  <Button 
                    variant="outline" 
                    className="rounded-full border-zinc-200 hover:bg-zinc-100"
                  >
                    Ver Todo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Reveal>
            </div>
            
            {featuredPerfumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPerfumes.map((perfume, i) => (
                  <Reveal key={perfume.id} delay={i * 0.08}>
                    <PerfumeCard perfume={perfume as any} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-400">
                No hay perfumes disponibles en este momento.
              </div>
            )}
          </div>
        </section>

        {/* CATEGORIES — Split layout, NOT centered cards */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 lg:px-12 max-w-[1400px]">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 mb-16">
                Explora por Categoría
              </h2>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  href: "/catalogo?gender=MASCULINO", 
                  label: "Para Él", 
                  desc: "Fragancias masculinas sofisticadas",
                  bg: "from-slate-900 to-slate-800"
                },
                { 
                  href: "/catalogo?gender=FEMENINO", 
                  label: "Para Ella", 
                  desc: "Fragancias femeninas elegantes",
                  bg: "from-rose-900 to-rose-800"
                },
                { 
                  href: "/catalogo", 
                  label: "Perfumes de Nicho", 
                  desc: "Fragancias exclusivas y artesanales",
                  bg: "from-emerald-900 to-emerald-800"
                },
              ].map((cat, i) => (
                <Reveal key={cat.label} delay={i * 0.1}>
                  <Link href={cat.href}>
                    <div className={`group relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br ${cat.bg} transition-transform duration-500 hover:scale-[1.02]`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                      
                      {/* Decorative circle */}
                      <div className="absolute -top-12 -right-12 w-48 h-48 border border-white/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-white/5 rounded-full" />
                      
                      <div className="absolute bottom-8 left-8 text-white">
                        <h3 className="text-2xl font-bold mb-2">{cat.label}</h3>
                        <p className="text-sm text-white/70">{cat.desc}</p>
                        <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm font-medium">Explorar</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* QUIZ CTA — Full-bleed color block */}
        <section className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.02] noise" />
          
          <div className="container mx-auto px-4 lg:px-12 max-w-[1400px] relative z-10">
            <div className="max-w-2xl">
              <Reveal>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                  ¿No sabes qué perfume elegir?
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg">
                  Responde nuestro quiz olfativo y descubre las 3 fragancias 
                  perfectas para tu personalidad y estilo de vida.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <Link href="/quiz-olfativo">
                  <Button 
                    size="lg" 
                    className="bg-emerald-600 text-white hover:bg-emerald-500 rounded-full px-8"
                  >
                    Iniciar Quiz Olfativo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
