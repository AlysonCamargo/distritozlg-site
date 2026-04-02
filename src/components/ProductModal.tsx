import { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductCarousel from "./ProductCarousel";
import { Product, products } from "@/data/products";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const dialogRef = useRef<HTMLDivElement>(null);
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>("");

    const sizes = parseSizes(product?.size || "");

    useEffect(() => {
        if (isOpen && sizes.length > 0) {
            setSelectedSize(sizes[0]);
        }
    }, [isOpen, product]);

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
            <Helmet>
                <title>{product.name} | Distrito ZLG</title>
                <meta name="description" content={`Compre ${product.name} - ${product.category}. ${BRL(product.price)}.`} />
                <meta property="og:title" content={`${product.name} | Distrito ZLG`} />
                <meta property="og:description" content={`Compre ${product.name} - ${product.category}. ${BRL(product.price)}.`} />
                <meta property="og:image" content={product.image} />
            </Helmet>
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-title"
                className="max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn flex flex-col gap-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-background rounded-sm shadow-premium border border-border flex flex-col lg:flex-row overflow-hidden relative shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-foreground/50 hover:text-foreground z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors"
                        aria-label="Fechar"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Left: Image Carousel */}
                    <div className="w-full lg:w-1/2 bg-secondary/30 p-4 md:p-6 flex items-center justify-center">
                        <ProductCarousel product={product} />
                    </div>

                    {/* Right: Info */}
                    <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col">
                        <div className="mb-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="uppercase tracking-widest text-[10px] font-semibold text-muted-foreground">
                                    {t(`category.${product.category}`, product.category)}
                                </span>
                                {product.isNew && <Badge variant="secondary" className="px-2 py-0.5 text-[10px] rounded-sm font-medium tracking-widest uppercase">{t('product.new')}</Badge>}
                                {product.isSale && <Badge variant="destructive" className="bg-destructive text-destructive-foreground px-3 py-1 text-[10px] rounded-sm font-semibold tracking-widest uppercase shadow-sm border border-destructive/50 animate-pulse">{t('product.sale')}</Badge>}
                            </div>

                            <h3 id="product-title" className="text-3xl md:text-4xl font-light font-heading mb-4 leading-tight uppercase tracking-wide">
                                {product.name}
                            </h3>

                            <div className="flex items-baseline gap-3 mb-8">
                                <span className="text-2xl font-medium text-foreground">{BRL(product.price)}</span>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs uppercase tracking-widest font-semibold text-foreground">{t('catalog.sizes')}</span>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <span className="text-[10px] underline cursor-pointer text-muted-foreground hover:text-foreground uppercase tracking-widest">{t('product.sizeGuide')}</span>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-md z-[100]">
                                                <DialogHeader>
                                                    <DialogTitle className="uppercase tracking-widest font-heading text-xl">{t('product.sizeGuide')}</DialogTitle>
                                                    <DialogDescription>
                                                        Consulte as medidas aproximadas (em cm) para escolher o tamanho ideal.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="overflow-x-auto mt-4">
                                                    <table className="w-full text-sm text-center">
                                                        <thead className="bg-secondary/50 uppercase tracking-widest text-[10px]">
                                                            <tr>
                                                                <th className="px-4 py-3 text-left">Tamanho</th>
                                                                <th className="px-4 py-3">Tórax</th>
                                                                <th className="px-4 py-3">Comprimento</th>
                                                                <th className="px-4 py-3">Manga</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="border-b border-border">
                                                                <td className="px-4 py-3 font-medium text-left">P</td>
                                                                <td className="px-4 py-3">52</td>
                                                                <td className="px-4 py-3">70</td>
                                                                <td className="px-4 py-3">22</td>
                                                            </tr>
                                                            <tr className="border-b border-border bg-secondary/10">
                                                                <td className="px-4 py-3 font-medium text-left">M</td>
                                                                <td className="px-4 py-3">54</td>
                                                                <td className="px-4 py-3">72</td>
                                                                <td className="px-4 py-3">23</td>
                                                            </tr>
                                                            <tr className="border-b border-border">
                                                                <td className="px-4 py-3 font-medium text-left">G</td>
                                                                <td className="px-4 py-3">56</td>
                                                                <td className="px-4 py-3">74</td>
                                                                <td className="px-4 py-3">24</td>
                                                            </tr>
                                                            <tr className="border-b border-border bg-secondary/10">
                                                                <td className="px-4 py-3 font-medium text-left">GG</td>
                                                                <td className="px-4 py-3">58</td>
                                                                <td className="px-4 py-3">76</td>
                                                                <td className="px-4 py-3">25</td>
                                                            </tr>
                                                            <tr className="border-b border-border">
                                                                <td className="px-4 py-3 font-medium text-left">XG</td>
                                                                <td className="px-4 py-3">60</td>
                                                                <td className="px-4 py-3">78</td>
                                                                <td className="px-4 py-3">26</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-12 h-12 rounded-sm border flex items-center justify-center font-semibold text-sm transition-all
                                                    ${selectedSize === size
                                                        ? "bg-foreground text-background border-foreground"
                                                        : "bg-transparent border-border hover:border-foreground text-muted-foreground hover:text-foreground"}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-5 border border-border rounded-sm bg-secondary/10 flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                                        <span className="text-foreground">{t('product.shipping')}</span> / {t('product.returns')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-border">
                                <Button
                                    size="lg"
                                    onClick={() => {
                                        addItem(product, selectedSize);
                                        onClose();
                                    }}
                                    className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium text-sm tracking-widest uppercase h-14 rounded-sm"
                                >
                                    {t('product.addToCart')}
                                </Button>
                            </div>
                        </div>
                </div>

                {/* Related Products */}
                {/* Related Products */}
                <div className="w-full mt-4">
                    <h3 className="text-foreground tracking-widest uppercase font-semibold text-lg mb-6 flex items-center gap-3">
                        <span className="w-8 h-px bg-foreground"></span>
                        {t('product.completeLook')}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products
                            .filter(p => p.category === product.category && p.id !== product.id)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 4)
                            .map(related => (
                                <div
                                    key={related.id}
                                    className="group bg-background rounded-sm overflow-hidden cursor-pointer hover:shadow-premium transition-all duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = `/product/${related.id}`;
                                    }}
                                >
                                    <div className="aspect-[3/4] relative overflow-hidden bg-secondary/20">
                                        <img
                                            src={related.image}
                                            alt={related.name}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {related.isSale && (
                                            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm shadow-sm border border-destructive/50 animate-pulse">
                                                {t('product.sale')}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-medium text-xs uppercase tracking-wider line-clamp-1 group-hover:text-muted-foreground transition-colors">
                                            {related.name}
                                        </h4>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-sm font-semibold">{BRL(related.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
