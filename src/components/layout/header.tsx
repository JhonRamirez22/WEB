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
      className="sticky top-0 z-50 w-full bg-background/85 backdrop-blur-xl border-b border-border/50"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-16 h-16 flex items-center justify-between max-w-[1400px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-serif text-xl tracking-[0.08em] uppercase text-foreground">
            L&apos;Essence
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Catálogo", href: "/catalogo" },
              { label: "Hombre", href: "/catalogo?gender=MASCULINO" },
              { label: "Mujer", href: "/catalogo?gender=FEMENINO" },
              { label: "Nicho", href: "/catalogo?isPremium=true" },
            ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                className="flex items-center"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="search"
                  placeholder="Buscar..."
                  className="w-40 lg:w-56 h-9 rounded-full border border-border bg-secondary px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      window.location.href = `/catalogo?search=${encodeURIComponent(searchQuery)}`
                    }
                  }}
                />
                <Button variant="ghost" size="icon" className="size-8 ml-1" onClick={() => setIsSearchOpen(false)}>
                  <span className="text-xs text-muted-foreground">✕</span>
                </Button>
              </motion.div>
            ) : (
              <Button variant="ghost" size="icon" className="size-9" onClick={() => setIsSearchOpen(true)} aria-label="Buscar">
                <Search className="size-4 text-muted-foreground" />
              </Button>
            )}
          </AnimatePresence>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative size-9" onClick={toggleCart} aria-label={`Carrito, ${totalItems} artículos`}>
            <ShoppingBag className="size-4 text-muted-foreground" />
            {totalItems > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 size-4 flex items-center justify-center p-0 text-[9px] bg-foreground text-background border-0 rounded-full">
                {totalItems}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          {session ? (
            <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-sm size-9 hover:bg-secondary" aria-label="Menú de usuario">
              <User className="size-4 text-muted-foreground" />
            </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground">{session.user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/cuenta/pedidos" className="w-full">Mis Pedidos</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/cuenta/direcciones" className="w-full">Direcciones</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/cuenta/perfil" className="w-full">Mi Perfil</Link></DropdownMenuItem>
                {(userRole === "ADMIN" || userRole === "GESTOR") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/admin" className="flex items-center w-full">
                        <Shield className="mr-2 size-3.5" /> Panel
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut className="mr-2 size-3.5" /> Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-2">
              Iniciar Sesión
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center size-9 hover:bg-secondary rounded-sm" aria-label="Abrir menú">
              <Menu className="size-4 text-muted-foreground" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-1 mt-8">
                {[
                  { label: "Catálogo", href: "/catalogo" },
                  { label: "Hombre", href: "/catalogo?gender=MASCULINO" },
                  { label: "Mujer", href: "/catalogo?gender=FEMENINO" },
                  { label: "Nicho", href: "/catalogo?isPremium=true" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-sm transition-colors"
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
