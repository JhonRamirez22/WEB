import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
