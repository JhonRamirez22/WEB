import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = ["/", "/catalogo", "/perfume", "/auth/login", "/auth/register", "/auth/error"].includes(nextUrl.pathname)
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")
  const isGestorRoute = nextUrl.pathname.startsWith("/gestor")

  // Permitir rutas de API de auth
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Redirigir a login si no está autenticado y es ruta protegida
  if (!isLoggedIn && !isPublicRoute && !nextUrl.pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl))
  }

  // Protección de rutas de administrador
  if (isAdminRoute && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // Protección de rutas de gestor (ADMIN o GESTOR)
  if (isGestorRoute && userRole !== "ADMIN" && userRole !== "GESTOR") {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
