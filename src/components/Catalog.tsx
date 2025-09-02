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
    { id: 'todos', name: 'Todos', count: 67 },
    { id: 'malha egipcia', name: 'Malha Egípcia', count: 12 },
    { id: 'oversized', name: 'Oversized', count: 44 },
    { id: 'calça cargo', name: 'Calça Cargo', count: 5},
    { id: 'regatas', name: 'Regatas', count: 1},
    { id: 'caneladas', name: 'Caneladas', count: 1},
    { id: 'shorts moletom', name: 'Shorts Moletom', count: 3},
    { id: 'shorts dry fit', name: 'Shorts Dry fit', count: 1},
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
      id: 19,
      name: 'Nike Bordada Verde (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 20,
      name: 'Casa Blanca Pilar (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 21,
      name: 'Nike Marrom (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 22,
      name: 'Nike Air Preta (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 23,
      name: 'Travis Mostarda (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 24,
      name: 'Travis Bege (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 25,
      name: 'Abathing (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 26,
      name: 'Casa Blanca Drinks (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 27,
      name: 'Jordan Bege (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 28,
      name: 'Adidas Verde (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 29,
      name: 'PALM ANGELS Asa Branca (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 30,
      name: 'Adidas Tenis (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 31,
      name: 'Adidas Jerry (G)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'G',
    },
    {
      id: 32,
      name: 'Neymar (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 33,
      name: 'Balenciaga Street (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 34,
      name: 'Nike Just Do It (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 35,
      name: 'Palm Angels Horizontal (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 36,
      name: 'Palm Angels Rosa (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 37,
      name: 'Adidas Ronkib (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 38,
      name: 'Casa Blanca Praia (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 39,
      name: 'Off White X (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 40,
      name: 'The North Preta (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 41,
      name: 'Adidas Branca (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 42,
      name: 'LA Asa (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 43,
      name: 'Los Angeles 32 (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 44,
      name: 'Adidas Logo Giga (GG)',
      price: 79.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 45,
      name: 'Calça Cargo Azul Clara (G)',
      price: 109.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'calça cargo',
      size: 'G',
    },
    {
      id: 46,
      name: 'Calça Cargo Preta (P) (M) (G)',
      price: 109.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'calça cargo',
      size: 'P M G',
    },
    {
      id: 47,
      name: 'Calça Cargo Azul Escuro (M) (G) (GG)',
      price: 109.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'calça cargo',
      size: 'M G GG',
    },
    {
      id: 48,
      name: 'Calça Cargo Preta Linhas Brancas (G)',
      price: 109.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'calça cargo',
      size: 'G',
    },
    {
      id: 49,
      name: 'Calça Cargo Grafite (M) (G) (GG)',
      price: 109.99,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'calça cargo',
      size: 'M G GG',
    },
    {
      id: 50,
      name: 'Regata Canelada (P)',
      price: 65.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'regatas',
      size: 'P',
    },
    {
      id: 51,
      name: 'Camiseta Canelada (M) (G)',
      price: 65.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'caneladas',
      size: 'M G',
    },
    {
      id: 52,
      name: 'Short Moletom Nike Cinza (G)',
      price: 70.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'shorts moletom',
      size: 'G',
    },
    {
      id: 53,
      name: 'Short Moletom Nike Branco (G)',
      price: 70.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'shorts moletom',
      size: 'G',
    },
    {
      id: 54,
      name: 'Short Moletom Nike Preto (G)',
      price: 70.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'shorts moletom',
      size: 'G',
    },
    {
      id: 55,
      name: 'Short Dry Fit Nike Preto (G)',
      price: 65.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'shorts dry fit',
      size: 'G',
    },
    {
      id: 56,
      name: 'Camiseta Diesel (P)',
      price: 60.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'malha egipcia',
      size: 'P',
    },
    {
      id: 57,
      name: 'Camiseta Boss Branca Logo Pequeno (M)',
      price: 60.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'malha egipcia',
      size: 'M',
    },
    {
      id: 58,
      name: 'Camiseta Diesel Bege Logo Esquerdo (P)',
      price: 60.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'malha egipcia',
      size: 'P',
    },
    {
      id: 59,
      name: 'Camiseta Diesel Branca Logo Giga (M)',
      price: 60.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'malha egipcia',
      size: 'M',
    },
    {
      id: 60,
      name: 'Camiseta Diesel Bege Logo Pequeno (M)',
      price: 60.00,
      image: '',
      imageFront: '',
      imageBack: '',
      category: 'malha egipcia',
      size: 'M',
    },
    {
      id: 61,
      name: 'Camiseta Boss Bege Logo Esq Pequeno (M)',
      price: 60.00,
      image: 'https://drive.google.com/uc?export=view&id=1I-fr2GUj5AdN17wrnMoRlpiA3fYIRRc3',
      imageFront: 'https://drive.google.com/uc?export=view&id=1I-fr2GUj5AdN17wrnMoRlpiA3fYIRRc3',
      imageBack: 'https://drive.google.com/uc?export=view&id=18ZwkXtILlebrAUJnMSFdat78BiLcyOv5',
      category: 'malha egipcia',
      size: 'M',
    },
    {
      id: 62,
      name: 'Camiseta Boss Branca Logo Medio Direito (P)',
      price: 60.00,
      image: 'https://drive.google.com/uc?export=view&id=1sfOAza4739TZASR9NCfe_YFBRb0DNI_S',
      imageFront: 'https://drive.google.com/uc?export=view&id=1sfOAza4739TZASR9NCfe_YFBRb0DNI_S',
      imageBack: 'https://drive.google.com/uc?export=view&id=1_bmYvSMYfG1bmDcykXGaF5a5aySu1T8n',
      category: 'malha egipcia',
      size: 'P',
    },
    {
      id: 63,
      name: 'Camiseta Boss Preta Logo Pequeno (P)',
      price: 60.00,
      image: 'https://drive.google.com/uc?export=view&id=1vLuo_ybThOSR4bZD-Y84XDbCF51hiADR',
      imageFront: 'https://drive.google.com/uc?export=view&id=1vLuo_ybThOSR4bZD-Y84XDbCF51hiADR',
      imageBack: 'https://drive.google.com/uc?export=view&id=1two5aPI9ViFLMhLItWCwx_C-ogz6j3mX',
      category: 'malha egipcia',
      size: 'P',
    },
    {
      id: 64,
      name: 'Camiseta Diesel Branca D Vermelho (P)',
      price: 60.00,
      image: 'https://drive.google.com/uc?export=view&id=1isIj38GDHaPKqaaQoBS_m8_GHLS-8SlZ',
      imageFront: 'https://drive.google.com/uc?export=view&id=1isIj38GDHaPKqaaQoBS_m8_GHLS-8SlZ',
      imageBack: 'https://drive.google.com/uc?export=view&id=1eJK-eX9v6i6Fe3Bc6PmsEfOEVRa8RxCI',
      category: 'malha egipcia',
      size: 'P',
    },
    {
      id: 65,
      name: 'Camiseta Boss Bege Logo Branco (P)',
      price: 60.00,
      image: 'https://drive.google.com/uc?export=view&id=1iZHqdO0-oRbbzb0K0fTuRXUHsXCmxccH',
      imageFront: 'https://drive.google.com/uc?export=view&id=1iZHqdO0-oRbbzb0K0fTuRXUHsXCmxccH',
      imageBack: 'https://drive.google.com/uc?export=view&id=1ffAuR534bYtx8Rgu2VrsrQeIyKJbDLN9',
      category: 'malha egipcia',
      size: 'P',
    },
    {
      id: 66,
      name: 'Camiseta Boss Marrom Logo Peluciado (G)',
      price: 60.00,
      image: 'https://drive.google.com/uc?export=view&id=1JYAF051rs1itaPuOLGb8kH8u17lsw_JK',
      imageFront: 'https://drive.google.com/uc?export=view&id=1JYAF051rs1itaPuOLGb8kH8u17lsw_JK',
      imageBack: 'https://drive.google.com/uc?export=view&id=1FSF4ruaGynVtmnkz2z7tj3obPxmHADgJ',
      category: 'malha egipcia',
      size: 'G',
    },
    {
      id: 67,
      name: 'Camiseta Diesel Branca Logo Pequeno (G)',
      price: 60.00,
      image: 'https://drive.google.com/uc?export=view&id=1zWB7cQ_k70zDOrDozMHVdpQlTbgRRIoS',
      imageFront: 'https://drive.google.com/uc?export=view&id=1zWB7cQ_k70zDOrDozMHVdpQlTbgRRIoS',
      imageBack: 'https://drive.google.com/uc?export=view&id=1mF8l6n_N6jaBszQ_5fC-XZYo7xEfMnTU',
      category: 'malha egipcia',
      size: 'G',
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
