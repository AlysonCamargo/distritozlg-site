import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'todos', name: 'Todos', count: 6 },
    { id: 'dry fit', name: 'Dry Fit', count: 0 },
    { id: 'malha egipcia', name: 'Malha Egípcia', count: 0 },
    { id: 'oversized', name: 'Over Sized', count: 6 },
  ];

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

  const filteredProducts =
    selectedCategory === 'todos'
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-black text-4xl md:text-6xl mb-6">
            <span className="text-foreground">NOSSO</span>
            <br />
            <span className="bg-gradient-urban bg-clip-text text-transparent">
              CATÁLOGO
            </span>
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
              variant={selectedCategory === category.id ? 'default' : 'outline'}
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
            <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
              <ProductCard product={product} />
            </div>
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

      {/* Modal de Detalhes */}
      {isModalOpen && selectedProduct && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-[0_0_20px_5px_var(--neon-green)] border border-gray-700 max-w-md w-full p-6 relative animate-fade-in transition-transform duration-300 text-white">
      
      {/* Botão de fechar */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
        aria-label="Fechar"
      >
        &times;
      </button>

      {/* Imagem do produto */}
      <div className="mb-4">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Informações do produto */}
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
        <p className="text-lg">
          <span className="font-semibold">Preço:</span> R$ {selectedProduct.price.toFixed(2)}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Categoria:</span> {selectedProduct.category}
        </p>
        {selectedProduct.isNew && (
          <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs rounded-full">
            Novo!
          </span>
        )}
        <p className="text-sm text-gray-300 mt-4 leading-relaxed">
          Esta camiseta é feita com materiais de alta qualidade, ideal para quem busca estilo e conforto no dia a dia urbano.
        </p>

        {/* Botão WhatsApp */}
        <a
          href={`https://wa.me/5511972988072?text=Olá! Tenho interesse na camiseta *${selectedProduct.name}* no valor de *R$ ${selectedProduct.price.toFixed(2)}*.`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 shadow-[0_0_10px_var(--neon-green)]"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  </div>
)}




    </section>
  );
};

export default Catalog;
