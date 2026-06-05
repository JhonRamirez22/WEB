"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"

export default function SobreNosotrosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Header />
      <CartDrawer />
      <main className="flex-1 container mx-auto px-4 lg:px-12 py-20 max-w-[1400px]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-950 mb-6">Sobre L'Essence</h1>

          <div className="prose prose-zinc max-w-none space-y-6">
            <p className="text-lg text-zinc-600 leading-relaxed">
              L'Essence nace de la pasión por la perfumería de lujo. Somos una plataforma dedicada
              a conectar a los amantes de las fragancias con las creaciones más exclusivas del mundo.
            </p>

            <Card className="rounded-xl border-zinc-100 not-prose my-8">
              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {[
                  { value: "100%", label: "Autenticidad Garantizada" },
                  { value: "12+", label: "Marcas de Lujo" },
                  { value: "24h", label: "Entrega Express" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-emerald-600">{s.value}</p>
                    <p className="text-sm text-zinc-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold text-zinc-950 mt-10">Nuestra Misión</h2>

            <p className="text-zinc-600 leading-relaxed">
              Creemos que cada persona merece encontrar su esencia perfecta. Por eso, seleccionamos
              meticulosamente cada perfume, trabajando directamente con las casas de perfumería más
              prestigiosas del mundo.
            </p>

            <h2 className="text-2xl font-bold text-zinc-950 mt-10">Autenticidad</h2>

            <p className="text-zinc-600 leading-relaxed">
              Cada fragancia en nuestro catálogo es 100% original y auténtica. Nuestro sistema de
              verificación garantiza que recibas exactamente lo que esperas: calidad, longevidad
              y la experiencia olfativa más pura.
            </p>

            <div className="flex gap-4 pt-4">
              <Link href="/catalogo">
                <Button className="bg-emerald-600 hover:bg-emerald-500 rounded-full">
                  Explorar Catálogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
