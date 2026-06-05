import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, ShieldCheck, RotateCcw, Clock, ArrowRight } from "lucide-react"

export default function EnviosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Header />
      <CartDrawer />
      <main className="flex-1 container mx-auto px-4 lg:px-12 py-20 max-w-[1400px]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-950 mb-6">Envíos y Devoluciones</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: Truck, title: "Envío Express", desc: "24-48 horas en zonas metropolitanas" },
              { icon: Clock, title: "Procesamiento", desc: "Tu pedido se procesa en 1-2 días hábiles" },
              { icon: RotateCcw, title: "Devoluciones", desc: "30 días para cambios y devoluciones" },
              { icon: ShieldCheck, title: "Seguro", desc: "Cada envío está asegurado al 100%" },
            ].map((item) => (
              <Card key={item.title} className="rounded-xl border-zinc-100">
                <CardContent className="p-5 flex gap-4">
                  <item.icon className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-900">{item.title}</p>
                    <p className="text-sm text-zinc-500 mt-1">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="prose prose-zinc max-w-none space-y-6">
            <h2 className="text-2xl font-bold text-zinc-950">Envío Gratis</h2>
            <p className="text-zinc-600 leading-relaxed">
              Todos los pedidos superiores a $3,000 MXN califican para envío express gratuito.
              Para pedidos menores, el costo de envío es de $150 MXN.
            </p>

            <h2 className="text-2xl font-bold text-zinc-950">Seguimiento</h2>
            <p className="text-zinc-600 leading-relaxed">
              Recibirás un número de guía por email una vez que tu pedido sea enviado.
              Puedes rastrear tu paquete en tiempo real desde tu cuenta.
            </p>

            <h2 className="text-2xl font-bold text-zinc-950">Devoluciones</h2>
            <p className="text-zinc-600 leading-relaxed">
              Si no estás satisfecho con tu compra, tienes 30 días para devolver el producto
              sin usar. Contáctanos y te guiaremos en el proceso.
            </p>

            <Link href="/catalogo">
              <Button className="bg-emerald-600 hover:bg-emerald-500 rounded-full">
                Explorar Catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
