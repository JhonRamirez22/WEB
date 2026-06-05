"use client"

import { motion } from "framer-motion"

interface Note {
  id: string
  note: {
    name: string
  }
  position: string
}

interface PyramidDisplayProps {
  notes: {
    SALIDA: Note[]
    CORAZON: Note[]
    FONDO: Note[]
  }
}

export function PyramidDisplay({ notes }: PyramidDisplayProps) {
  const getPositionColor = (position: string) => {
    switch (position) {
      case "SALIDA":
        return "bg-amber-100 border-amber-300 text-amber-800"
      case "CORAZON":
        return "bg-rose-100 border-rose-300 text-rose-800"
      case "FONDO":
        return "bg-violet-100 border-violet-300 text-violet-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
    }
  }

  const getPositionLabel = (position: string) => {
    switch (position) {
      case "SALIDA":
        return "Notas de Salida"
      case "CORAZON":
        return "Notas de Corazón"
      case "FONDO":
        return "Notas de Fondo"
      default:
        return position
    }
  }

  const getPositionDescription = (position: string) => {
    switch (position) {
      case "SALIDA":
        return "Alta volatilidad, primeras impresiones"
      case "CORAZON":
        return "Cuerpo principal del perfume"
      case "FONDO":
        return "Fijación y base duradera"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {(["SALIDA", "CORAZON", "FONDO"] as const).map((position, index) => (
        <motion.div
          key={position}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{getPositionLabel(position)}</h4>
              <p className="text-xs text-muted-foreground">
                {getPositionDescription(position)}
              </p>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${getPositionColor(position).split(" ")[0]}`}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {notes[position]?.map((note) => (
              <motion.span
                key={note.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm border ${getPositionColor(position)}`}
              >
                {note.note.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
