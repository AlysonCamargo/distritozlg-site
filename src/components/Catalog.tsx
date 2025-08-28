import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import urbanNightsImg from '@/assets/tshirt-urban-nights.jpg';
import neonDreamsImg from '@/assets/tshirt-neon-dreams.jpg';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos', count: 12 },
    { id: 'basicas', name: 'Básicas', count: 4 },
    { id: 'graficas', name: 'Gráficas', count: 5 },
    { id: 'limitadas', name: 'Edição Limitada', count: 3 },
  ];

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Urban Nights',
      price: 89.90,
      image: urbanNightsImg,
      category: 'Gráficas',
      isNew: true,
    },
    {
      id: 2,
      name: 'Neon Dreams',
      price: 94.90,
      image: neonDreamsImg,
      category: 'Edição Limitada',
      isNew: true,
    },
    {
      id: 3,
      name: 'Street Classic',
      price: 79.90,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=512&h=512&fit=crop',
      category: 'Básicas',
    },
    {
      id: 4,
      name: 'Cyber Wave',
      price: 99.90,
      image: 'https://images.unsplash.com/photo-1571455786673-2491d2b2d3df?w=512&h=512&fit=crop',
      category: 'Gráficas',
    },
    {
      id: 5,
      name: 'Minimal Vibe',
      price: 74.90,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=512&h=512&fit=crop',
      category: 'Básicas',
    },
    {
      id: 6,
      name: 'Graffiti Soul',
      price: 104.90,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=512&h=512&fit=crop',
      category: 'Edição Limitada',
      isNew: true,
    },
  ];

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === selectedCategory);

  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-black text-4xl md:text-6xl mb-6">
            <span className="text-foreground">NOSSO</span>
            <br />
            <span className="bg-gradient-urban bg-clip-text text-transparent">CATÁLOGO</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada peça é uma declaração. Encontre a camiseta que combina com seu estilo urbano.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? 'bg-gradient-urban text-background hover:shadow-glow'
                  : 'border-accent text-accent hover:bg-accent hover:text-accent-foreground'
              } font-medium transition-all duration-300`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 bg-secondary text-secondary-foreground">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold px-8 py-4"
          >
            Ver Mais Produtos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Catalog;