"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useCartStore } from "@/stores/cart-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingBag, User, Menu, LogOut, Shield } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export function Header() {
  const { data: session } = useSession()
  const { totalItems, toggleCart } = useCartStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const userRole = session?.user?.role

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-4 lg:px-12 h-16 flex items-center justify-between max-w-[1400px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-lg font-bold tracking-tight text-zinc-950">
            L&apos;Essence
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/catalogo"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/catalogo?gender=MASCULINO"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            Hombre
          </Link>
          <Link
            href="/catalogo?gender=FEMENINO"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            Mujer
          </Link>
          <Link
            href="/catalogo"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            Nicho
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div 
                className="flex items-center"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="search"
                  placeholder="Buscar perfumes..."
                  className="w-48 lg:w-64 h-9 rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      window.location.href = `/catalogo?search=${encodeURIComponent(searchQuery)}`
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 ml-1"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <span className="text-xs text-zinc-400">✕</span>
                </Button>
              </motion.div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4 text-zinc-500" />
              </Button>
            )}
          </AnimatePresence>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8"
            onClick={toggleCart}
          >
            <ShoppingBag className="h-4 w-4 text-zinc-500" />
            {totalItems > 0 && (
              <Badge
                variant="default"
                className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-emerald-600 text-white border-0"
              >
                {totalItems}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-8 w-8 hover:bg-zinc-100">
                  <User className="h-4 w-4 text-zinc-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-xs text-zinc-400">{session.user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/cuenta/pedidos" className="w-full">Mis Pedidos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cuenta/direcciones" className="w-full">Direcciones</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cuenta/perfil" className="w-full">Mi Perfil</Link>
                </DropdownMenuItem>
                {(userRole === "ADMIN" || userRole === "GESTOR") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/admin" className="flex items-center w-full">
                        <Shield className="mr-2 h-3.5 w-3.5" />
                        Panel Administrativo
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium"
              >
                Iniciar Sesión
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-lg text-sm font-medium h-8 w-8 hover:bg-zinc-100">
              <Menu className="h-4 w-4 text-zinc-500" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col space-y-1 mt-8">
                {[
                  { label: "Catálogo", href: "/catalogo" },
                  { label: "Hombre", href: "/catalogo?gender=MASCULINO" },
                  { label: "Mujer", href: "/catalogo?gender=FEMENINO" },
                  { label: "Nicho", href: "/catalogo" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
