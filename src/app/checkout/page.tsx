"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/stores/cart-store"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, CreditCard, ShieldCheck, Truck, Package, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"
import { toast } from "sonner"

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "México",
    notes: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?redirect=/checkout")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      setForm((f) => ({
        ...f,
        name: f.name || session.user?.name || "",
        email: f.email || session.user?.email || "",
      }))
    }
  }, [session])

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address1 || !form.city || !form.zip) {
      toast.error("Completa los campos obligatorios")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: {
            name: form.name,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
            phone: form.phone,
          },
          billingAddress: {
            name: form.name,
            address1: form.address1,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
          },
          notes: form.notes,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Error al procesar el pedido")
        setIsSubmitting(false)
        return
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        clearCart()
        router.push(`/checkout/success?orderId=${data.orderId}`)
      }
    } catch {
      toast.error("Error al conectar con el servidor")
      setIsSubmitting(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  const shippingCost = totalPrice > 3000 ? 0 : 150
  const tax = totalPrice * 0.16
  const total = totalPrice + shippingCost + tax

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-zinc-50">
        <Header />
        <CartDrawer />
        <main className="flex-1 container mx-auto px-4 py-20 max-w-[1400px] text-center">
          <Package className="h-16 w-16 mx-auto text-zinc-300 mb-4" />
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Tu carrito está vacío</h1>
          <p className="text-zinc-500 mb-6">Agrega perfumes antes de continuar con el checkout</p>
          <Link href="/catalogo">
            <Button className="bg-emerald-600 hover:bg-emerald-500 rounded-full">
              Explorar Catálogo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Header />
      <CartDrawer />

      <main className="flex-1 container mx-auto px-4 lg:px-12 py-8 max-w-[1400px]">
        <Link href="/carrito" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver al carrito
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-zinc-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Truck className="h-4 w-4 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900">Dirección de Envío</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address1">Dirección *</Label>
                  <Input id="address1" value={form.address1} onChange={(e) => setForm({ ...form, address1: e.target.value })} placeholder="Calle y número" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Input value={form.address2} onChange={(e) => setForm({ ...form, address2: e.target.value })} placeholder="Colonia, departamento (opcional)" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="city">Ciudad *</Label>
                  <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="zip">Código Postal *</Label>
                  <Input id="zip" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="country">País</Label>
                  <Input id="country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="notes">Notas del pedido (opcional)</Label>
                  <Input id="notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Instrucciones especiales..." className="mt-1.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-zinc-100 sticky top-24">
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">Resumen del Pedido</h2>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-3">
                    <div className="w-12 h-14 rounded-lg bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-300 flex-shrink-0">
                      {item.perfume.brand.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">{item.perfume.name}</p>
                      <p className="text-xs text-zinc-400">{item.perfume.brand.name} · {item.variant.sizeMl}ml</p>
                      <p className="text-xs text-zinc-500">Cant: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-zinc-900 flex-shrink-0">
                      ${(item.variant.price * item.quantity).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 text-xs">Gratis</Badge> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>IVA (16%)</span>
                  <span>${tax.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-zinc-900 text-base pt-1">
                  <span>Total</span>
                  <span>${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full"
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Realizar Pedido
                  </>
                )}
              </Button>

              <div className="mt-4 flex items-center gap-4 justify-center text-xs text-zinc-400">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Seguro
                </span>
                <span className="inline-flex items-center gap-1">
                  <Truck className="h-3 w-3" /> Envío 24-48h
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
