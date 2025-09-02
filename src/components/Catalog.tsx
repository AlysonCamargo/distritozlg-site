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
    { id: 'todos', name: 'Todos' },
    { id: 'malha egipcia', name: 'Malha Egípcia' },
    { id: 'oversized', name: 'Oversized' },
    { id: 'calça cargo', name: 'Calça Cargo' },
    { id: 'regatas', name: 'Regatas' },
    { id: 'caneladas', name: 'Caneladas' },
    { id: 'shorts moletom', name: 'Shorts Moletom' },
    { id: 'shorts dry fit', name: 'Shorts Dry fit' },
  ];

  const products = [
    {
      id: 1,
      name: 'Off White (GG)',
      price: 79.90,
      image: 'https://i.imgur.com/yOReSmA.png',
      imageFront: 'https://i.imgur.com/yOReSmA.png',
      imageBack: 'https://i.imgur.com/7qAKAXl.jpeg',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 2,
      name: 'The North (GG)',
      price: 79.90,
      image: 'https://i.imgur.com/FOS4m5o.jpeg',
      imageFront: 'https://i.imgur.com/FOS4m5o.jpeg',
      imageBack: 'https://i.imgur.com/q3ssR3Q.jpeg',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 3,
      name: 'Adidas (GG)',
      price: 79.90,
      image: 'https://i.imgur.com/BSAGk6W.jpeg',
      imageFront: 'https://i.imgur.com/BSAGk6W.jpeg',
      imageBack: 'https://i.imgur.com/yU7ufKw.jpeg',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 4,
      name: 'Casa Blanca (GG)',
      price: 79.90,
      image: 'https://i.imgur.com/D2ZPDQJ.jpeg',
      imageFront: 'https://i.imgur.com/D2ZPDQJ.jpeg',
      imageBack: 'https://i.imgur.com/F1rsV9n.jpeg',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 5,
      name: 'New Balance (GG)',
      price: 79.90,
      image: 'https://i.imgur.com/vPkQNhI.jpeg',
      imageFront: 'https://i.imgur.com/vPkQNhI.jpeg',
      imageBack: 'https://i.imgur.com/LOuk17w.jpeg',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 6,
      name: 'Supreme (GG)',
      price: 79.90,
      image: 'https://i.imgur.com/4HhzQUn.jpeg',
      imageFront: 'https://i.imgur.com/4HhzQUn.png',
      imageBack: 'https://i.imgur.com/jOeV4L9.jpeg',
      category: 'oversized',
      size: 'GG',
    },
    {
      id: 7,
      name: 'Adidas 2 (GG)',
      price: 79.90,
      image: 'https://i.imgur.com/cAYrtzY.jpeg',
      imageFront: 'https://i.imgur.com/cAYrtzY.jpeg',
      imageBack: 'https://i.imgur.com/1cGpPr3.jpeg',
      category: 'oversized',
      size: 'GG',
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
      size: 'P',
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
      size: 'P',
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
      size: 'P',
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
      size: 'M',
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
      size: 'M',
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
      size: 'M',
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
      size: 'M e G',
    },
    {
      id: 15,
      name: 'Palm Angels Olho (M)',
      price: 79.90,
      image: 'https://i.imgur.com/7NjoZ6Y.png',
      imageFront: 'https://i.imgur.com/7NjoZ6Y.png',
      imageBack: 'https://i.imgur.com/hkQZv9N.png',
      category: 'oversized',
      size: 'M',
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
      size: 'M',
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
      size: 'M',
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
      size: 'G',
      isNew: true,
    },
    {
      id: 19,
      name: 'Nike Bordada Verde (G)',
      price: 79.99,
      image: 'https://i.imgur.com/2MCtO1a.png',
      imageFront: 'https://i.imgur.com/2MCtO1a.png',
      imageBack: 'https://i.imgur.com/2MCtO1a.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 20,
      name: 'Casa Blanca Pilar (G)',
      price: 79.99,
      image: 'https://i.imgur.com/RUGyaNS.png',
      imageFront: 'https://i.imgur.com/RUGyaNS.png',
      imageBack: 'https://i.imgur.com/6We0zZT.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 21,
      name: 'Nike Marrom (G)',
      price: 79.99,
      image: 'https://i.imgur.com/owa3irz.png',
      imageFront: 'https://i.imgur.com/owa3irz.png',
      imageBack: 'https://i.imgur.com/HWUsW7X.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 22,
      name: 'Nike Air Preta (G)',
      price: 79.99,
      image: 'https://i.imgur.com/P9UAzE9.png',
      imageFront: 'https://i.imgur.com/P9UAzE9.png',
      imageBack: 'https://i.imgur.com/KCHLza7.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 23,
      name: 'Travis Mostarda (G)',
      price: 79.99,
      image: 'https://i.imgur.com/wz6eGVK.png',
      imageFront: 'https://i.imgur.com/wz6eGVK.png',
      imageBack: 'https://i.imgur.com/wz6eGVK.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 24,
      name: 'Travis Bege (G)',
      price: 79.99,
      image: 'https://i.imgur.com/CZdjuoW.png',
      imageFront: 'https://i.imgur.com/CZdjuoW.png',
      imageBack: 'https://i.imgur.com/CZdjuoW.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 25,
      name: 'Abathing (G)',
      price: 79.99,
      image: 'https://i.imgur.com/Y0nn5nc.png',
      imageFront: 'https://i.imgur.com/Y0nn5nc.png',
      imageBack: 'https://i.imgur.com/Y0nn5nc.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 26,
      name: 'Casa Blanca Drinks (G)',
      price: 79.99,
      image: 'https://i.imgur.com/B8hCEBJ.png',
      imageFront: 'https://i.imgur.com/B8hCEBJ.png',
      imageBack: 'https://i.imgur.com/VLFAcPC.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 27,
      name: 'Jordan Bege (G)',
      price: 79.99,
      image: 'https://i.imgur.com/djfWa3v.png',
      imageFront: 'https://i.imgur.com/djfWa3v.png',
      imageBack: 'https://i.imgur.com/djfWa3v.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 28,
      name: 'Adidas Verde (G)',
      price: 79.99,
      image: 'https://i.imgur.com/IZ4QCcK.png',
      imageFront: 'https://i.imgur.com/IZ4QCcK.png',
      imageBack: 'https://i.imgur.com/IZ4QCcK.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 29,
      name: 'PALM ANGELS Asa Branca (G)',
      price: 79.99,
      image: 'https://i.imgur.com/ybvN5mv.jpeg',
      imageFront: 'https://i.imgur.com/ybvN5mv.jpeg',
      imageBack: 'https://i.imgur.com/swIL5AX.jpeg',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 30,
      name: 'Adidas Tenis (G)',
      price: 79.99,
      image: 'https://i.imgur.com/alZhnji.jpeg',
      imageFront: 'https://i.imgur.com/alZhnji.jpeg',
      imageBack: 'https://i.imgur.com/HrMAlCr.jpeg',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 31,
      name: 'Adidas Jerry (G)',
      price: 79.99,
      image: 'https://i.imgur.com/Dd6Pthx.jpeg',
      imageFront: 'https://i.imgur.com/Dd6Pthx.jpeg',
      imageBack: 'https://i.imgur.com/klgJBer.jpeg',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 32,
      name: 'Neymar (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/My9k0UL.jpeg',
      imageFront: 'https://i.imgur.com/My9k0UL.jpeg',
      imageBack: 'https://i.imgur.com/My9k0UL.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 33,
      name: 'Balenciaga Street (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/4DulVku.jpeg',
      imageFront: 'https://i.imgur.com/4DulVku.jpeg',
      imageBack: 'https://i.imgur.com/acucggJ.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 34,
      name: 'Nike Just Do It (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/pq4gQ93.jpeg',
      imageFront: 'https://i.imgur.com/pq4gQ93.jpeg',
      imageBack: 'https://i.imgur.com/LHM7ca1.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 35,
      name: 'Palm Angels Horizontal (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/leUFeC3.jpeg',
      imageFront: 'https://i.imgur.com/leUFeC3.jpeg',
      imageBack: 'https://i.imgur.com/P7lkxpx.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 36,
      name: 'Palm Angels Rosa (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/hc6P3Js.jpeg',
      imageFront: 'https://i.imgur.com/hc6P3Js.jpeg',
      imageBack: 'https://i.imgur.com/eDDOLQb.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 37,
      name: 'Adidas Ronkib (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/UDFDixY.jpeg',
      imageFront: 'https://i.imgur.com/UDFDixY.jpeg',
      imageBack: 'https://i.imgur.com/H4cVTgV.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 38,
      name: 'Casa Blanca Praia (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/iA75Yqz.jpeg',
      imageFront: 'https://i.imgur.com/iA75Yqz.jpeg',
      imageBack: 'https://i.imgur.com/LQTGUpx.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 39,
      name: 'Off White X (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/ffsnOic.jpeg',
      imageFront: 'https://i.imgur.com/ffsnOic.jpeg',
      imageBack: 'https://i.imgur.com/uGWqTUk.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 40,
      name: 'The North Preta (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/tPgpHEy.jpeg',
      imageFront: 'https://i.imgur.com/tPgpHEy.jpeg',
      imageBack: 'https://i.imgur.com/djbK26M.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 41,
      name: 'Adidas Branca (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/SbihkTZ.jpeg',
      imageFront: 'https://i.imgur.com/SbihkTZ.jpeg',
      imageBack: 'https://i.imgur.com/dG5BxYE.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 42,
      name: 'LA Asa (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/lJmLCYc.jpeg',
      imageFront: 'https://i.imgur.com/lJmLCYc.jpeg',
      imageBack: 'https://i.imgur.com/60VGWfr.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 43,
      name: 'Los Angeles 32 (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/bNnjDQ0.jpeg',
      imageFront: 'https://i.imgur.com/bNnjDQ0.jpeg',
      imageBack: 'https://i.imgur.com/bNnjDQ0.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 44,
      name: 'Adidas Logo Giga (GG)',
      price: 79.99,
      image: 'https://i.imgur.com/JQGw7VA.jpeg',
      imageFront: 'https://i.imgur.com/JQGw7VA.jpeg',
      imageBack: 'https://i.imgur.com/JQGw7VA.jpeg',
      category: 'oversized',
      size: 'GG',
      isNew: true,
    },
    {
      id: 45,
      name: 'Calça Cargo Azul Clara (G)',
      price: 109.99,
      image: 'https://i.imgur.com/1glUoYs.jpeg',
      imageFront: 'https://i.imgur.com/1glUoYs.jpeg',
      imageBack: 'https://i.imgur.com/iRgcBS1.jpeg',
      category: 'calça cargo',
      size: 'G',
      isNew: true,
    },
    {
      id: 46,
      name: 'Calça Cargo Preta (P) (M) (G)',
      price: 109.99,
      image: 'https://i.imgur.com/TIc0vP0.jpeg',
      imageFront: 'https://i.imgur.com/TIc0vP0.jpeg',
      imageBack: 'https://i.imgur.com/L1Tw415.jpeg',
      category: 'calça cargo',
      size: 'P M G',
      isNew: true,
    },
    {
      id: 47,
      name: 'Calça Cargo Azul Escuro (M) (G) (GG)',
      price: 109.99,
      image: 'https://i.imgur.com/pEUwDz8.jpeg',
      imageFront: 'https://i.imgur.com/pEUwDz8.jpeg',
      imageBack: 'https://i.imgur.com/rKj2JfR.jpeg',
      category: 'calça cargo',
      size: 'M G GG',
      isNew: true,
    },
    {
      id: 48,
      name: 'Calça Cargo Preta Linhas Brancas (G)',
      price: 109.99,
      image: 'https://i.imgur.com/6mNgsTa.jpeg',
      imageFront: 'https://i.imgur.com/6mNgsTa.jpeg',
      imageBack: 'https://i.imgur.com/1ICcYK0.jpeg',
      category: 'calça cargo',
      size: 'G',
      isNew: true,
    },
    {
      id: 49,
      name: 'Calça Cargo Grafite (M) (G) (GG)',
      price: 109.99,
      image: 'https://i.imgur.com/dpqsfQ1.jpeg',
      imageFront: 'https://i.imgur.com/dpqsfQ1.jpeg',
      imageBack: 'https://i.imgur.com/mVpyDqr.jpeg',
      category: 'calça cargo',
      size: 'M G GG',
      isNew: true,
    },
    {
      id: 50,
      name: 'Regata Canelada (P)',
      price: 65.00,
      image: 'https://i.imgur.com/PIMsnzg.jpeg',
      imageFront: 'https://i.imgur.com/PIMsnzg.jpeg',
      imageBack: 'https://i.imgur.com/DX3sV7g.jpeg',
      category: 'regatas',
      size: 'P',
      isNew: true,
    },
    {
      id: 51,
      name: 'Camiseta Canelada (M) (G)',
      price: 65.00,
      image: 'https://i.imgur.com/TBWXZ5V.jpeg',
      imageFront: 'https://i.imgur.com/TBWXZ5V.jpeg',
      imageBack: 'https://i.imgur.com/TBWXZ5V.jpeg',
      category: 'caneladas',
      size: 'M G',
      isNew: true,
    },
    {
      id: 52,
      name: 'Short Moletom Nike Cinza (G)',
      price: 70.00,
      image: 'https://i.imgur.com/YwvEL2m.jpeg',
      imageFront: 'https://i.imgur.com/YwvEL2m.jpeg',
      imageBack: 'https://i.imgur.com/YwvEL2m.jpeg',
      category: 'shorts moletom',
      size: 'G',
      isNew: true,
    },
    {
      id: 53,
      name: 'Short Moletom Nike Branco (G)',
      price: 70.00,
      image: 'https://i.imgur.com/Lq0AxC3.jpeg',
      imageFront: 'https://i.imgur.com/Lq0AxC3.jpeg',
      imageBack: 'https://i.imgur.com/v8JKJTt.jpeg',
      category: 'shorts moletom',
      size: 'G',
      isNew: true,
    },
    {
      id: 54,
      name: 'Short Moletom Nike Preto (G)',
      price: 70.00,
      image: 'https://i.imgur.com/P1MD307.jpeg',
      imageFront: 'https://i.imgur.com/P1MD307.jpeg',
      imageBack: 'https://i.imgur.com/AnfXAdO.jpeg',
      category: 'shorts moletom',
      size: 'G',
      isNew: true,
    },
    {
      id: 55,
      name: 'Short Dry Fit Nike Preto (G)',
      price: 65.00,
      image: 'https://i.imgur.com/hYqz7uU.jpeg',
      imageFront: 'https://i.imgur.com/hYqz7uU.jpeg',
      imageBack: 'https://i.imgur.com/xIPW4uS.jpeg',
      category: 'shorts dry fit',
      size: 'G',
      isNew: true,
    },
    {
      id: 404,
      name: 'Short Dry Fit Nike Preto 2 (G)',
      price: 65.00,
      image: 'https://i.imgur.com/svwELXB.jpeg',
      imageFront: 'https://i.imgur.com/svwELXB.jpeg',
      imageBack: 'https://i.imgur.com/xIPW4uS.jpeg',
      category: 'shorts dry fit',
      size: 'G',
      isNew: true,
    },
    {
      id: 56,
      name: 'Camiseta Diesel (P)',
      price: 60.00,
      image: 'https://i.imgur.com/t2lqHWs.jpeg',
      imageFront: 'https://i.imgur.com/t2lqHWs.jpeg',
      imageBack: 'https://i.imgur.com/t2lqHWs.jpeg',
      category: 'malha egipcia',
      size: 'P',
      isNew: true,
    },
    {
      id: 57,
      name: 'Camiseta Boss Branca Logo Pequeno (M)',
      price: 60.00,
      image: 'https://i.imgur.com/VxASolC.jpeg',
      imageFront: 'https://i.imgur.com/VxASolC.jpeg',
      imageBack: 'https://i.imgur.com/VxASolC.jpeg',
      category: 'malha egipcia',
      size: 'M',
      isNew: true,
    },
    {
      id: 58,
      name: 'Camiseta Diesel Bege Logo Esquerdo (P)',
      price: 60.00,
      image: 'https://i.imgur.com/1hUI5QS.jpeg',
      imageFront: 'https://i.imgur.com/1hUI5QS.jpeg',
      imageBack: 'https://i.imgur.com/1hUI5QS.jpeg',
      category: 'malha egipcia',
      size: 'P',
      isNew: true,
    },
    {
      id: 59,
      name: 'Camiseta Diesel Branca Logo Giga (M)',
      price: 60.00,
      image: 'https://i.imgur.com/BvZpDix.jpeg',
      imageFront: 'https://i.imgur.com/BvZpDix.jpeg',
      imageBack: 'https://i.imgur.com/BvZpDix.jpeg',
      category: 'malha egipcia',
      size: 'M',
      isNew: true,
    },
    {
      id: 60,
      name: 'Camiseta Diesel Bege Logo Pequeno (M)',
      price: 60.00,
      image: 'https://i.imgur.com/oSQur9d.jpeg',
      imageFront: 'https://i.imgur.com/oSQur9d.jpeg',
      imageBack: 'https://i.imgur.com/oSQur9d.jpeg',
      category: 'malha egipcia',
      size: 'M',
      isNew: true,
    },
    {
      id: 61,
      name: 'Camiseta Boss Bege Logo Esq Pequeno (M)',
      price: 60.00,
      image: 'https://i.imgur.com/blRfZlb.jpeg',
      imageFront: 'https://i.imgur.com/blRfZlb.jpeg',
      imageBack: 'https://i.imgur.com/blRfZlb.jpeg',
      category: 'malha egipcia',
      size: 'M',
      isNew: true,
    },
    {
      id: 62,
      name: 'Camiseta Boss Branca Logo Medio Direito (P)',
      price: 60.00,
      image: 'https://i.imgur.com/mqQb7XU.jpeg',
      imageFront: 'https://i.imgur.com/mqQb7XU.jpeg',
      imageBack: 'https://i.imgur.com/mqQb7XU.jpeg',
      category: 'malha egipcia',
      size: 'P',
      isNew: true,
    },
    {
      id: 63,
      name: 'Camiseta Boss Preta Logo Pequeno (P)',
      price: 60.00,
      image: 'https://i.imgur.com/zwQ2DuO.jpeg',
      imageFront: 'https://i.imgur.com/zwQ2DuO.jpeg',
      imageBack: 'https://i.imgur.com/zwQ2DuO.jpeg',
      category: 'malha egipcia',
      size: 'P',
      isNew: true,
    },
    {
      id: 64,
      name: 'Camiseta Diesel Branca D Vermelho (P)',
      price: 60.00,
      image: 'https://i.imgur.com/OKPqGzi.jpeg',
      imageFront: 'https://i.imgur.com/OKPqGzi.jpeg',
      imageBack: 'https://i.imgur.com/OKPqGzi.jpeg',
      category: 'malha egipcia',
      size: 'P',
      isNew: true,
    },
    {
      id: 65,
      name: 'Camiseta Boss Bege Logo Branco (P)',
      price: 60.00,
      image: 'https://i.imgur.com/pGE39wd.jpeg',
      imageFront: 'https://i.imgur.com/pGE39wd.jpeg',
      imageBack: 'https://i.imgur.com/pGE39wd.jpeg',
      category: 'malha egipcia',
      size: 'P',
      isNew: true,
    },
    {
      id: 66,
      name: 'Camiseta Boss Marrom Logo Peluciado (G)',
      price: 60.00,
      image: 'https://i.imgur.com/IMfUmPy.jpeg',
      imageFront: 'https://i.imgur.com/IMfUmPy.jpeg',
      imageBack: 'https://i.imgur.com/IMfUmPy.jpeg',
      category: 'malha egipcia',
      size: 'G',
      isNew: true,
    },
    {
      id: 67,
      name: 'Camiseta Diesel Branca Logo Pequeno (G)',
      price: 60.00,
      image: 'https://i.imgur.com/Rqz7Ucb.jpeg',
      imageFront: 'https://i.imgur.com/Rqz7Ucb.jpeg',
      imageBack: 'https://i.imgur.com/Rqz7Ucb.jpeg',
      category: 'malha egipcia',
      size: 'G',
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
        {categories.map((category) => {
          const count =
            category.id === 'todos'
              ? products.length
              : products.filter(
                  (product) =>
                    product.category.toLowerCase() === category.id.toLowerCase()
                ).length;

          return (
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
              <Badge
                variant="secondary"
                className="ml-2 bg-secondary text-secondary-foreground"
              >
                {count}
              </Badge>
            </Button>
          );
        })}
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
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
            aria-label="Fechar"
          >
            &times;
          </button>

          <ProductCarousel product={selectedProduct} />

          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
            <p className="text-lg">
              <span className="font-semibold">Preço:</span> R$ {selectedProduct.price.toFixed(2)}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Tamanhos:</span> {selectedProduct.size}
            </p>
            {selectedProduct.isNew && (
              <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                Novo!
              </span>
            )}
            <p className="text-sm text-gray-300 mt-4 leading-relaxed">
              Esta camiseta é feita com materiais de alta qualidade, ideal para quem busca estilo e conforto no dia a dia urbano.
            </p>

            <a
              href={`https://wa.me/5511972988072?text=Olá! Tenho interesse no produto *${selectedProduct.name}* no valor de *R$ ${selectedProduct.price.toFixed(2)}*.`}
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