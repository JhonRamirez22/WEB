"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
  life: number
  maxLife: number
}

interface SprayAnimationProps {
  isActive: boolean
  familyName: string
  position: { x: number; y: number }
}

// Mapeo de familias olfativas a colores de spray
const familyColors: Record<string, string[]> = {
  "Cítrica": ["#FFD700", "#FFA500", "#FF6347", "#FFE4B5", "#FFFFE0"],
  "Floral": ["#FFB6C1", "#FF69B4", "#DA70D6", "#F8C8DC", "#DDA0DD"],
  "Oriental": ["#FFD700", "#DAA520", "#B8860B", "#CD853F", "#D2691E"],
  "Amaderada": ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F4A460"],
  "Fougère": ["#2E8B57", "#3CB371", "#90EE90", "#98FB98", "#00FA9A"],
  "Chipre": ["#808080", "#A9A9A9", "#C0C0C0", "#D3D3D3", "#696969"],
  "Cuero": ["#4A3728", "#6B4423", "#8B6914", "#A0522D", "#CD853F"],
  "default": ["#FFD700", "#FFA500", "#FF6347", "#FFB6C1", "#87CEEB"],
}

function getColorsForFamily(familyName: string): string[] {
  return familyColors[familyName] || familyColors["default"]
}

export function SprayAnimation({ isActive, familyName, position }: SprayAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const colors = getColorsForFamily(familyName)

  const createParticle = useCallback(
    (x: number, y: number): Particle => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 1
      const size = Math.random() * 4 + 1
      const life = Math.random() * 60 + 30

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life,
        maxLife: life,
      }
    },
    [colors]
  )

  const updateParticles = useCallback(() => {
    const particles = particlesRef.current
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.05 // gravedad ligera
      p.life--
      p.alpha = p.life / p.maxLife

      if (p.life <= 0) {
        particles.splice(i, 1)
      }
    }
  }, [])

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    for (const p of particles) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0")
      ctx.fill()

      // Glow effect
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
      ctx.fillStyle = p.color + Math.floor(p.alpha * 60).toString(16).padStart(2, "0")
      ctx.fill()
    }
  }, [])

  useEffect(() => {
    if (!isActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    // Spawn particles
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push(
        createParticle(
          canvas.width / 2 + (Math.random() - 0.5) * 20,
          canvas.height / 2 + (Math.random() - 0.5) * 20
        )
      )
    }

    const animate = () => {
      updateParticles()
      drawParticles()

      // Spawn new particles
      if (particlesRef.current.length < 100 && Math.random() > 0.7) {
        particlesRef.current.push(
          createParticle(
            canvas.width / 2 + (Math.random() - 0.5) * 10,
            canvas.height / 2 + (Math.random() - 0.5) * 10
          )
        )
      }

      if (particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isActive, createParticle, updateParticles, drawParticles])

  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </motion.div>
  )
}

// Componente para el efecto de spray en hover
export function PerfumeSprayHover({
  children,
  familyName,
}: {
  children: React.ReactNode
  familyName: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <SprayAnimation
            isActive={true}
            familyName={familyName}
            position={{ x: 0, y: 0 }}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  )
}


