"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const BRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFav = isInWishlist(product.id);

  const [frontLoaded, setFrontLoaded] = useState(false);
  const [backLoaded, setBackLoaded] = useState(false);

  const frontSrc = product.imageFront || product.image;
  const backSrc = product.imageBack || product.image;

  return (
    <motion.div whileHover={{ y: -4 }} className="group overflow-hidden bg-background hover:shadow-premium transition-all duration-300">
      <Card className="overflow-hidden border-transparent shadow-none hover:border-border transition-colors">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20">
          {!frontLoaded && (
            <div className="absolute inset-0 animate-pulse bg-secondary/30" aria-hidden="true" />
          )}
          <img
            src={frontSrc}
            alt={`Frente - ${product.name}`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            width={400}
            height={400}
            onLoad={() => setFrontLoaded(true)}
            onError={() => setFrontLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out ${frontLoaded ? "opacity-100" : "opacity-0"} group-hover:opacity-0`}
          />
          {backSrc && (
            <img
              src={backSrc}
              alt={`Costas - ${product.name}`}
              loading="lazy"
              decoding="async"
              width={400}
              height={400}
              onLoad={() => setBackLoaded(true)}
              onError={() => setBackLoaded(true)}
              className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 ${backLoaded ? "" : "will-change-opacity"}`}
            />
          )}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isSale && (
              <Badge variant="secondary" className="bg-foreground text-background font-medium rounded-sm px-2 py-0.5 text-[10px] tracking-wider uppercase">
                {t('product.sale')}
              </Badge>
            )}
            {product.isNew && (
              <Badge variant="secondary" className="bg-background/90 text-foreground font-medium rounded-sm px-2 py-0.5 text-[10px] tracking-wider uppercase backdrop-blur-sm">
                {t('product.new')}
              </Badge>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-pressed={isFav}
            aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-sm bg-background/80 backdrop-blur text-foreground transition-all hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Heart className={`h-4 w-4 ${isFav ? "fill-current text-foreground" : ""}`} />
            <span className="sr-only">Favorito</span>
          </button>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 opacity-0 bg-gradient-to-t from-background/80 to-transparent p-3 text-center text-foreground transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
            aria-hidden="true"
          >
            <span className="text-xs sm:text-sm">{t('product.hoverView')}</span>
          </div>
        </div>
        <CardContent className="p-4 pt-5">
          <h3 className="text-sm font-medium leading-tight line-clamp-1 font-heading uppercase tracking-wide">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <div className={`text-base font-medium ${product.isSale ? "text-destructive" : ""}`}>{BRL(product.price)}</div>
          </div>
          <div className="mt-4 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addItem(product, product.size.split(",")[0].trim());
              }}
              variant="outline"
              className="w-full text-xs uppercase tracking-wider h-9"
            >
              {t('product.addToCart')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}