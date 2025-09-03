import { useState, useMemo, useCallback } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCarousel from './ProductCarousel';
import { Input } from '@/components/ui/input';


// Categorias
const categories = [
{ id: 'todos', name: 'Todos' },
{ id: 'dryfit', name: 'Dryfit'},
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
      id: 8,
      name: 'Adidas Oeste',
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
      name: 'Casa Blanca Air',
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
      name: 'Adidas Bordada',
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
      name: 'Nike Sombras',
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
      name: 'Palm Angels Asas',
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
      name: 'Adidas Logo',
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
      name: 'Lacoste',
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
      name: 'Palm Angels Olho',
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
      name: 'Off White Pinóquio',
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
      name: 'Air Bordado',
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
      name: 'Balenciaga Bandida',
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
      name: 'Nike Bordada Verde',
      price: 79.99,
      image: 'https://i.imgur.com/2MCtO1a.png',
      imageFront: 'https://i.imgur.com/2MCtO1a.png',
      imageBack: 'https://i.imgur.com/2MCtO1a.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 21,
      name: 'Nike Marrom',
      price: 79.99,
      image: 'https://i.imgur.com/owa3irz.png',
      imageFront: 'https://i.imgur.com/owa3irz.png',
      imageBack: 'https://i.imgur.com/HWUsW7X.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 23,
      name: 'Travis Mostarda',
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
      name: 'Travis Bege',
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
      name: 'Abathing',
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
      name: 'Casa Blanca Drinks',
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
      name: 'Jordan Bege',
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
      name: 'Adidas Verde',
      price: 79.99,
      image: 'https://i.imgur.com/IZ4QCcK.png',
      imageFront: 'https://i.imgur.com/IZ4QCcK.png',
      imageBack: 'https://i.imgur.com/IZ4QCcK.png',
      category: 'oversized',
      size: 'G',
      isNew: true,
    },
    {
      id: 30,
      name: 'Adidas Tenis',
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
      name: 'Adidas Jerry',
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
      name: 'Neymar' ,
      price: 79.99,
      image: 'https://i.imgur.com/My9k0UL.jpeg',
      imageFront: 'https://i.imgur.com/My9k0UL.jpeg',
      imageBack: 'https://i.imgur.com/My9k0UL.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 33,
      name: 'Balenciaga Street' ,
      price: 79.99,
      image: 'https://i.imgur.com/4DulVku.jpeg',
      imageFront: 'https://i.imgur.com/4DulVku.jpeg',
      imageBack: 'https://i.imgur.com/acucJ.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 34,
      name: 'Nike Just Do It' ,
      price: 79.99,
      image: 'https://i.imgur.com/pq4gQ93.jpeg',
      imageFront: 'https://i.imgur.com/pq4gQ93.jpeg',
      imageBack: 'https://i.imgur.com/LHM7ca1.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 35,
      name: 'Palm Angels Horizontal' ,
      price: 79.99,
      image: 'https://i.imgur.com/leUFeC3.jpeg',
      imageFront: 'https://i.imgur.com/leUFeC3.jpeg',
      imageBack: 'https://i.imgur.com/P7lkxpx.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 36,
      name: 'Palm Angels Rosa' ,
      price: 79.99,
      image: 'https://i.imgur.com/hc6P3Js.jpeg',
      imageFront: 'https://i.imgur.com/hc6P3Js.jpeg',
      imageBack: 'https://i.imgur.com/eDDOLQb.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 37,
      name: 'Adidas Ronkib' ,
      price: 79.99,
      image: 'https://i.imgur.com/UDFDixY.jpeg',
      imageFront: 'https://i.imgur.com/UDFDixY.jpeg',
      imageBack: 'https://i.imgur.com/H4cVTgV.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 38,
      name: 'Casa Blanca Praia' ,
      price: 79.99,
      image: 'https://i.imgur.com/iA75Yqz.jpeg',
      imageFront: 'https://i.imgur.com/iA75Yqz.jpeg',
      imageBack: 'https://i.imgur.com/LQTGUpx.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 39,
      name: 'Off White X' ,
      price: 79.99,
      image: 'https://i.imgur.com/ffsnOic.jpeg',
      imageFront: 'https://i.imgur.com/ffsnOic.jpeg',
      imageBack: 'https://i.imgur.com/uGWqTUk.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 40,
      name: 'The North Preta' ,
      price: 79.99,
      image: 'https://i.imgur.com/tPgpHEy.jpeg',
      imageFront: 'https://i.imgur.com/tPgpHEy.jpeg',
      imageBack: 'https://i.imgur.com/djbK26M.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 41,
      name: 'Adidas Branca' ,
      price: 79.99,
      image: 'https://i.imgur.com/SbihkTZ.jpeg',
      imageFront: 'https://i.imgur.com/SbihkTZ.jpeg',
      imageBack: 'https://i.imgur.com/dG5BxYE.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 42,
      name: 'LA Asa' ,
      price: 79.99,
      image: 'https://i.imgur.com/lJmLCYc.jpeg',
      imageFront: 'https://i.imgur.com/lJmLCYc.jpeg',
      imageBack: 'https://i.imgur.com/60VGWfr.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 43,
      name: 'Los Angeles 32' ,
      price: 79.99,
      image: 'https://i.imgur.com/bNnjDQ0.jpeg',
      imageFront: 'https://i.imgur.com/bNnjDQ0.jpeg',
      imageBack: 'https://i.imgur.com/bNnjDQ0.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 44,
      name: 'Adidas Logo Giga' ,
      price: 79.99,
      image: 'https://i.imgur.com/JQGw7VA.jpeg',
      imageFront: 'https://i.imgur.com/JQGw7VA.jpeg',
      imageBack: 'https://i.imgur.com/JQGw7VA.jpeg',
      category: 'oversized',
      size: '',
      isNew: true,
    },
    {
      id: 45,
      name: 'Calça Cargo Azul Clara',
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
      name: 'Calça Cargo Preta',
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
      name: 'Calça Cargo Azul Escuro',
      price: 109.99,
      image: 'https://i.imgur.com/pEUwDz8.jpeg',
      imageFront: 'https://i.imgur.com/pEUwDz8.jpeg',
      imageBack: 'https://i.imgur.com/rKj2JfR.jpeg',
      category: 'calça cargo',
      size: 'M G ',
      isNew: true,
    },
    {
      id: 48,
      name: 'Calça Cargo Preta Linhas Brancas',
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
      name: 'Calça Cargo Grafite',
      price: 109.99,
      image: 'https://i.imgur.com/dpqsfQ1.jpeg',
      imageFront: 'https://i.imgur.com/dpqsfQ1.jpeg',
      imageBack: 'https://i.imgur.com/mVpyDqr.jpeg',
      category: 'calça cargo',
      size: 'M G ',
      isNew: true,
    },
    {
      id: 50,
      name: 'Regata Canelada',
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
      name: 'Camiseta Canelada',
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
      name: 'Short Moletom Nike Cinza',
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
      name: 'Short Moletom Nike Branco',
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
      name: 'Short Moletom Nike Preto',
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
      name: 'Short Dry Fit Nike Cinza ',
      price: 65.00,
      image: 'https://i.imgur.com/hYqz7uU.jpeg',
      imageFront: 'https://i.imgur.com/hYqz7uU.jpeg',
      imageBack: 'https://i.imgur.com/xIPW4uS.jpeg',
      category: 'shorts dry fit',
      size: 'G',
      isNew: true,
    },
    {
      id: 56,
      name: 'Camiseta Diesel',
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
      name: 'Camiseta Boss Branca Logo Pequeno',
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
      name: 'Camiseta Diesel Bege Logo Esquerdo',
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
      name: 'Camiseta Diesel Branca Logo Giga',
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
      name: 'Camiseta Diesel Bege Logo Pequeno',
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
      name: 'Camiseta Boss Bege Logo Esq Pequeno',
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
      name: 'Camiseta Boss Branca Logo Medio Direit',
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
      name: 'Camiseta Boss Preta Logo Pequeno',
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
      name: 'Camiseta Diesel Branca D Vermelho',
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
      name: 'Camiseta Boss Bege Logo Branco',
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
      name: 'Camiseta Boss Marrom Logo Peluciado',
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
      name: 'Camiseta Diesel Branca Logo Pequeno',
      price: 60.00,
      image: 'https://i.imgur.com/Rqz7Ucb.jpeg',
      imageFront: 'https://i.imgur.com/Rqz7Ucb.jpeg',
      imageBack: 'https://i.imgur.com/Rqz7Ucb.jpeg',
      category: 'malha egipcia',
      size: 'G',
      isNew: true,
    },
    {
      id: 68,
      name: 'Camiseta Nike Preta Logo Grande',
      price: 60.00,
      image: 'https://i.imgur.com/24UMzJc.png',
      imageFront: 'https://i.imgur.com/24UMzJc.png',
      imageBack: 'https://i.imgur.com/24UMzJc.png',
      category: 'dryfit',
      size: 'P, M e G',
      isNew: true,
    },
    {
      id: 69,
      name: 'Camiseta Nike Under Armour',
      price: 50.00,
      image: 'https://i.imgur.com/jFrFopE.png',
      imageFront: 'https://i.imgur.com/jFrFopE.png',
      imageBack: 'https://i.imgur.com/jFrFopE.png',
      category: 'dryfit',
      size: 'P',
      isNew: true,
    },
    {
      id: 70,
      name: 'Camiseta Nike Under Armour Bege',
      price: 50.00,
      image: 'https://i.imgur.com/xt2ffap.png',
      imageFront: 'https://i.imgur.com/xt2ffap.png',
      imageBack: 'https://i.imgur.com/A9CuTxd.png',
      category: 'dryfit',
      size: 'P e M',
      isNew: true,
    },
    {
      id: 71,
      name: 'Camiseta Nike Preta Logo Pequena',
      price: 60.00,
      image: 'https://i.imgur.com/GyCFFvF.png',
      imageFront: 'https://i.imgur.com/GyCFFvF.png',
      imageBack: 'https://i.imgur.com/6g5LOKy.png',
      category: 'dryfit',
      size: 'P',
      isNew: true,
    },
    {
      id: 72,
      name: 'Camiseta Adidas Branca',
      price: 50.00,
      image: 'https://i.imgur.com/sotwaXy.png',
      imageFront: 'https://i.imgur.com/sotwaXy.png',
      imageBack: 'https://i.imgur.com/Wep6aUB.png',
      category: 'dryfit',
      size: 'P',
      isNew: true,
    },

  ];

  const ITEMS_PER_PAGE = 12;

  const Catalog = () => {
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
  
    // Contagem de produtos por categoria
    const categoryCounts = useMemo(() => {
      const counts = { todos: products.length };
      categories.forEach(category => {
        if (category.id !== 'todos') {
          counts[category.id] = products.filter(p => 
            p.category.toLowerCase() === category.id.toLowerCase()
          ).length;
        }
      });
      return counts;
    }, []);
  
    // Filtro (categoria + busca + tamanho)
    const filteredProducts = useMemo(() => {
      return products.filter(product => {
        const matchesCategory = selectedCategory === 'todos' || product.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSize = !selectedSize || product.size.toLowerCase().includes(selectedSize.toLowerCase());
        return matchesCategory && matchesSearch && matchesSize;
      });
    }, [selectedCategory, searchTerm, selectedSize]);
  
    const productsToShow = useMemo(() => 
      filteredProducts.slice(0, visibleItems), 
      [filteredProducts, visibleItems]
    );
  
    const handleProductClick = useCallback((product) => {
      setSelectedProduct(product);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }, []);
  
    const closeModal = useCallback(() => {
      setIsModalOpen(false);
      setSelectedProduct(null);
      document.body.style.overflow = 'unset';
    }, []);
  
    const loadMore = () => {
      setVisibleItems(prev => prev + ITEMS_PER_PAGE);
    };
  
    const handleCategoryChange = (categoryId) => {
      setSelectedCategory(categoryId);
      setVisibleItems(ITEMS_PER_PAGE);
    };
  
    const hasMoreItems = visibleItems < filteredProducts.length;
  
    return (
      <section id="catalog" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
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
  
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            <Input
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 bg-secondary border-border focus:border-accent"
            />
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground"
            >
              <option value="">Todos os Tamanhos</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value=""></option>
            </select>
          </div>
  
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 px-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-gradient-urban text-background hover:shadow-glow'
                    : 'border-accent text-accent hover:bg-accent hover:text-accent-foreground'
                } font-medium transition-all duration-300 mb-2`}
              >
                {category.name}
                <Badge
                  variant="secondary"
                  className="ml-2 bg-secondary text-secondary-foreground"
                >
                  {categoryCounts[category.id]}
                </Badge>
              </Button>
            ))}
          </div>
  
          {/* Products Grid */}
          {productsToShow.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {productsToShow.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => handleProductClick(product)} 
                    className="cursor-pointer transform transition-transform hover:scale-105"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
  
              {hasMoreItems && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={loadMore}
                    className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold px-8 py-4"
                  >
                    Ver Mais Produtos ({filteredProducts.length - visibleItems} restantes)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Nenhum produto encontrado.
              </p>
            </div>
          )}
        </div>
  
        {/* Modal */}
        {isModalOpen && selectedProduct && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={closeModal}
          >
            <div 
              className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-[0_0_20px_5px_rgba(0,255,0,0.3)] border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800"
                aria-label="Fechar"
              >
                &times;
              </button>
  
              <ProductCarousel product={selectedProduct} />
  
              <div className="space-y-2 text-center mt-4">
                <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                <p className="text-lg">
                  <span className="font-semibold">Preço:</span> R$ {selectedProduct.price.toFixed(2)}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Tamanhos:</span> {selectedProduct.size}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Categoria:</span> {selectedProduct.category}
                </p>
  
                <a
                  href={`https://wa.me/5511972988072?text=Olá! Tenho interesse no produto *${encodeURIComponent(selectedProduct.name)}* no valor de *R$ ${selectedProduct.price.toFixed(2)}*.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 shadow-[0_0_10px_rgba(0,255,0,0.5)] font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12h.008v.008H7.5V12zM12 12h.008v.008H12V12zm4.5 0h.008v.008H16.5V12z" />
                  </svg>
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
  