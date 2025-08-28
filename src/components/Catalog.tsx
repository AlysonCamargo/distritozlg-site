import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import urbanNightsImg from '@/assets/tshirt-urban-nights.jpg';
import neonDreamsImg from '@/assets/tshirt-neon-dreams.jpg';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos', count: 6 },
    { id: 'dry fit', name: 'Dry Fit', count: 0 },
    { id: 'malha egipcia', name: 'Malha Egípcia', count: 0 },
    { id: 'oversized', name: 'Over Sized', count: 6 },
  ];

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Off White',
      price: 79.90,
      image: 'https://i.imgur.com/yOReSmA.png',
      category: 'Over Sized',
      isNew: true,
    },
    {
      id: 2,
      name: 'The North',
      price: 79.90,
      image: 'https://i.imgur.com/FOS4m5o.jpeg',
      category: 'Over Sized',
      isNew: true,
    },
    {
      id: 3,
      name: 'Adidas',
      price: 79.90,
      image: 'https://i.imgur.com/BSAGk6W.jpeg',
      category: 'Over Sized',
    },
    {
      id: 4,
      name: 'Casa Blanca',
      price: 79.90,
      image: 'https://i.imgur.com/D2ZPDQJ.jpeg',
      category: 'Over Sized',
    },
    {
      id: 5,
      name: 'New Balance',
      price: 79.90,
      image: 'https://i.imgur.com/vPkQNhI.jpeg',
      category: 'Over Sized',
    },
    {
      id: 6,
      name: 'Supreme',
      price: 79.90,
      image: 'https://i.imgur.com/4HhzQUn.png',
      category: 'Over Sized',
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