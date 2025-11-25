"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Filter, X, Grid, List, Search, SlidersHorizontal } from "lucide-react";
import { products, categories, Product } from "@/data/products";

// ===== Utilitários =====
const strip = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const parseSizes = (s: string): string[] =>
  s
    .split(/[,\s]+/g)
    .map((x) => x.replace(/[^A-Za-z]/g, "").toUpperCase())
    .filter(Boolean);

type SortKey = "relevance" | "price-asc" | "price-desc" | "name-asc" | "newest";

const ITEMS_PER_PAGE = 12;

export default function Catalog() {
  // Estado
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtersRef = useRef<HTMLDivElement>(null);

  // Check for URL search param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setSearchTerm(q);
    }
  }, []);

  // Fechar filtros ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===== Contagem por categoria (considera busca + tamanhos) =====
  const categoryCounts = useMemo(() => {
    const q = strip(searchTerm);
    const bySearch = (p: Product) => strip(p.name).includes(q);
    const bySizes = (p: Product) =>
      selectedSizes.length === 0 ||
      selectedSizes.some((s) => parseSizes(p.size || "").includes(s.toUpperCase()));
    const bySale = (p: Product) => !showOnlySale || p.isSale;

    const base = products.filter((p) => bySearch(p) && bySizes(p) && bySale(p));
    const counts: Record<string, number> = { todos: base.length };

    categories.forEach((c) => {
      if (c.id !== "todos") {
        if (c.id === "promocoes") {
          counts[c.id] = base.filter((p) => p.isSale).length;
        } else {
          counts[c.id] = base.filter((p) => strip(p.category) === strip(c.id)).length;
        }
      }
    });

    return counts;
  }, [searchTerm, selectedSizes, showOnlySale]);

  // ===== Filtro + ordenação =====
  const filteredProducts = useMemo(() => {
    const q = strip(searchTerm);

    const matchesCategory = (p: Product) => {
      if (selectedCategory === "todos") return true;
      if (selectedCategory === "promocoes") return p.isSale;
      return strip(p.category) === strip(selectedCategory);
    };

    const matchesSearch = (p: Product) => strip(p.name).includes(q);

    const matchesSizes = (p: Product) =>
      selectedSizes.length === 0 ||
      selectedSizes.some((s) => parseSizes(p.size || "").includes(s.toUpperCase()));

    const matchesSale = (p: Product) => !showOnlySale || p.isSale;

    let result = products.filter((p) =>
      matchesCategory(p) &&
      matchesSearch(p) &&
      matchesSizes(p) &&
      matchesSale(p)
    );

    const sortRelevance = (a: Product, b: Product) => {
      const isASale = a.isSale ? 1 : 0;
      const isBSale = b.isSale ? 1 : 0;

      if (isASale !== isBSale) {
        return isBSale - isASale; // Promos first
      }

      const isANew = a.isNew ? 1 : 0;
      const isBNew = b.isNew ? 1 : 0;

      if (isANew !== isBNew) {
        return isBNew - isANew; // New items next
      }

      return 0; // Maintain original order for others
    };

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "relevance":
      default:
        result.sort(sortRelevance);
        break;
    }

    return result;
  }, [selectedCategory, searchTerm, selectedSizes, sort, showOnlySale]);

  // Paginação incremental
  const productsToShow = useMemo(() => filteredProducts.slice(0, visibleItems), [filteredProducts, visibleItems]);
  const hasMoreItems = visibleItems < filteredProducts.length;

  // Handlers
  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const loadMore = () => setVisibleItems((prev) => prev + ITEMS_PER_PAGE);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleItems(ITEMS_PER_PAGE);
    setShowFilters(false);
  };

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSizes([]);
    setSelectedCategory("todos");
    setSort("relevance");
    setShowOnlySale(false);
    setVisibleItems(ITEMS_PER_PAGE);
  };

  // ===== Render =====
  return (
    <section id="catalog" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="font-heading font-black text-3xl md:text-5xl mb-2">
              <span className="text-foreground">NOSSO</span> <span className="text-transparent bg-clip-text bg-gradient-urban">CATÁLOGO</span>
            </h2>
            <p className="text-muted-foreground">
              Encontre seu estilo entre nossas {products.length} peças exclusivas.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Busca principal */}
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary border-border focus:border-accent pl-10 rounded-full"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Layout principal */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros laterais (desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categorias */}
              <div>
                <h3 className="font-bold text-lg mb-4">Categorias</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full px-3 py-2 rounded-lg text-left transition-all flex items-center justify-between text-sm ${selectedCategory === category.id
                        ? "bg-foreground text-background font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                    >
                      <span>{category.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === category.id ? "bg-background/20" : "bg-secondary"}`}>
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
                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showOnlySale ? "bg-accent border-accent" : "border-muted-foreground group-hover:border-accent"}`}
                      onClick={() => setShowOnlySale(!showOnlySale)}
                    >
                      {showOnlySale && <X className="w-3 h-3 text-accent-foreground" />}
                    </div>
                    <span className="text-sm font-medium">Apenas Promoções</span>
                  </label>
                </div>

                {/* Tamanhos */}
                <div>
                  <h4 className="font-medium text-sm mb-3 text-muted-foreground">Tamanhos</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {["P", "M", "G", "GG"].map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className={`aspect-square rounded-md border text-sm font-medium transition-all ${selectedSizes.includes(s)
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background border-border hover:border-foreground"
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

          {/* Conteúdo principal */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-secondary/30 p-3 rounded-xl">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground font-medium">
                  {filteredProducts.length} resultados
                </p>

                {/* Active Filters Pills */}
                {(selectedSizes.length > 0 || showOnlySale) && (
                  <div className="hidden lg:flex items-center gap-2">
                    <div className="h-4 w-px bg-border mx-2" />
                    {showOnlySale && (
                      <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setShowOnlySale(false)}>
                        Promoções <X className="w-3 h-3" />
                      </Badge>
                    )}
                    {selectedSizes.map(s => (
                      <Badge key={s} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleSize(s)}>
                        {s} <X className="w-3 h-3" />
                      </Badge>
                    ))}
                    <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground underline ml-2">
                      Limpar tudo
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer text-right"
                >
                  <option value="relevance">Relevância</option>
                  <option value="newest">Mais Recentes</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name-asc">Nome (A-Z)</option>
                </select>

                <div className="flex bg-background rounded-lg border border-border p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded ${viewMode === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded ${viewMode === "list" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Drawer */}
            {showFilters && (
              <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setShowFilters(false)}>
                <div
                  className="absolute right-0 top-0 bottom-0 w-[300px] bg-background border-l border-border p-6 overflow-y-auto animate-slideLeft"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl">Filtros</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Categorias</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`p-2 rounded-lg text-sm text-left border transition-all ${selectedCategory === category.id
                              ? "bg-foreground text-background border-foreground"
                              : "bg-background border-border"
                              }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Preço e Promoções</h4>
                      <button
                        onClick={() => setShowOnlySale(!showOnlySale)}
                        className={`w-full p-3 rounded-lg text-left border transition-all ${showOnlySale
                          ? "bg-accent/20 border-accent text-accent-foreground"
                          : "bg-background border-border"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>Apenas Promoções</span>
                          {showOnlySale && <Badge variant="default" className="bg-accent text-accent-foreground">Ativo</Badge>}
                        </div>
                      </button>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Tamanhos</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {["P", "M", "G", "GG"].map((s) => (
                          <button
                            key={s}
                            onClick={() => toggleSize(s)}
                            className={`aspect-square rounded-lg border text-sm font-medium transition-all ${selectedSizes.includes(s)
                              ? "bg-foreground text-background border-foreground"
                              : "bg-background border-border"
                              }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full mt-4" onClick={() => setShowFilters(false)}>
                      Ver {filteredProducts.length} resultados
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Grid de produtos */}
            {productsToShow.length > 0 ? (
              <>
                <div className={`grid gap-6 mb-12 ${viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
                  }`}>
                  {productsToShow.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="cursor-pointer"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {hasMoreItems && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={loadMore}
                      className="min-w-[200px]"
                    >
                      Carregar Mais
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-secondary/20 rounded-xl border border-dashed border-border">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mb-6">Tente ajustar seus filtros ou buscar por outro termo.</p>
                <Button onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal acessível */}
      <ProductModal
        product={selectedProduct!}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}