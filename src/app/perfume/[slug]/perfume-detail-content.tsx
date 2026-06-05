"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { PyramidDisplay } from "@/components/catalog/pyramid-display"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, Check, Heart, Share2, Minus, Plus, Shield, SprayCanIcon } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { toast } from "sonner"
import confetti from "canvas-confetti"

interface PerfumeDetailContentProps {
  perfume: any
}

export function PerfumeDetailContent({ perfume }: PerfumeDetailContentProps) {
  const { addItem } = useCartStore()
  const [selectedVariant, setSelectedVariant] = useState(perfume.variants[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Función de spray de confetti basada en la familia olfativa
  const sprayConfetti = useCallback(() => {
    const familyName = perfume.family?.name || "default"
    const colors = getFamilyColors(familyName)
    
    // Spray principal desde la botella hacia arriba
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.5, y: 0.6 },
      colors,
      shapes: ["circle"],
      scalar: 1.5,
      ticks: 200,
      gravity: 0.6,
      startVelocity: 35,
      drift: 0.2,
    })

    // Spray secundario más disperso
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors,
        shapes: ["circle", "star"],
        scalar: 1.2,
        ticks: 150,
        gravity: 0.5,
        startVelocity: 25,
        drift: 0.5,
      })
    }, 150)

    // Destellos finales
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 180,
        origin: { x: 0.5, y: 0.4 },
        colors: colors.slice(0, 3),
        shapes: ["circle"],
        scalar: 0.8,
        ticks: 100,
        gravity: 0.4,
        startVelocity: 15,
      })
    }, 300)
  }, [perfume.family?.name])

  const handleVariantSelect = (variant: any) => {
    setSelectedVariant(variant)
    sprayConfetti()
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return

    addItem({
      id: `${perfume.id}-${selectedVariant.id}`,
      perfumeId: perfume.id,
      variantId: selectedVariant.id,
      quantity,
      perfume: {
        id: perfume.id,
        name: perfume.name,
        slug: perfume.slug,
        brand: { name: perfume.brand.name },
      },
      variant: {
        id: selectedVariant.id,
        sizeMl: selectedVariant.sizeMl,
        price: Number(selectedVariant.price),
        imageUrl: selectedVariant.imageUrl,
      },
    })

    // Spray de celebración al agregar al carrito
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#FFD700", "#FFA500", "#FF6347", "#32CD32", "#87CEEB"],
      shapes: ["circle", "star"],
      scalar: 1.3,
      ticks: 200,
      gravity: 0.7,
      startVelocity: 30,
    })

    toast.success(`${perfume.name} (${selectedVariant.sizeMl}ml) agregado al carrito`)
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-foreground">Inicio</Link></li>
          <li>/</li>
          <li><Link href="/catalogo" className="hover:text-foreground">Catálogo</Link></li>
          <li>/</li>
          <li className="text-foreground">{perfume.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="space-y-4">
          <motion.div 
            className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 relative cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => sprayConfetti()}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span 
                className="text-8xl font-serif font-bold bg-gradient-to-br from-amber-700/20 to-orange-800/20 bg-clip-text text-transparent"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {perfume.brand.name[0]}
              </motion.span>
            </div>
            
            {/* Efecto de brillo al hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
              initial={false}
              transition={{ duration: 0.3 }}
            />

            {/* Icono de spray */}
            <motion.div
              className="absolute top-4 right-4 z-10"
              initial={{ opacity: 0, y: -10 }}
              whileHover={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0 }}
            >
              <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-lg">
                <SprayCanIcon className="w-3 h-3 mr-1" />
                ¡Pasa el mouse!
              </Badge>
            </motion.div>
            
            {perfume.isVerified && (
              <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur z-10">
                <Shield className="w-3 h-3 mr-1 text-green-600" />
                100% Auténtico
              </Badge>
            )}
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
              {perfume.brand.name}
            </p>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">
              {perfume.name}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(perfume.averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  {perfume.averageRating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {perfume.reviews.length} reseñas
              </span>
            </div>
          </div>

          <Separator />

          {/* Price and Variant Selection */}
          <div className="space-y-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">
                ${selectedVariant ? Number(selectedVariant.price).toFixed(2) : "0.00"}
              </span>
              <span className="text-muted-foreground">MXN</span>
            </div>

            {perfume.variants.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Tamaño</p>
                <div className="flex flex-wrap gap-2">
                  {perfume.variants.map((variant: any) => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleVariantSelect(variant)}
                      disabled={variant.stock === 0}
                    >
                      {variant.sizeMl}ml
                      {variant.stock === 0 && " (Agotado)"}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5 && (
              <p className="text-sm text-orange-600">
                ¡Solo quedan {selectedVariant.stock} unidades!
              </p>
            )}

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <p className="text-sm font-medium">Cantidad</p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(selectedVariant?.stock || 1, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
              >
                Agregar al Carrito
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Concentración</p>
              <p className="font-medium">{perfume.concentration?.replace(/_/g, " ")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Género</p>
              <p className="font-medium">{perfume.gender}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Familia Olfativa</p>
              <p className="font-medium">{perfume.family?.name}</p>
            </div>
            {perfume.year && (
              <div>
                <p className="text-muted-foreground">Año</p>
                <p className="font-medium">{perfume.year}</p>
              </div>
            )}
            {perfume.perfumer && (
              <div>
                <p className="text-muted-foreground">Perfumista</p>
                <p className="font-medium">{perfume.perfumer}</p>
              </div>
            )}
            {perfume.originCountry && (
              <div>
                <p className="text-muted-foreground">Origen</p>
                <p className="font-medium">{perfume.originCountry}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: Description, Pyramid, Reviews */}
      <Tabs defaultValue="pyramid" className="space-y-8">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Descripción</TabsTrigger>
          <TabsTrigger value="pyramid">Pirámide Olfativa</TabsTrigger>
          <TabsTrigger value="reviews">
            Reseñas ({perfume.reviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {perfume.description}
          </p>
        </TabsContent>

        <TabsContent value="pyramid">
          <Card>
            <CardContent className="pt-6">
              <PyramidDisplay notes={perfume.notesByPosition} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          {perfume.reviews.length > 0 ? (
            perfume.reviews.map((review: any) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{review.user.name}</span>
                        {review.isVerified && (
                          <Badge variant="secondary" className="text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString("es-MX")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {review.title && <h4 className="font-medium mb-2">{review.title}</h4>}
                  <p className="text-muted-foreground text-sm mb-4">
                    {review.comment}
                  </p>
                  {(review.longevity || review.sillage) && (
                    <div className="flex space-x-4 text-sm">
                      {review.longevity && (
                        <div>
                          <span className="text-muted-foreground">Longevidad:</span>{" "}
                          <span className="font-medium">{review.longevity}/5</span>
                        </div>
                      )}
                      {review.sillage && (
                        <div>
                          <span className="text-muted-foreground">Estela:</span>{" "}
                          <span className="font-medium">{review.sillage}/5</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Aún no hay reseñas para este perfume.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  )
}

function getFamilyColors(familyName: string): string[] {
  const colors: Record<string, string[]> = {
    "Cítrica": ["#FFD700", "#FFA500", "#FF6347", "#FFE4B5", "#FFFFE0"],
    "Floral": ["#FFB6C1", "#FF69B4", "#DA70D6", "#F8C8DC", "#DDA0DD"],
    "Oriental": ["#FFD700", "#DAA520", "#B8860B", "#CD853F", "#D2691E"],
    "Amaderada": ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F4A460"],
    "Fougère": ["#2E8B57", "#3CB371", "#90EE90", "#98FB98", "#00FA9A"],
    "Chipre": ["#808080", "#A9A9A9", "#C0C0C0", "#D3D3D3", "#696969"],
    "Cuero": ["#4A3728", "#6B4423", "#8B6914", "#A0522D", "#CD853F"],
  }
  return colors[familyName] || ["#FFD700", "#FFA500", "#FF6347", "#FFB6C1", "#87CEEB"]
}
