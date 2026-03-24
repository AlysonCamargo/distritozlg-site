import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { categories } from "@/data/products";

interface CatalogFiltersProps {
    selectedCategory: string;
    setSelectedCategory: (id: string) => void;
    showOnlySale: boolean;
    setShowOnlySale: (show: boolean) => void;
    selectedSizes: string[];
    toggleSize: (size: string) => void;
    categoryCounts: Record<string, number>;
    className?: string;
}

export default function CatalogFilters({
    selectedCategory,
    setSelectedCategory,
    showOnlySale,
    setShowOnlySale,
    selectedSizes,
    toggleSize,
    categoryCounts,
    className = "",
}: CatalogFiltersProps) {
    return (
        <div className={className}>
            <div className="sticky top-24 space-y-8">
                {/* Categorias */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Categorias</h3>
                    <div className="space-y-1">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`w-full px-3 py-2 text-left transition-all flex items-center justify-between text-sm tracking-wider uppercase ${selectedCategory === category.id
                                        ? "font-semibold text-foreground border-l-2 border-foreground bg-secondary/20"
                                        : "text-muted-foreground font-medium hover:text-foreground hover:bg-secondary/10"
                                    }`}
                            >
                                <span>{category.name}</span>
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === category.id ? "bg-background/20" : "bg-secondary"
                                        }`}
                                >
                                    {categoryCounts[category.id] || 0}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filtros */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Filtros</h3>

                    {/* Promoções */}
                    <div className="mb-8">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div
                                className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${showOnlySale
                                        ? "bg-foreground border-foreground text-background"
                                        : "border-muted-foreground group-hover:border-foreground"
                                    }`}
                                onClick={() => setShowOnlySale(!showOnlySale)}
                            >
                                {showOnlySale && <X className="w-3 h-3" />}
                            </div>
                            <span className="text-xs uppercase tracking-widest font-semibold">Apenas Sale</span>
                        </label>
                    </div>

                    {/* Tamanhos */}
                    <div>
                        <h4 className="font-semibold text-xs mb-4 text-foreground uppercase tracking-widest">Tamanhos</h4>
                        <div className="grid grid-cols-4 gap-2">
                            {["P", "M", "G", "GG"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => toggleSize(s)}
                                    className={`aspect-square rounded-sm border text-xs font-semibold transition-all ${selectedSizes.includes(s)
                                            ? "bg-foreground text-background border-foreground"
                                            : "bg-transparent border-border hover:border-foreground text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
