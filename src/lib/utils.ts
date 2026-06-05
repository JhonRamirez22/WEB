import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function serializeData<T>(data: T): T {
  if (data === null || data === undefined) return data
  if (typeof data === "object" && data !== null && "constructor" in data) {
    const ctor = (data as any).constructor?.name
    if (ctor === "Decimal") return Number(data) as unknown as T
  }
  if (Array.isArray(data)) return data.map(serializeData) as unknown as T
  if (typeof data === "object" && data !== null) {
    const result: Record<string, any> = {}
    for (const key of Object.keys(data as object)) {
      result[key] = serializeData((data as any)[key])
    }
    return result as T
  }
  return data
}
