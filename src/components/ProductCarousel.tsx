import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Product } from "@/data/products";

const ProductCarousel = ({ product }: { product: Product }) => {
  const images = [product.imageFront, product.imageBack].filter(Boolean);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} className="w-full relative">
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx}>
              <img
                src={img}
                alt={`${product.name} - Imagem ${idx + 1}`}
                className="w-full h-auto rounded-sm shadow-sm"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
            <>
                <CarouselPrevious className="hidden md:flex left-4" />
                <CarouselNext className="hidden md:flex right-4" />
            </>
        )}
      </Carousel>

      {images.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
            {images.map((_, idx) => (
            <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${idx === current ? "bg-foreground" : "bg-border"}`}
            />
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
