// ProductCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  imageFront: string;
  imageBack: string;
  isNew?: boolean;
  size: string; // Mantido como string (ex.: "P", "M G", "P, M G")
}

interface ProductCardProps {
  product: Product;
  /** Se true, força carregamento "eager" da imagem (use nos primeiros cards da página) */
  priority?: boolean;
}

const BRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [fav, setFav] = useState(false);
  const [frontLoaded, setFrontLoaded] = useState(false);
  const [backLoaded, setBackLoaded] = useState(false);

  const phoneNumber = "5511972988072"; // WhatsApp em formato internacional (sem +, sem espaços)
  const frontSrc = product.imageFront || product.image;
  const backSrc = product.imageBack || product.image;

  const handleBuyOnWhatsApp = () => {
    const message = `Olá! Tenho interesse no produto "${product.name}" (${BRL(
      product.price
    )}). Ainda está disponível?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="group overflow-hidden border hover:shadow-lg transition will-change-transform">
      {/* Área de imagem com aspecto quadrado */}
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        {/* Skeleton enquanto a frente não carrega */}
        {!frontLoaded && (
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-b from-neutral-800/30 to-neutral-700/30"
            aria-hidden="true"
          />
        )}

        {/* Imagem da frente */}
        <img
          src={frontSrc}
          alt={`Frente - ${product.name}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setFrontLoaded(true)}
          onError={() => setFrontLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out
                     ${frontLoaded ? "opacity-100" : "opacity-0"} group-hover:opacity-0`}
        />

        {/* Imagem do verso (aparece no hover) */}
        {backSrc && (
          <img
            src={backSrc}
            alt={`Costas - ${product.name}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setBackLoaded(true)}
            onError={() => setBackLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out
                       group-hover:opacity-100 ${backLoaded ? "" : "will-change-opacity"}`}
          />
        )}

        {/* Badge NOVO */}
        {product.isNew && (
          <Badge className="absolute left-2 top-2 bg-emerald-500 text-white shadow">
            NOVO
          </Badge>
        )}

        {/* Botão de favorito */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // evita abrir modal do catálogo
            setFav((v) => !v);
          }}
          aria-pressed={fav}
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full
                     bg-black/40 backdrop-blur text-white transition hover:bg-black/60 focus:outline-none
                     focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <Heart className={`h-5 w-5 ${fav ? "fill-current" : ""}`} />
          <span className="sr-only">Favorito</span>
        </button>

        {/* Overlay informativo (hover) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 opacity-0
                     bg-gradient-to-t from-black/70 to-transparent p-2 text-center text-white
                     transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
          aria-hidden="true"
        >
          <span className="text-xs sm:text-sm">Passe o mouse para ver o verso</span>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Título */}
        <h3 className="text-base font-semibold leading-tight line-clamp-1">{product.name}</h3>

        {/* Categoria e Tamanho */}
        <p className="mt-1 text-sm text-muted-foreground">
          {product.category} • Tam: {product.size}
        </p>

        {/* Preço */}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold">{BRL(product.price)}</div>
          <span className="text-xs text-muted-foreground">À vista</span>
        </div>

        {/* Ações */}
        <div className="mt-4 flex gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation(); // não abrir modal do catálogo
              handleBuyOnWhatsApp();
            }}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
          >
            Comprar no WhatsApp
          </Button>

          {/* "Ver detalhes": não intercepta o click, deixa o wrapper do catálogo abrir o modal */}
          <Button variant="outline" className="flex-1">
            Ver detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
