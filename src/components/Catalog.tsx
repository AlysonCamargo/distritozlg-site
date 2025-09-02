import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCarousel from './ProductCarousel';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'todos', name: 'Todos', count: 6 },
    { id: 'dry fit', name: 'Dry Fit', count: 0 },
    { id: 'malha egipcia', name: 'Malha Egípcia', count: 0 },
    { id: 'oversized', name: 'Oversized', count: 6 },
  ];

  const products = [
    {
      id: 1,
      name: 'Off White',
      price: 79.90,
      image: 'https://i.imgur.com/yOReSmA.png',
      imageFront: 'https://i.imgur.com/yOReSmA.png',
      imageBack: 'https://i.imgur.com/7qAKAXl.jpeg',
      category: 'oversized',
    },
    {
      id: 2,
      name: 'The North',
      price: 79.90,
      image: 'https://i.imgur.com/FOS4m5o.jpeg',
      imageFront: 'https://i.imgur.com/FOS4m5o.jpeg',
      imageBack: 'https://i.imgur.com/q3ssR3Q.jpeg',
      category: 'oversized',
    },
    {
      id: 3,
      name: 'Adidas',
      price: 79.90,
      image: 'https://i.imgur.com/BSAGk6W.jpeg',
      imageFront: 'https://i.imgur.com/BSAGk6W.jpeg',
      imageBack: 'https://i.imgur.com/yU7ufKw.jpeg',
      category: 'oversized',
    },
    {
      id: 4,
      name: 'Casa Blanca',
      price: 79.90,
      image: 'https://i.imgur.com/D2ZPDQJ.jpeg',
      imageFront: 'https://i.imgur.com/D2ZPDQJ.jpeg',
      imageBack: 'https://i.imgur.com/F1rsV9n.jpeg',
      category: 'oversized',
    },
    {
      id: 5,
      name: 'New Balance',
      price: 79.90,
      image: 'https://i.imgur.com/vPkQNhI.jpeg',
      imageFront: 'https://i.imgur.com/vPkQNhI.jpeg',
      imageBack: 'https://i.imgur.com/LOuk17w.jpeg',
      category: 'oversized',
    },
    {
      id: 6,
      name: 'Supreme',
      price: 79.90,
      image: 'https://i.imgur.com/4HhzQUn.jpeg',
      imageFront: 'https://i.imgur.com/4HhzQUn.png',
      imageBack: 'https://i.imgur.com/jOeV4L9.jpeg',
      category: 'oversized',
    },
    {
      id: 7,
      name: 'Adidas 2',
      price: 79.90,
      image: 'https://i.imgur.com/cAYrtzY.jpeg',
      imageFront: 'https://i.imgur.com/cAYrtzY.jpeg',
      imageBack: 'https://i.imgur.com/1cGpPr3.jpeg',
      category: 'oversized',
    },
    {
      id: 8,
      name: 'Adidas Oeste (P)',
      price: 79.90,
      image: 'https://i.imgur.com/1p6YCx1.png',
      imageFront: 'https://i.imgur.com/1p6YCx1.png',
      imageBack: 'https://i.imgur.com/YECNULC.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 9,
      name: 'Casa Blanca Air (P)',
      price: 79.90,
      image: 'https://i.imgur.com/e6M5pIv.png',
      imageFront: 'https://i.imgur.com/e6M5pIv.png',
      imageBack: 'https://i.imgur.com/e6M5pIv.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 10,
      name: 'Adidas Bordada (P)',
      price: 79.90,
      image: 'https://i.imgur.com/PA0Z5AE.png',
      imageFront: 'https://i.imgur.com/PA0Z5AE.png',
      imageBack: 'https://i.imgur.com/PA0Z5AE.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 11,
      name: 'Nike Sombras (M)',
      price: 79.90,
      image: 'https://i.imgur.com/Fq8DnNj.png',
      imageFront: 'https://i.imgur.com/Fq8DnNj.png',
      imageBack: 'https://i.imgur.com/6nwNbuM.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 12,
      name: 'Palm Angels Asas (M)',
      price: 79.90,
      image: 'https://i.imgur.com/ssYI4Sz.png',
      imageFront: 'https://i.imgur.com/ssYI4Sz.png',
      imageBack: 'https://i.imgur.com/bIYp6eL.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 13,
      name: 'Adidas Logo (M)',
      price: 79.90,
      image: 'https://i.imgur.com/q4bGbT5.png',
      imageFront: 'https://i.imgur.com/q4bGbT5.png',
      imageBack: 'https://i.imgur.com/q4bGbT5.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 14,
      name: 'Lacoste (M) (G)',
      price: 79.90,
      image: 'https://i.imgur.com/1seksbz.png',
      imageFront: 'https://i.imgur.com/1seksbz.png',
      imageBack: 'https://i.imgur.com/1seksbz.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 15,
      name: 'Palm Angels Olho (M)',
      price: 79.90,
      image: 'https://i.imgur.com/7NjoZ6Y.png',
      imageFront: 'https://i.imgur.com/7NjoZ6Y.png',
      imageBack: 'https://i.imgur.com/hkQZv9N.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 16,
      name: 'Off White Pinóquio (M)',
      price: 79.90,
      image: 'https://i.imgur.com/5d0Kk57.png',
      imageFront: 'https://i.imgur.com/5d0Kk57.png',
      imageBack: 'https://i.imgur.com/XQJPbav.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 17,
      name: 'Air Bordado (M)',
      price: 79.90,
      image: 'https://i.imgur.com/nVkpglz.png',
      imageFront: 'https://i.imgur.com/nVkpglz.png',
      imageBack: 'https://i.imgur.com/nVkpglz.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 18,
      name: 'Balenciaga Bandida (G)',
      price: 79.90,
      image: 'https://i.imgur.com/ilCkz1B.png',
      imageFront: 'https://i.imgur.com/ilCkz1B.png',
      imageBack: 'https://i.imgur.com/g8ADkCx.png',
      category: 'oversized',
      isNew: true,
    },
    {
      id: 18,
      name: 'Balenciaga Bandida (G)',
      price: 79.90,
      image: 'https://i.imgur.com/ilCkz1B.png',
      imageFront: 'https://i.imgur.com/ilCkz1B.png',
      imageBack: 'https://i.imgur.com/g8ADkCx.png',
      category: 'oversized',
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

      {/* Carrossel frente/costas */}
      <ProductCarousel product={selectedProduct} />

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
