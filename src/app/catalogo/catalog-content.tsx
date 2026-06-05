"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { PerfumeCard } from "@/components/catalog/perfume-card"
import { FilterSidebar } from "@/components/catalog/filter-sidebar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { SlidersHorizontal } from "lucide-react"

export function CatalogContent() {
  const searchParams = useSearchParams()
  const [perfumes, setPerfumes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [filters, setFilters] = useState({
    brands: [] as string[],
    families: [] as string[],
    concentrations: [] as string[],
    genders: [] as string[],
    priceRange: [0, 10000] as [number, number],
    inStock: false,
  })

  const brands = [
    { value: "chanel", label: "Chanel", count: 1 },
    { value: "dior", label: "Dior", count: 1 },
    { value: "creed", label: "Creed", count: 1 },
    { value: "tom-ford", label: "Tom Ford", count: 1 },
    { value: "guerlain", label: "Guerlain", count: 1 },
    { value: "acqua-di-parma", label: "Acqua di Parma", count: 1 },
  ]

  const families = [
    { value: "citrica", label: "Cítrica" },
    { value: "floral", label: "Floral" },
    { value: "oriental", label: "Oriental" },
    { value: "amaderada", label: "Amaderada" },
    { value: "fougere", label: "Fougère" },
  ]

  const concentrations = [
    { value: "EAU_DE_COLOGNE", label: "Eau de Cologne" },
    { value: "EAU_DE_TOILETTE", label: "Eau de Toilette" },
    { value: "EAU_DE_PARFUM", label: "Eau de Parfum" },
    { value: "PARFUM", label: "Parfum" },
    { value: "EXTRAIT", label: "Extrait" },
  ]

  const genders = [
    { value: "MASCULINO", label: "Masculino" },
    { value: "FEMENINO", label: "Femenino" },
    { value: "UNISEX", label: "Unisex" },
  ]

  useEffect(() => {
    const fetchPerfumes = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        params.set("page", page.toString())
        params.set("limit", "12")
        
        if (filters.brands.length > 0) params.set("brand", filters.brands[0])
        if (filters.families.length > 0) params.set("family", filters.families[0])
        if (filters.concentrations.length > 0) params.set("concentration", filters.concentrations[0])
        if (filters.genders.length > 0) params.set("gender", filters.genders[0])
        if (filters.inStock) params.set("inStock", "true")
        
        const searchQuery = searchParams.get("search")
        if (searchQuery) params.set("search", searchQuery)
        
        const response = await fetch(`/api/perfumes?${params.toString()}`)
        const data = await response.json()
        
        if (data.perfumes) {
          setPerfumes(data.perfumes)
          setTotalPages(data.pagination.totalPages)
        }
      } catch (error) {
        console.error("Error fetching perfumes:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPerfumes()
  }, [filters, page, searchParams])

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Catálogo</h1>
          <p className="text-muted-foreground mt-1">
            Descubre nuestra colección de fragancias
          </p>
        </div>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          brands={brands}
          families={families}
          concentrations={concentrations}
          genders={genders}
          selectedFilters={filters}
          onFilterChange={setFilters}
          onClearFilters={() =>
            setFilters({
              brands: [],
              families: [],
              concentrations: [],
              genders: [],
              priceRange: [0, 10000],
              inStock: false,
            })
          }
        />

        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : perfumes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {perfumes.map((perfume) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Anterior
                  </Button>
                  <span className="flex items-center px-4 text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <SlidersHorizontal className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No se encontraron perfumes
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar los filtros o busca algo diferente
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    brands: [],
                    families: [],
                    concentrations: [],
                    genders: [],
                    priceRange: [0, 10000],
                    inStock: false,
                  })
                }
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
