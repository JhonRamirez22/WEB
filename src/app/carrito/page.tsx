"use client"

import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/stores/cart-store"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react"

export default function CartPage() {
  const {
    items,
    totalPrice,
    totalItems,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore()

  const shippingCost = totalPrice > 3000 ? 0 : 150
  const taxAmount = totalPrice * 0.16
  const finalTotal = totalPrice + shippingCost + taxAmount

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8">Tu Carrito</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground/30 mb-6" />
            <h2 className="text-xl font-medium mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">
              Explora nuestro catálogo y encuentra tu fragancia perfecta
            </p>
            <Link href="/catalogo">
              <Button size="lg">Explorar Catálogo</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground">
                  {totalItems} productos en tu carrito
                </p>
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  Vaciar carrito
                </Button>
              </div>

              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {item.variant.imageUrl ? (
                          <Image
                            src={item.variant.imageUrl}
                            alt={item.perfume.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                            <span className="text-sm font-serif text-amber-800/30">
                              L&apos;E
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <Link
                              href={`/perfume/${item.perfume.slug}`}
                              className="font-medium hover:text-primary"
                            >
                              {item.perfume.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              {item.perfume.brand.name} • {item.variant.sizeMl}ml
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.variantId,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.variantId,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold">
                            ${(item.quantity * item.variant.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Resumen de la Orden</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span>
                        {shippingCost === 0 ? (
                          <Badge variant="secondary" className="text-xs">
                            Gratis
                          </Badge>
                        ) : (
                          `$${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IVA (16%)</span>
                      <span>${taxAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)} MXN</span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Te faltan ${(3000 - totalPrice).toFixed(2)} para envío
                      gratis
                    </p>
                  )}

                  <Link href="/checkout" className="w-full">
                    <Button className="w-full" size="lg">
                      Proceder al Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/catalogo" className="w-full">
                    <Button variant="outline" className="w-full">
                      Seguir Comprando
                    </Button>
                  </Link>

                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <Truck className="w-4 h-4 mr-1" />
                    Envío gratis en compras mayores a $3,000
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
