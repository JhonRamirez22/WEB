import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white mt-auto">
      <div className="container mx-auto px-4 lg:px-12 py-16 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-lg font-bold tracking-tight">L&apos;Essence</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Tu destino para fragancias exclusivas y auténticas. Perfumería de lujo con garantía de originalidad.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Explorar</h4>
            <ul className="space-y-3">
              {[
                { label: "Catálogo Completo", href: "/catalogo" },
                { label: "Perfumes para Hombre", href: "/catalogo?gender=MASCULINO" },
                { label: "Perfumes para Mujer", href: "/catalogo?gender=FEMENINO" },
                { label: "Eau de Parfum", href: "/catalogo?concentration=EAU_DE_PARFUM" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Información</h4>
            <ul className="space-y-3">
              {[
                { label: "Sobre Nosotros", href: "/sobre-nosotros" },
                { label: "Envíos y Entregas", href: "/envios" },
                { label: "Política de Privacidad", href: "/politica-privacidad" },
                { label: "Términos y Condiciones", href: "/terminos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Contacto</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>contacto@lessence.com</li>
              <li>+52 55 1234 5678</li>
              <li>Ciudad de México, México</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            © 2024 L&apos;Essence. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001z" clipRule="evenodd" />
              </svg>
              Pago Seguro
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100-2H6V7h5a1 1 0 011 1v5h2V8a3 3 0 00-3-3H6z" clipRule="evenodd" />
              </svg>
              100% Auténtico
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
