"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Sparkles, Wind, Heart, Clock } from "lucide-react"

interface QuizAnswer {
  intensity: number
  freshness: number
  sweetness: number
  occasion: string
  personality: string
}

const questions = [
  {
    id: "intensity",
    question: "¿Qué intensidad de fragancia prefieres?",
    subtitle: "Define el carácter de tu aroma ideal",
    icon: Wind,
    options: [
      { label: "Sutil y discreta", value: 1 },
      { label: "Moderada", value: 2 },
      { label: "Notable", value: 3 },
      { label: "Intensa y marcada", value: 4 },
    ],
  },
  {
    id: "freshness",
    question: "¿Te inclinas más por aromas...?",
    subtitle: "Tu preferencia olfativa principal",
    icon: Sparkles,
    options: [
      { label: "Muy frescos y cítricos", value: 1 },
      { label: "Frescos con cuerpo", value: 2 },
      { label: "Cálidos con frescura", value: 3 },
      { label: "Cálidos y envolventes", value: 4 },
    ],
  },
  {
    id: "sweetness",
    question: "¿Qué rol juegan las notas dulces?",
    subtitle: "Define el balance dulce de tu fragancia",
    icon: Heart,
    options: [
      { label: "Prefiero cero dulzor", value: 1 },
      { label: "Un toque apenas perceptible", value: 2 },
      { label: "Balance equilibrado", value: 3 },
      { label: "Me encanta lo dulce y goloso", value: 4 },
    ],
  },
  {
    id: "occasion",
    question: "¿Para qué ocasión usarías más la fragancia?",
    subtitle: "El momento define el perfume",
    icon: Clock,
    options: [
      { label: "Diario / Oficina", value: "diario" },
      { label: "Tarde / Social", value: "social" },
      { label: "Noche / Eventos", value: "noche" },
      { label: "Ocasiones especiales", value: "especial" },
    ],
  },
  {
    id: "personality",
    question: "¿Cómo describirías tu personalidad?",
    subtitle: "Tu esencia define tu fragancia",
    icon: Heart,
    options: [
      { label: "Clásica y elegante", value: "clasico" },
      { label: "Moderna y audaz", value: "moderno" },
      { label: "Creativa y libre", value: "creativo" },
      { label: "Sofisticada y misteriosa", value: "misterio" },
    ],
  },
]

const recommendedSlugs: Record<string, string[]> = {
  "diario-clasico": ["colonia-essenza", "terre-dhermes", "wood-sage-sea-salt"],
  "diario-moderno": ["bleu-de-chanel", "sauvage", "another-13"],
  "diario-creativo": ["gypsy-water", "santal-33", "wood-sage-sea-salt"],
  "diario-misterio": ["la-nuit-de-lhomme", "aventus", "oud-wood"],
  "social-clasico": ["chanel-n5", "jadore", "mon-guerlain"],
  "social-moderno": ["gypsy-water", "santal-33", "colonia-essenza"],
  "social-creativo": ["wood-sage-sea-salt", "another-13", "santal-33"],
  "social-misterio": ["baccarat-rouge-540", "la-nuit-de-lhomme", "tobacco-vanille"],
  "noche-clasico": ["la-nuit-de-lhomme", "chanel-n5", "aventus"],
  "noche-moderno": ["baccarat-rouge-540", "bleu-de-chanel", "sauvage"],
  "noche-creativo": ["santal-33", "gypsy-water", "another-13"],
  "noche-misterio": ["tobacco-vanille", "baccarat-rouge-540", "oud-wood"],
  "especial-clasico": ["chanel-n5", "aventus", "mon-guerlain"],
  "especial-moderno": ["baccarat-rouge-540", "bleu-de-chanel", "tobacco-vanille"],
  "especial-creativo": ["santal-33", "gypsy-water", "another-13"],
}

export default function QuizOlfativoPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer>({
    intensity: 0,
    freshness: 0,
    sweetness: 0,
    occasion: "",
    personality: "",
  })

  const currentQuestion = questions[step]
  const isLast = step === questions.length - 1
  const isComplete = step >= questions.length

  const handleAnswer = (value: any) => {
    const key = currentQuestion.id as keyof QuizAnswer
    setAnswers({ ...answers, [key]: value })

    if (isLast) {
      setTimeout(() => setStep(step + 1), 300)
    } else {
      setTimeout(() => setStep(step + 1), 200)
    }
  }

  const getResults = () => {
    const key = `${answers.occasion}-${answers.personality}`
    return recommendedSlugs[key] || recommendedSlugs["diario-moderno"]
  }

  if (isComplete) {
    const results = getResults()
    return (
      <div className="flex flex-col min-h-screen bg-zinc-50">
        <Header />
        <CartDrawer />
        <main className="flex-1 container mx-auto px-4 py-20 max-w-[1400px]">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center"
            >
              <Sparkles className="h-8 w-8 text-emerald-600" />
            </motion.div>

            <h1 className="text-3xl font-bold text-zinc-950 mb-3">Tu Perfil Olfativo</h1>
            <p className="text-zinc-500 mb-10 leading-relaxed">
              Basado en tus respuestas, estas son las 3 fragancias que mejor se adaptan a tu personalidad y estilo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {results.map((slug, i) => (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Link href={`/perfume/${slug}`}>
                    <div className="bg-white rounded-xl p-6 border border-zinc-100 hover:border-emerald-200 hover:shadow-md transition-all group">
                      <div className="h-20 w-full bg-zinc-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                        <Sparkles className="h-8 w-8 text-zinc-300 group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <p className="font-medium text-zinc-900 text-sm">{slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                      <p className="text-xs text-emerald-600 mt-1">Ver detalle →</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" className="rounded-full" onClick={() => { setStep(0); setAnswers({ intensity: 0, freshness: 0, sweetness: 0, occasion: "", personality: "" }) }}>
                Repetir Quiz
              </Button>
              <Link href="/catalogo">
                <Button className="bg-emerald-600 hover:bg-emerald-500 rounded-full">
                  Explorar Catálogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Header />
      <CartDrawer />

      <main className="flex-1 container mx-auto px-4 py-20 max-w-[1400px] flex items-center justify-center">
        <div className="max-w-xl w-full">
          {/* Progress */}
          <div className="flex gap-2 mb-10">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i < step ? "bg-emerald-500" : i === step ? "bg-emerald-300" : "bg-zinc-200"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <currentQuestion.icon className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-sm text-zinc-400">Pregunta {step + 1} de {questions.length}</span>
              </div>

              <h2 className="text-2xl font-bold text-zinc-950 mb-1">{currentQuestion.question}</h2>
              <p className="text-zinc-500 mb-8">{currentQuestion.subtitle}</p>

              <div className="space-y-3">
                {currentQuestion.options.map((option, i) => (
                  <motion.button
                    key={i}
                    className="w-full text-left p-4 rounded-xl border border-zinc-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => handleAnswer(option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-zinc-800 group-hover:text-emerald-700 transition-colors">{option.label}</span>
                      <ArrowRight className="h-4 w-4 text-zinc-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}
