"use client"

import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/stores/cart-store"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export function CartDrawer() {
  const {
    items,
    isOpen,
    toggleCart,
    totalPrice,
    updateQuantity,
    removeItem,
  } = useCartStore()

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pb-4">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Tu Carrito ({items.length} productos)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
            <p className="text-muted-foreground">Tu carrito está vacío</p>
            <Link href="/catalogo" onClick={toggleCart}>
              <Button>Explorar Catálogo</Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {item.variant.imageUrl ? (
                        <Image
                          src={item.variant.imageUrl}
                          alt={item.perfume.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                          <span className="text-xs font-serif text-amber-800/30">
                            L&apos;E
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <Link
                        href={`/perfume/${item.perfume.slug}`}
                        className="font-medium text-sm hover:text-primary line-clamp-2"
                        onClick={toggleCart}
                      >
                        {item.perfume.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {item.perfume.brand.name} • {item.variant.sizeMl}ml
                      </p>
                      <p className="text-sm font-medium">
                        ${Number(item.variant.price).toFixed(2)}
                      </p>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive ml-auto"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)} MXN</span>
              </div>
              <Link href="/checkout" onClick={toggleCart} className="w-full">
                <Button className="w-full" size="lg">
                  Proceder al Checkout
                </Button>
              </Link>
              <Link href="/catalogo" onClick={toggleCart} className="w-full">
                <Button variant="outline" className="w-full">
                  Seguir Comprando
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
