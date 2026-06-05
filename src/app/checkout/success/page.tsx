"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, ShoppingBag, Printer } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || searchParams.get("order_id")
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Header />
      <CartDrawer />

      <main className="flex-1 container mx-auto px-4 py-20 max-w-[1400px] flex items-center justify-center">
        <motion.div
          className="max-w-lg w-full text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="rounded-2xl border-zinc-100 overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center"
              >
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </motion.div>

              <h1 className="text-2xl font-bold text-zinc-950 mb-2">¡Pedido Confirmado!</h1>
              <p className="text-zinc-500 mb-6 leading-relaxed">
                Tu pedido ha sido registrado exitosamente. Recibirás una confirmación por email con los detalles.
              </p>

              {orderId && (
                <div className="bg-zinc-50 rounded-xl p-4 mb-6">
                  <p className="text-xs text-zinc-400 mb-1">Número de Pedido</p>
                  <p className="text-lg font-mono font-semibold text-zinc-900">{orderId}</p>
                </div>
              )}

              <div className="bg-amber-50 rounded-xl p-4 mb-6 text-left">
                <div className="flex items-start gap-3">
                  <Printer className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Pago Pendiente</p>
                    <p className="text-xs text-amber-600 mt-1">
                      Tu pedido está pendiente de pago. Para completarlo, uno de nuestros asesores se pondrá en contacto contigo en las próximas 24 horas para coordinar el método de pago.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/cuenta/pedidos" className="flex-1">
                  <Button variant="outline" className="w-full rounded-full border-zinc-200">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Mis Pedidos
                  </Button>
                </Link>
                <Link href="/catalogo" className="flex-1">
                  <Button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-500">
                    Seguir Comprando
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
