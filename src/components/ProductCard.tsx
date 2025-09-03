import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  imageFront: string;
  imageBack: string;
  isNew?: boolean;
  size: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleBuyOnWhatsApp = () => {
    const phoneNumber = "5511972988072"; // WhatsApp em formato internacional (sem + e espaços)
    const message = `Olá! Tenho interesse no produto "${product.name}" (R$ ${product.price.toFixed(
      2
    )}). Ainda está disponível?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-card-urban">
      <div className="relative overflow-hidden">
        {/* Imagem frente/verso */}
        <img
          src={product.imageFront}
          alt={product.name}
          className="w-full h-80 object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.imageBack}
          alt={product.name}
          className="w-full h-80 object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Badge NOVO */}
        {product.isNew && (
          <Badge className="absolute top-3 left-3 bg-gradient-urban text-background font-bold">
            NOVO
          </Badge>
        )}

        {/* Botão favorito */}
        <button className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-accent-foreground">
          <Heart className="w-4 h-4" />
        </button>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Botão WhatsApp */}
        <Button
          size="sm"
          onClick={handleBuyOnWhatsApp}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-green-500 text-white hover:bg-green-600"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Comprar no WhatsApp
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-accent transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {product.category} • Tam: {product.size}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-accent">
            R$ {product.price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">À vista</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
