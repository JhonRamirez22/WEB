"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Loader2, ArrowRight } from "lucide-react"
import { motion } from "motion/react"

const statusMap: Record<string, { label: string; className: string }> = {
  PENDIENTE: { label: "Pendiente", className: "bg-amber-50 text-amber-700 border-amber-200" },
  PAGADO: { label: "Pagado", className: "bg-blue-50 text-blue-700 border-blue-200" },
  ENVIADO: { label: "Enviado", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ENTREGADO: { label: "Entregado", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  CANCELADO: { label: "Cancelado", className: "bg-red-50 text-red-700 border-red-200" },
}

export default function PedidosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }
    if (status === "authenticated") {
      fetch("/api/orders", { headers: { "Content-Type": "application/json" } })
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) setOrders(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [status, router])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Header />
      <CartDrawer />
      <main className="flex-1 container mx-auto px-4 lg:px-12 py-10 max-w-[1400px]">
        <h1 className="text-2xl font-bold text-zinc-950 mb-2">Mis Pedidos</h1>
        <p className="text-zinc-500 mb-8">Historial de tus compras en L'Essence</p>

        {orders.length === 0 ? (
          <Card className="rounded-2xl border-zinc-100">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-zinc-300 mb-4" />
              <p className="text-zinc-500 mb-4">Aún no has realizado ningún pedido</p>
              <Link href="/catalogo">
                <Button className="bg-emerald-600 hover:bg-emerald-500 rounded-full">
                  Explorar Catálogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const statusInfo = statusMap[order.status] || { label: order.status, className: "bg-zinc-100 text-zinc-600" }
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="rounded-xl border-zinc-100 hover:border-zinc-200 transition-colors">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-zinc-400">Pedido #{order.id.slice(-8)}</p>
                          <p className="text-sm text-zinc-500">
                            {new Date(order.createdAt).toLocaleDateString("es-MX", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-zinc-900">
                          ${order.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </p>
                        <span className="text-sm text-zinc-400">
                          {order.items?.length || 0} producto{(order.items?.length || 0) !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
