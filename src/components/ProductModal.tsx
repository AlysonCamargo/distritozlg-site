import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCarousel from "./ProductCarousel";
import { Product } from "@/data/products";

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const BRL = (n: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

const parseSizes = (s: string): string[] =>
    s
        .split(/[,\s]+/g)
        .map((x) => x.replace(/[^A-Za-z]/g, "").toUpperCase())
        .filter(Boolean);

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Tab" && dialogRef.current) {
                const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (!first || !last) return;
                if (e.shiftKey && document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener("keydown", onKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // focus on title
        dialogRef.current?.querySelector<HTMLElement>("#product-title")?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow || "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={onClose}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-title"
                className="bg-background rounded-2xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn flex flex-col md:flex-row overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-foreground/50 hover:text-foreground z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors"
                    aria-label="Fechar"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Image Carousel */}
                <div className="w-full md:w-1/2 bg-secondary/30 p-6 flex items-center justify-center">
                    <ProductCarousel product={product} />
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                    <div className="mb-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="outline" className="uppercase tracking-wider text-[10px]">
                                {product.category}
                            </Badge>
                            {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">Novo</Badge>}
                            {product.isSale && <Badge variant="destructive">Promoção</Badge>}
                        </div>

                        <h3 id="product-title" className="text-3xl font-black font-heading mb-2 leading-tight">
                            {product.name}
                        </h3>

                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-2xl font-bold text-foreground">{BRL(product.price)}</span>
                            <span className="text-sm text-muted-foreground">à vista</span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <span className="text-sm font-medium text-muted-foreground block mb-2">Tamanhos Disponíveis</span>
                                <div className="flex flex-wrap gap-2">
                                    {parseSizes(product.size).map((size) => (
                                        <div
                                            key={size}
                                            className="w-10 h-10 rounded border border-border flex items-center justify-center font-medium text-sm"
                                        >
                                            {size}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-secondary/30 rounded-lg text-sm text-muted-foreground">
                                <p>🚚 Frete grátis para compras acima de R$ 299</p>
                                <p className="mt-2">🔄 Troca grátis em até 7 dias</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                        {(() => {
                            const text = `Olá! Tenho interesse no produto *${product.name}* no valor de *${BRL(
                                product.price
                            )}*.`;
                            const wa = `https://wa.me/5511972988072?text=${encodeURIComponent(text)}`;
                            return (
                                <a href={wa} target="_blank" rel="noopener noreferrer">
                                    <Button
                                        size="lg"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-14 gap-2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path d="M20 2H4C2.9 2 2 2.9 2 4v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                                        </svg>
                                        COMPRAR NO WHATSAPP
                                    </Button>
                                </a>
                            );
                        })()}
                        <p className="text-center text-xs text-muted-foreground mt-3">
                            Você será redirecionado para o WhatsApp para finalizar a compra.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
