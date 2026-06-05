"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Filter, X } from "lucide-react"

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterSidebarProps {
  brands: FilterOption[]
  families: FilterOption[]
  concentrations: FilterOption[]
  genders: FilterOption[]
  selectedFilters: {
    brands: string[]
    families: string[]
    concentrations: string[]
    genders: string[]
    priceRange: [number, number]
    inStock: boolean
  }
  onFilterChange: (filters: any) => void
  onClearFilters: () => void
}

export function FilterSidebar({
  brands,
  families,
  concentrations,
  genders,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveFilters =
    selectedFilters.brands.length > 0 ||
    selectedFilters.families.length > 0 ||
    selectedFilters.concentrations.length > 0 ||
    selectedFilters.genders.length > 0 ||
    selectedFilters.priceRange[0] > 0 ||
    selectedFilters.priceRange[1] < 10000 ||
    selectedFilters.inStock

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Filtros activos</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-auto p-0 text-xs"
            >
              Limpiar todo
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.brands.map((brand) => (
              <Badge key={brand} variant="secondary" className="text-xs">
                {brand}
                <X
                  className="w-3 h-3 ml-1 cursor-pointer"
                  onClick={() =>
                    onFilterChange({
                      ...selectedFilters,
                      brands: selectedFilters.brands.filter((b) => b !== brand),
                    })
                  }
                />
              </Badge>
            ))}
            {selectedFilters.families.map((family) => (
              <Badge key={family} variant="secondary" className="text-xs">
                {family}
                <X
                  className="w-3 h-3 ml-1 cursor-pointer"
                  onClick={() =>
                    onFilterChange({
                      ...selectedFilters,
                      families: selectedFilters.families.filter(
                        (f) => f !== family
                      ),
                    })
                  }
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Rango de Precio</h4>
        <Slider
          value={selectedFilters.priceRange}
          onValueChange={(value) =>
            onFilterChange({ ...selectedFilters, priceRange: value })
          }
          max={10000}
          step={100}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${selectedFilters.priceRange[0]}</span>
          <span>${selectedFilters.priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={selectedFilters.inStock}
          onCheckedChange={(checked) =>
            onFilterChange({ ...selectedFilters, inStock: checked })
          }
        />
        <Label htmlFor="inStock">Solo disponibles</Label>
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-3">
        <h4 className="font-medium">Marcas</h4>
        <ScrollArea className="h-48">
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.value}`}
                  checked={selectedFilters.brands.includes(brand.value)}
                  onCheckedChange={(checked) => {
                    const newBrands = checked
                      ? [...selectedFilters.brands, brand.value]
                      : selectedFilters.brands.filter((b) => b !== brand.value)
                    onFilterChange({ ...selectedFilters, brands: newBrands })
                  }}
                />
                <Label
                  htmlFor={`brand-${brand.value}`}
                  className="text-sm flex-1 cursor-pointer"
                >
                  {brand.label}
                </Label>
                {brand.count && (
                  <span className="text-xs text-muted-foreground">
                    {brand.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      {/* Families */}
      <div className="space-y-3">
        <h4 className="font-medium">Familias Olfativas</h4>
        <div className="space-y-2">
          {families.map((family) => (
            <div key={family.value} className="flex items-center space-x-2">
              <Checkbox
                id={`family-${family.value}`}
                checked={selectedFilters.families.includes(family.value)}
                onCheckedChange={(checked) => {
                  const newFamilies = checked
                    ? [...selectedFilters.families, family.value]
                    : selectedFilters.families.filter((f) => f !== family.value)
                  onFilterChange({ ...selectedFilters, families: newFamilies })
                }}
              />
              <Label
                htmlFor={`family-${family.value}`}
                className="text-sm flex-1 cursor-pointer"
              >
                {family.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Concentrations */}
      <div className="space-y-3">
        <h4 className="font-medium">Concentración</h4>
        <div className="space-y-2">
          {concentrations.map((concentration) => (
            <div
              key={concentration.value}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`concentration-${concentration.value}`}
                checked={selectedFilters.concentrations.includes(
                  concentration.value
                )}
                onCheckedChange={(checked) => {
                  const newConcentrations = checked
                    ? [
                        ...selectedFilters.concentrations,
                        concentration.value,
                      ]
                    : selectedFilters.concentrations.filter(
                        (c) => c !== concentration.value
                      )
                  onFilterChange({
                    ...selectedFilters,
                    concentrations: newConcentrations,
                  })
                }}
              />
              <Label
                htmlFor={`concentration-${concentration.value}`}
                className="text-sm flex-1 cursor-pointer"
              >
                {concentration.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Gender */}
      <div className="space-y-3">
        <h4 className="font-medium">Género</h4>
        <div className="space-y-2">
          {genders.map((gender) => (
            <div key={gender.value} className="flex items-center space-x-2">
              <Checkbox
                id={`gender-${gender.value}`}
                checked={selectedFilters.genders.includes(gender.value)}
                onCheckedChange={(checked) => {
                  const newGenders = checked
                    ? [...selectedFilters.genders, gender.value]
                    : selectedFilters.genders.filter((g) => g !== gender.value)
                  onFilterChange({ ...selectedFilters, genders: newGenders })
                }}
              />
              <Label
                htmlFor={`gender-${gender.value}`}
                className="text-sm flex-1 cursor-pointer"
              >
                {gender.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h3 className="text-lg font-semibold mb-4">Filtros</h3>
          <FilterContent />
        </div>
      </div>

      {/* Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="lg:hidden">
          <Button variant="outline" size="sm" className="mb-4">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 text-xs">
                *
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
