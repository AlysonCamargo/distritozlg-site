import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Heart, ShoppingBag } from "lucide-react";

const BRL = (n: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

export default function WishlistDrawer() {
    const { isWishlistOpen, setIsWishlistOpen, items, removeFromWishlist } = useWishlist();
    const { addItem, setIsCartOpen } = useCart();

    const handleAddToCart = (product: any) => {
        addItem(product, product.size.split(",")[0].trim());
        setIsWishlistOpen(false);
        setIsCartOpen(true);
    };

    return (
        <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        Seus Favoritos
                    </SheetTitle>
                    <SheetDescription>
                        {items.length === 0 ? "Sua lista de favoritos está vazia." : `${items.length} itens salvos.`}
                    </SheetDescription>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
                        <Heart className="w-16 h-16 opacity-20" />
                        <p>Adicione produtos aos favoritos para vê-los aqui.</p>
                        <Button variant="outline" onClick={() => setIsWishlistOpen(false)}>
                            Continuar Navegando
                        </Button>
                    </div>
                ) : (
                    <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 py-4 border-b border-border/50">
                                    <div className="w-20 h-20 bg-secondary rounded-md overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground">Tamanho: {item.size}</p>
                                            <p className="font-medium mt-1">{BRL(item.price)}</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2">
                                            <Button
                                                size="sm"
                                                className="flex-1 gap-2"
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                                Adicionar
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </SheetContent>
        </Sheet>
    );
}
