"use client"

import { useCallback, useRef } from "react"
import confetti from "canvas-confetti"

interface SprayEffectProps {
  familyName: string
  concentration: string
}

// Mapeo de familias olfativas a configuraciones de confetti
const familyConfigs: Record<string, { colors: string[]; shapes: confetti.Shape[]; scalar: number }> = {
  "Cítrica": {
    colors: ["#FFD700", "#FFA500", "#FF6347", "#FFE4B5", "#FFFFE0", "#FFD700"],
    shapes: ["circle" as confetti.Shape],
    scalar: 1.2,
  },
  "Floral": {
    colors: ["#FFB6C1", "#FF69B4", "#DA70D6", "#F8C8DC", "#DDA0DD", "#FF1493"],
    shapes: ["circle" as confetti.Shape, "star" as confetti.Shape],
    scalar: 1.0,
  },
  "Oriental": {
    colors: ["#FFD700", "#DAA520", "#B8860B", "#CD853F", "#D2691E", "#8B4513"],
    shapes: ["circle" as confetti.Shape],
    scalar: 1.4,
  },
  "Amaderada": {
    colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F4A460", "#D2691E"],
    shapes: ["square" as confetti.Shape],
    scalar: 1.1,
  },
  "Fougère": {
    colors: ["#2E8B57", "#3CB371", "#90EE90", "#98FB98", "#00FA9A", "#228B22"],
    shapes: ["circle" as confetti.Shape],
    scalar: 1.0,
  },
  "Chipre": {
    colors: ["#808080", "#A9A9A9", "#C0C0C0", "#D3D3D3", "#696969", "#708090"],
    shapes: ["circle" as confetti.Shape, "square" as confetti.Shape],
    scalar: 0.9,
  },
  "Cuero": {
    colors: ["#4A3728", "#6B4423", "#8B6914", "#A0522D", "#CD853F", "#8B4513"],
    shapes: ["square" as confetti.Shape],
    scalar: 1.2,
  },
}

function getConfig(familyName: string) {
  return familyConfigs[familyName] || {
    colors: ["#FFD700", "#FFA500", "#FF6347", "#FFB6C1", "#87CEEB"],
    shapes: ["circle" as confetti.Shape],
    scalar: 1.0,
  }
}

export function usePerfumeSpray() {
  const containerRef = useRef<HTMLDivElement>(null)

  const spray = useCallback((familyName: string) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    const config = getConfig(familyName)

    // Spray principal hacia arriba
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x, y: y + 0.1 },
      colors: config.colors,
      shapes: config.shapes,
      scalar: config.scalar,
      ticks: 200,
      gravity: 0.8,
      drift: 0.5,
      startVelocity: 30,
    })

    // Spray secundario en círculo
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 120,
        origin: { x, y: y + 0.05 },
        colors: config.colors,
        shapes: config.shapes,
        scalar: config.scalar * 0.8,
        ticks: 150,
        gravity: 0.6,
        drift: 0.3,
        startVelocity: 20,
      })
    }, 100)

    // Destellos finales
    setTimeout(() => {
      confetti({
        particleCount: 20,
        spread: 180,
        origin: { x, y },
        colors: config.colors.slice(0, 3),
        shapes: ["circle" as confetti.Shape],
        scalar: config.scalar * 0.6,
        ticks: 100,
        gravity: 0.4,
        startVelocity: 15,
      })
    }, 200)
  }, [])

  return { containerRef, spray }
}

// Componente de spray para usar en tarjetas
export function PerfumeSprayTrigger({
  children,
  familyName,
}: {
  children: React.ReactNode
  familyName: string
}) {
  const { containerRef, spray } = usePerfumeSpray()

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => spray(familyName)}
      className="relative cursor-pointer"
    >
      {children}
    </div>
  )
}
