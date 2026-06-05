import type { Metadata } from "next"
import { Geist_Mono, Manrope, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "L'Essence | Perfumería de Lujo",
  description:
    "Descubre el mundo de las fragancias finas, de nicho y de diseñador. Perfumería de lujo con garantía de autenticidad.",
  keywords: [
    "perfumes",
    "fragancias",
    "perfumería de lujo",
    "nicho",
    "diseñador",
    "eau de parfum",
  ],
  authors: [{ name: "L'Essence" }],
  openGraph: {
    title: "L'Essence | Perfumería de Lujo",
    description: "Descubre fragancias exclusivas y auténticas",
    type: "website",
    locale: "es_ES",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido principal
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
