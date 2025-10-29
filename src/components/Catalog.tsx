// Catalog.tsx
"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tag, Filter, X, Grid, List } from "lucide-react";

// ===== Categorias  =====
const categories = [
  { id: "todos", name: "Todos" },
  { id: "dryfit", name: "Dryfit" },
  { id: "malha egipcia", name: "Malha Egípcia" },
  { id: "oversized", name: "Oversized" },
  { id: "calça cargo", name: "Calça Cargo" },
  { id: "regatas", name: "Regatas" },
  { id: "caneladas", name: "Caneladas" },
  { id: "shorts moletom", name: "Shorts Moletom" },
  { id: "shorts dry fit", name: "Shorts Dry fit" },
  { id: "surf", name: "Surf" },
  { id: "promocoes", name: "Promoções" },
  { id: "peruana", name: "Peruana" },
];

// ===== Utilitários =====
const strip = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const parseSizes = (s: string): string[] =>
  s
    .split(/[,\s]+/g)
    .map((x) => x.replace(/[^A-Za-z]/g, "").toUpperCase())
    .filter(Boolean);

const BRL = (n: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

type SortKey = "relevance" | "price-asc" | "price-desc" | "name-asc" | "newest";

const products = [
  {
    id: 8,
    name: 'Adidas Oeste',
    price: 49.90,
    image: 'https://i.imgur.com/1p6YCx1.png',
    imageFront: 'https://i.imgur.com/1p6YCx1.png',
    imageBack: 'https://i.imgur.com/YECNULC.png',
    category: 'oversized',
    isNew: false,
    isSale: true,
    size: 'P',
  },
  {
    id: 9,
    name: 'Casa Blanca Air',
    price: 49.90,
    image: 'https://i.imgur.com/e6M5pIv.png',
    imageFront: 'https://i.imgur.com/e6M5pIv.png',
    imageBack: 'https://i.imgur.com/82SeKoC.jpeg',
    category: 'oversized',
    isNew: false,
    isSale: true,
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
    isNew: false,
    size: 'P',
  },
  {
    id: 13,
    name: 'Adidas Logo',
    price: 49.90,
    image: 'https://i.imgur.com/q4bGbT5.png',
    imageFront: 'https://i.imgur.com/q4bGbT5.png',
    imageBack: 'https://i.imgur.com/q4bGbT5.png',
    category: 'oversized',
    isNew: false,
    isSale: true,
    size: 'M',
  },
  {
    id: 14,
    name: 'Lacoste',
    price: 49.90,
    image: 'https://i.imgur.com/1seksbz.png',
    imageFront: 'https://i.imgur.com/1seksbz.png',
    imageBack: 'https://i.imgur.com/1seksbz.png',
    category: 'oversized',
    isNew: false,
    size: 'M G',
    isSale: true,
  },
  {
    id: 15,
    name: 'Palm Angels Olho',
    price: 49.90,
    image: 'https://i.imgur.com/7NjoZ6Y.png',
    imageFront: 'https://i.imgur.com/7NjoZ6Y.png',
    imageBack: 'https://i.imgur.com/hkQZv9N.png',
    category: 'oversized',
    size: 'M',
    isNew: false,
    isSale: true,
  },
  {
    id: 16,
    name: 'Off White Pinóquio',
    price: 49.90,
    image: 'https://i.imgur.com/5d0Kk57.png',
    imageFront: 'https://i.imgur.com/5d0Kk57.png',
    imageBack: 'https://i.imgur.com/XQJPbav.png',
    category: 'oversized',
    size: 'M',
    isNew: false,
    isSale: true,
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
    isNew: false,
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
    isNew: false,
  },
  {
    id: 23,
    name: 'Travis Mostarda',
    price: 49.99,
    image: 'https://i.imgur.com/wz6eGVK.png',
    imageFront: 'https://i.imgur.com/wz6eGVK.png',
    imageBack: 'https://i.imgur.com/wz6eGVK.png',
    category: 'oversized',
    size: 'G',
    isNew: false,
    isSale: true,
  },
  {
    id: 24,
    name: 'Travis Bege',
    price: 49.99,
    image: 'https://i.imgur.com/CZdjuoW.png',
    imageFront: 'https://i.imgur.com/CZdjuoW.png',
    imageBack: 'https://i.imgur.com/CZdjuoW.png',
    category: 'oversized',
    size: 'G',
    isNew: false,
    isSale: true,
  },
  {
    id: 25,
    name: 'Abathing',
    price: 49.99,
    image: 'https://i.imgur.com/Y0nn5nc.png',
    imageFront: 'https://i.imgur.com/Y0nn5nc.png',
    imageBack: 'https://i.imgur.com/Y0nn5nc.png',
    category: 'oversized',
    size: 'G',
    isNew: false,
    isSale: true,
  },
  {
    id: 26,
    name: 'Casa Blanca Drinks',
    price: 49.99,
    image: 'https://i.imgur.com/B8hCEBJ.png',
    imageFront: 'https://i.imgur.com/B8hCEBJ.png',
    imageBack: 'https://i.imgur.com/VLFAcPC.png',
    category: 'oversized',
    size: 'G',
    isNew: false,
    isSale: true,
  },
  {
    id: 31,
    name: 'Adidas Jerry',
    price: 49.99,
    image: 'https://i.imgur.com/Dd6Pthx.jpeg',
    imageFront: 'https://i.imgur.com/Dd6Pthx.jpeg',
    imageBack: 'https://i.imgur.com/klgJBer.jpeg',
    category: 'oversized',
    size: 'G',
    isNew: false,
  },
  {
    id: 32,
    name: 'Neymar',
    price: 49.99,
    image: 'https://i.imgur.com/My9k0UL.jpeg',
    imageFront: 'https://i.imgur.com/My9k0UL.jpeg',
    imageBack: 'https://i.imgur.com/My9k0UL.jpeg',
    category: 'oversized',
    size: 'GG',
    isNew: false,
    isSale: true,
  },
  {
    id: 33,
    name: 'Balenciaga Street',
    price: 49.99,
    image: 'https://i.imgur.com/4DulVku.jpeg',
    imageFront: 'https://i.imgur.com/4DulVku.jpeg',
    imageBack: 'https://i.imgur.com/UTE7tA1.jpeg',
    category: 'oversized',
    size: 'GG',
    isNew: false,
    isSale: true,
  },
  {
    id: 34,
    name: 'Nike Just Do It',
    price: 79.99,
    image: 'https://i.imgur.com/pq4gQ93.jpeg',
    imageFront: 'https://i.imgur.com/pq4gQ93.jpeg',
    imageBack: 'https://i.imgur.com/LHM7ca1.jpeg',
    category: 'oversized',
    size: 'GG',
    isNew: false,
  },
  {
    id: 37,
    name: 'Adidas Ronkib',
    price: 79.99,
    image: 'https://i.imgur.com/UDFDixY.jpeg',
    imageFront: 'https://i.imgur.com/UDFDixY.jpeg',
    imageBack: 'https://i.imgur.com/H4cVTgV.jpeg',
    category: 'oversized',
    size: 'GG',
    isNew: false,
  },
  {
    id: 38,
    name: 'Casa Blanca Praia',
    price: 79.99,
    image: 'https://i.imgur.com/iA75Yqz.jpeg',
    imageFront: 'https://i.imgur.com/iA75Yqz.jpeg',
    imageBack: 'https://i.imgur.com/LQTGUpx.jpeg',
    category: 'oversized',
    size: 'GG',
    isNew: false,
  },
  {
    id: 39,
    name: 'Off White X',
    price: 79.99,
    image: 'https://i.imgur.com/ffsnOic.jpeg',
    imageFront: 'https://i.imgur.com/ffsnOic.jpeg',
    imageBack: 'https://i.imgur.com/uGWqTUk.jpeg',
    category: 'oversized',
    size: 'GG',
    isNew: false,
  },
  {
    id: 41,
    name: 'Adidas Branca',
    price: 79.99,
    image: 'https://i.imgur.com/SbihkTZ.jpeg',
    imageFront: 'https://i.imgur.com/SbihkTZ.jpeg',
    imageBack: 'https://i.imgur.com/dG5BxYE.jpeg',
    category: 'oversized',
    size: 'GG',
    isNew: false,
  },
  {
    id: 43,
    name: 'Los Angeles 32',
    price: 79.99,
    image: 'https://i.imgur.com/bNnjDQ0.jpeg',
    imageFront: 'https://i.imgur.com/bNnjDQ0.jpeg',
    imageBack: 'https://i.imgur.com/bNnjDQ0.jpeg',
    category: 'oversized',
    size: 'GG',
    isNew: false,
  },
  {
    id: 44,
    name: 'Adidas Logo Giga',
    price: 79.99,
    image: 'https://i.imgur.com/JQGw7VA.jpeg',
    imageFront: 'https://i.imgur.com/JQGw7VA.jpeg',
    imageBack: 'https://i.imgur.com/JQGw7VA.jpeg',
    category: 'oversized',
    size: 'GG',
    isNew: false,
  },
  {
    id: 46,
    name: 'Calça Cargo Preta',
    price: 109.99,
    image: 'https://i.imgur.com/VKLT02J.png',
    imageFront: 'https://i.imgur.com/VKLT02J.png',
    imageBack: 'https://i.imgur.com/9ayZA73.png',
    category: 'calça cargo',
    size: 'P M G',
    isNew: false,
  },
  {
    id: 47,
    name: 'Calça Cargo Azul Escuro',
    price: 109.99,
    image: 'https://i.imgur.com/DiPyBnV.png',
    imageFront: 'https://i.imgur.com/DiPyBnV.png',
    imageBack: 'https://i.imgur.com/q0qEolS.png',
    category: 'calça cargo',
    size: 'M G',
    isNew: false,
  },
  {
    id: 48,
    name: 'Calça Cargo Preta Linhas Brancas',
    price: 109.99,
    image: 'https://i.imgur.com/EgWlgn4.png',
    imageFront: 'https://i.imgur.com/EgWlgn4.png',
    imageBack: 'https://i.imgur.com/U2rILSP.png',
    category: 'calça cargo',
    size: 'G',
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
  },
  {
    id: 68,
    name: 'Camiseta Nike Preta Logo Grande',
    price: 60.00,
    image: 'https://i.imgur.com/24UMzJc.png',
    imageFront: 'https://i.imgur.com/24UMzJc.png',
    imageBack: 'https://i.imgur.com/24UMzJc.png',
    category: 'dryfit',
    size: 'P, M G',
    isNew: false,
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
    isNew: false,
  },
  {
    id: 70,
    name: 'Camiseta Nike Under Armour Bege',
    price: 50.00,
    image: 'https://i.imgur.com/xt2ffap.png',
    imageFront: 'https://i.imgur.com/xt2ffap.png',
    imageBack: 'https://i.imgur.com/A9CuTxd.png',
    category: 'dryfit',
    size: 'P M',
    isNew: false,
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
    isNew: false,
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
    isNew: false,
  },
  {
    id: 73,
    name: "PALM ANGELS Asa Anjo B",
    price: 79.99,
    image: "https://i.imgur.com/iMQdTPL.jpeg",
    imageFront: "https://i.imgur.com/iMQdTPL.jpeg",
    imageBack: "https://i.imgur.com/Lat0Tx5.jpeg",
    category: "oversized",
    isNew: false,
    size: "M"
  },
  {
    id: 74,
    name: "JORDAN Chicago",
    price: 79.99,
    image: "https://i.imgur.com/nQED1Tx.jpeg",
    imageFront: "https://i.imgur.com/nQED1Tx.jpeg",
    imageBack: "https://i.imgur.com/hlP0eL3.jpeg",
    category: "oversized",
    isNew: false,
    size: "M"
  },
  {
    id: 75,
    name: "PALM ANGELS Ilusão",
    price: 79.99,
    image: "https://i.imgur.com/im80xjC.jpeg",
    imageFront: "https://i.imgur.com/im80xjC.jpeg",
    imageBack: "https://i.imgur.com/RJMUvm4.jpeg",
    category: "oversized",
    isNew: false,
    size: "M"
  },
  {
    id: 77,
    name: "CASA BLANCA Tenis",
    price: 79.99,
    image: "https://i.imgur.com/xl8wO5Y.jpeg",
    imageFront: "https://i.imgur.com/xl8wO5Y.jpeg",
    imageBack: "https://i.imgur.com/Tl4tWah.jpeg",
    category: "oversized",
    isNew: false,
    size: "GG"
  },
  {
    id: 79,
    name: "HIGH",
    price: 79.99,
    image: "https://i.imgur.com/nJqmA2I.jpeg",
    imageFront: "https://i.imgur.com/nJqmA2I.jpeg",
    imageBack: "https://i.imgur.com/iDaaxBA.jpeg",
    category: "oversized",
    isNew: false,
    size: "GG"
  },
  {
    id: 80,
    name: "SUPREME Products",
    price: 79.99,
    image: "https://i.imgur.com/gE6fSM5.jpeg",
    imageFront: "https://i.imgur.com/gE6fSM5.jpeg",
    imageBack: "https://i.imgur.com/NAoKBs0.jpeg",
    category: "oversized",
    isNew: false,
    size: "GG"
  },
  {
    id: 81,
    name: "PALM ANGELS Dólar Rosas",
    price: 79.99,
    image: "https://i.imgur.com/xLTe9Eb.jpeg",
    imageFront: "https://i.imgur.com/xLTe9Eb.jpeg",
    imageBack: "https://i.imgur.com/B0Q4VZJ.jpeg",
    category: "oversized",
    isNew: false,
    size: "G"
  },
  {
    id: 84,
    name: "BALENCIAGA BB",
    price: 79.99,
    image: "https://i.imgur.com/Cpi43xP.jpeg",
    imageFront: "https://i.imgur.com/Cpi43xP.jpeg",
    imageBack: "https://i.imgur.com/2oyVDAu.jpeg",
    category: "oversized",
    isNew: false,
    size: "G"
  },
  {
    id: 85,
    name: "Calça Cargo Grafite",
    price: 109.99,
    image: "https://i.imgur.com/ibLFXu4.png",
    imageFront: "https://i.imgur.com/ibLFXu4.png",
    imageBack: "https://i.imgur.com/fclwJOg.png",
    category: "calça cargo",
    isNew: false,
    size: "G"
  },
  {
    id: 86,
    name: "Calça Cargo Azul Claro",
    price: 109.99,
    image: "https://i.imgur.com/ZFhmYQe.jpeg",
    imageFront: "https://i.imgur.com/ZFhmYQe.jpeg",
    imageBack: "https://i.imgur.com/t9W1Oto.jpeg",
    category: "calça cargo",
    isNew: false,
    size: "G"
  },
  {
    id: 87,
    name: "Shorts Dry Fit Azul",
    price: 69.99,
    image: "https://i.imgur.com/rykWcyt.png",
    imageFront: "https://i.imgur.com/rykWcyt.png",
    imageBack: "https://i.imgur.com/ho1VC3g.png",
    category: "shorts dry fit",
    isNew: false,
    size: "G"
  },
  {
    id: 88,
    name: "Shorts Dry Fit Cinza",
    price: 69.99,
    image: "https://i.imgur.com/UB0tJEb.png",
    imageFront: "https://i.imgur.com/UB0tJEb.png",
    imageBack: "https://i.imgur.com/OmOfNYH.png",
    category: "shorts dry fit",
    isNew: false,
    size: "G"
  },
  {
    id: 89,
    name: "Shorts Dry Fit Preto",
    price: 69.99,
    image: "https://i.imgur.com/rM79xtt.png",
    imageFront: "https://i.imgur.com/rM79xtt.png",
    imageBack: "https://i.imgur.com/TFn1qar.png",
    category: "shorts dry fit",
    isNew: false,
    size: "G"
  },
  {
    id: 90,
    name: "Dry Fit Nike Preta e Cinza",
    price: 49.99,
    image: "https://i.imgur.com/qMJRtsJ.png",
    imageFront: "https://i.imgur.com/qMJRtsJ.png",
    imageBack: "https://i.imgur.com/eCVSHG2.png",
    category: "dryfit",
    isNew: false,
    size: "M e G"
  },
  {
    id: 91,
    name: "Dry Fit Nike Preta e Branca",
    price: 49.99,
    image: "https://i.imgur.com/aRXxU6H.jpeg",
    imageFront: "https://i.imgur.com/aRXxU6H.jpeg",
    imageBack: "https://i.imgur.com/jko3hhy.jpeg",
    category: "dryfit",
    isNew: false,
    size: "G"
  },
  {
    id: 92,
    name: "Dry Fit Nike Cinza e Preto",
    price: 49.99,
    image: "https://i.imgur.com/zihxEiE.jpeg",
    imageFront: "https://i.imgur.com/zihxEiE.jpeg",
    imageBack: "https://i.imgur.com/cy8Pe3T.jpeg",
    category: "dryfit",
    isNew: false,
    size: "P e M"
  },
  {
    id: 93,
    name: "Dry Fit Nike Azul e Branco",
    price: 49.99,
    image: "https://i.imgur.com/qaUGh8I.jpeg",
    imageFront: "https://i.imgur.com/qaUGh8I.jpeg",
    imageBack: "https://i.imgur.com/0JfatYm.jpeg",
    category: "dryfit",
    isNew: false,
    size: "P"
  },
  {
    id: 94,
    name: "Dry Fit Nike Logo na Direita",
    price: 49.99,
    image: "https://i.imgur.com/f3o8rg2.jpeg",
    imageFront: "https://i.imgur.com/f3o8rg2.jpeg",
    imageBack: "https://i.imgur.com/bt1fDMJ.jpeg",
    category: "dryfit",
    isNew: false,
    size: "P"
  },
  {
    id: 95,
    name: "Dry Fit Nike Azul e Branca",
    price: 49.99,
    image: "https://i.imgur.com/SLNWCDj.jpeg",
    imageFront: "https://i.imgur.com/SLNWCDj.jpeg",
    imageBack: "https://i.imgur.com/Czg37kT.jpeg",
    category: "dryfit",
    isNew: false,
    size: "M"
  },
  {
    id: 97,
    name: "Dry Fit Nike Logo Central",
    price: 49.99,
    image: "https://i.imgur.com/f3o8rg2.jpeg",
    imageFront: "https://i.imgur.com/f3o8rg2.jpeg",
    imageBack: "https://i.imgur.com/tdTxyn6.jpeg",
    category: "dryfit",
    isNew: false,
    size: "P M e G"
  },
  {
    id: 98,
    name: "Dry Fit Adidas Branca",
    price: 49.99,
    image: "https://i.imgur.com/3eUq5w7.jpeg",
    imageFront: "https://i.imgur.com/3eUq5w7.jpeg",
    imageBack: "https://i.imgur.com/jbMWBJy.jpeg",
    category: "dryfit",
    isNew: false,
    size: "M"
  },
  {
    id: 99,
    name: "Dry Fit Nike Bege",
    price: 49.99,
    image: "https://i.imgur.com/1KeOXiB.jpeg",
    imageFront: "https://i.imgur.com/1KeOXiB.jpeg",
    imageBack: "https://i.imgur.com/pubFB8C.jpeg",
    category: "dryfit",
    isNew: false,
    size: "M"
  },
  {
    id: 100,
    name: "Dry Fit Under Armour Bege",
    price: 49.99,
    image: "https://i.imgur.com/4zxeSIo.jpeg",
    imageFront: "https://i.imgur.com/4zxeSIo.jpeg",
    imageBack: "https://i.imgur.com/5BrvT2q.jpeg",
    category: "dryfit",
    isNew: false,
    size: "M"
  },
  {
    id: 101,
    name: "Dry Fit Under Armour Azul e Branca",
    price: 49.99,
    image: "https://i.imgur.com/fk3h2Yq.jpeg",
    imageFront: "https://i.imgur.com/fk3h2Yq.jpeg",
    imageBack: "https://i.imgur.com/a6Mn1xk.jpeg",
    category: "dryfit",
    isNew: false,
    size: "G"
  },
  {
    id: 102,
    name: 'Nike Sombras',
    price: 79.90,
    image: 'https://i.imgur.com/Fq8DnNj.png',
    imageFront: 'https://i.imgur.com/Fq8DnNj.png',
    imageBack: 'https://i.imgur.com/6nwNbuM.png',
    category: 'oversized',
    isNew: false,
    isSale: false,
    size: 'M',
  },
  {
    id: 103,
    name: 'Quiksilver Preta 1',
    price: 42.90,
    image: 'https://i.imgur.com/WLICRrX.jpeg',
    imageFront: 'https://i.imgur.com/WLICRrX.jpeg',
    imageBack: 'https://i.imgur.com/WLICRrX.jpeg',
    category: 'surf',
    isNew: true,
    isSale: false,
    size: 'M',
  },
  {
    id: 104,
    name: 'Quiksilver 2',
    price: 42.90,
    image: 'https://i.imgur.com/1ciQTsP.png',
    imageFront: 'https://i.imgur.com/1ciQTsP.png',
    imageBack: 'https://i.imgur.com/6C49BiR.png',
    category: 'surf',
    isNew: true,
    isSale: false,
    size: 'M',
  },
  {
    id: 105,
    name: 'Quiksilver 3',
    price: 42.90,
    image: 'https://i.imgur.com/SwT2Pm9.png',
    imageFront: 'https://i.imgur.com/SwT2Pm9.png',
    imageBack: 'https://i.imgur.com/MoemOIk.png',
    category: 'surf',
    isNew: true,
    isSale: false,
    size: 'M',
  },

  {
    id: 106,
    name: 'Ripcurl 4',
    price: 42.90,
    image: 'https://i.imgur.com/FIpGUxX.png',
    imageFront: 'https://i.imgur.com/FIpGUxX.png',
    imageBack: 'https://i.imgur.com/uHPyidM.png',
    category: 'surf',
    isNew: true,
    isSale: false,
    size: 'M',
  },
  {
    id: 107,
    name: 'Quiksilver 5',
    price: 42.90,
    image: 'https://i.imgur.com/kSHLRjj.png',
    imageFront: 'https://i.imgur.com/kSHLRjj.png',
    imageBack: 'https://i.imgur.com/FCmYduz.png',
    category: 'surf',
    isNew: true,
    isSale: false,
    size: 'M',
  },
  {
    id: 108,
    name: 'Hang Loose 6',
    price: 42.90,
    image: 'https://i.imgur.com/wI6igDT.png',
    imageFront: 'https://i.imgur.com/wI6igDT.png',
    imageBack: 'https://i.imgur.com/ZUJtSmw.png',
    category: 'surf',
    isNew: true,
    isSale: false,
    size: 'M',
  },
  {
    id: 109,
    name: 'Quiksilver 7',
    price: 42.90,
    image: 'https://i.imgur.com/DanbNVI.png',
    imageFront: 'https://i.imgur.com/DanbNVI.png',
    imageBack: 'https://i.imgur.com/1bvR4HC.png',
    category: 'surf',
    isNew: true,
    isSale: false,
    size: 'M',
  },
  {
  id: 110,
  name: 'Quiksilver 8',
  price: 42,
  image: 'https://i.imgur.com/uyKlQJV.png',
  imageFront: 'https://i.imgur.com/uyKlQJV.png',
  imageBack: 'https://i.imgur.com/93g2y5w.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'G',
},
{
  id: 111,
  name: 'Quiksilver 9',
  price: 42,
  image: 'https://i.imgur.com/EVfq0vI.png',
  imageFront: 'https://i.imgur.com/EVfq0vI.png',
  imageBack: 'https://i.imgur.com/lSSPcEk.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'G',
},
{
  id: 112,
  name: 'Quiksilver 10',
  price: 42,
  image: 'https://i.imgur.com/6k0NNtc.png',
  imageFront: 'https://i.imgur.com/6k0NNtc.png',
  imageBack: 'https://i.imgur.com/iyKM0y9.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'G',
},
{
  id: 113,
  name: 'Quiksilver 11',
  price: 42,
  image: 'https://i.imgur.com/FylymIS.png',
  imageFront: 'https://i.imgur.com/FylymIS.png',
  imageBack: 'https://i.imgur.com/ntnlut2.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'G',
},
{
  id: 114,
  name: 'Quiksilver 12',
  price: 42,
  image: 'https://i.imgur.com/il7OSoO.jpeg',
  imageFront: 'https://i.imgur.com/il7OSoO.jpeg',
  imageBack: 'https://i.imgur.com/3zIJenY.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'G',
},
{
  id: 115,
  name: 'Town&Country 13',
  price: 42,
  image: 'https://i.imgur.com/tz9ZLV5.jpeg',
  imageFront: 'https://i.imgur.com/tz9ZLV5.jpeg',
  imageBack: 'https://i.imgur.com/R4pytEL.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'G',
},
{
  id: 116,
  name: 'Quiksilver 14',
  price: 42,
  image: 'https://i.imgur.com/0ITmJua.jpeg',
  imageFront: 'https://i.imgur.com/0ITmJua.jpeg',
  imageBack: 'https://i.imgur.com/muWsKqr.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'G',
},
{
  id: 117,
  name: 'Mizuno 15',
  price: 42,
  image: 'https://i.imgur.com/SzsAclK.jpeg',
  imageFront: 'https://i.imgur.com/SzsAclK.jpeg',
  imageBack: 'https://i.imgur.com/SzsAclK.jpeg',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'G',
},
{
  id: 118,
  name: 'Quiksilver 16',
  price: 42,
  image: 'https://i.imgur.com/FIz8CIX.jpeg',
  imageFront: 'https://i.imgur.com/FIz8CIX.jpeg',
  imageBack: 'https://i.imgur.com/gg0eLCm.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'G',
},
{
  id: 119,
  name: 'Quiksilver 17',
  price: 42,
  image: 'https://i.imgur.com/ejlXAG3.jpeg',
  imageFront: 'https://i.imgur.com/ejlXAG3.jpeg',
  imageBack: 'https://i.imgur.com/ejlXAG3.jpeg',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'GG',
},
{
  id: 120,
  name: 'Quiksilver 18',
  price: 42,
  image: 'https://i.imgur.com/kOpZVhQ.jpeg',
  imageFront: 'https://i.imgur.com/kOpZVhQ.jpeg',
  imageBack: 'https://i.imgur.com/kOpZVhQ.jpeg',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'GG',
},
{
  id: 121,
  name: 'Quiksilver 19',
  price: 42,
  image: 'https://i.imgur.com/yC5t3lK.jpeg',
  imageFront: 'https://i.imgur.com/yC5t3lK.jpeg',
  imageBack: 'https://i.imgur.com/ms2H1gQ.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'GG',
},
{
  id: 122,
  name: 'Quiksilver 20',
  price: 42,
  image: 'https://i.imgur.com/1qdFR3b.jpeg',
  imageFront: 'https://i.imgur.com/1qdFR3b.jpeg',
  imageBack: 'https://i.imgur.com/fifOSIK.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'GG',
},
{
  id: 123,
  name: 'Quiksilver 21',
  price: 42,
  image: 'https://i.imgur.com/3kPRRY1.jpeg',
  imageFront: 'https://i.imgur.com/3kPRRY1.jpeg',
  imageBack: 'https://i.imgur.com/5sJUVEi.png',
  category: 'surf',
  isNew: true,
  isSale: false,
  size: 'GG',
},
{
  id: 124,
  name: 'Lacoste 22',
  price: 100,
  image: 'https://i.imgur.com/pFmQhPv.jpeg',
  imageFront: 'https://i.imgur.com/pFmQhPv.jpeg',
  imageBack: 'https://i.imgur.com/RhhwgnU.png',
  category: 'peruana',
  isNew: true,
  isSale: false,
  size: 'M',
},
{
  id: 125,
  name: 'Camiseta Lacoste 23',
  price: 100,
  image: 'https://lh3.googleusercontent.com/d/1LgpMpwztVe04mpD8nlzObe2s4S2mNrhE',
  imageFront: 'https://lh3.googleusercontent.com/d/1LgpMpwztVe04mpD8nlzObe2s4S2mNrhE',
  imageBack: 'https://lh3.googleusercontent.com/d/1LgpMpwztVe04mpD8nlzObe2s4S2mNrhE',
  category: 'Peruana',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 126,
  name: 'Camiseta Lacoste 24',
  price: 100,
  image: 'https://lh3.googleusercontent.com/d/1LwrbO7rv8BRgqGSLWjzx22bncUN0YLHm',
  imageFront: 'https://lh3.googleusercontent.com/d/1LwrbO7rv8BRgqGSLWjzx22bncUN0YLHm',
  imageBack: 'https://lh3.googleusercontent.com/d/1A5Af4xCPNckAjbsGNupUCbVFuq4gXCwd',
  category: 'Peruana',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 127,
  name: 'Camiseta Lacoste 25',
  price: 100,
  image: 'https://lh3.googleusercontent.com/d/1NxpgZbvUUrWjvFF_8LVS6_3Q0skrVewF',
  imageFront: 'https://lh3.googleusercontent.com/d/1NxpgZbvUUrWjvFF_8LVS6_3Q0skrVewF',
  imageBack: 'https://lh3.googleusercontent.com/d/1NxpgZbvUUrWjvFF_8LVS6_3Q0skrVewF',
  category: 'Peruana',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 128,
  name: 'Camiseta Lacoste 26',
  price: 100,
  image: 'https://lh3.googleusercontent.com/d/1D41r6w0jIvdAaxUu4B_NViyTsGuCciqS',
  imageFront: 'https://lh3.googleusercontent.com/d/1D41r6w0jIvdAaxUu4B_NViyTsGuCciqS',
  imageBack: 'https://lh3.googleusercontent.com/d/1fyoY1yK54f28RLF-XPS4UanzeU4mmcdn',
  category: 'Peruana',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 129,
  name: 'Camiseta Diesel 27',
  price: 100,
  image: 'https://lh3.googleusercontent.com/d/13f_frkQpHn9XU7bxYPMplTyFNNscZ_y9',
  imageFront: 'https://lh3.googleusercontent.com/d/13f_frkQpHn9XU7bxYPMplTyFNNscZ_y9',
  imageBack: 'https://lh3.googleusercontent.com/d/13f_frkQpHn9XU7bxYPMplTyFNNscZ_y9',
  category: 'Peruana',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 130,
  name: 'Camiseta Lacoste 28',
  price: 100,
  image: 'https://lh3.googleusercontent.com/d/1mMVSycysAa2KQK_LJyvxhl-zsK2pZlbm',
  imageFront: 'https://lh3.googleusercontent.com/d/1mMVSycysAa2KQK_LJyvxhl-zsK2pZlbm',
  imageBack: 'https://lh3.googleusercontent.com/d/1s9sxoopl0MA_BA5BAZvyDXi7S2QjlJar',
  category: 'Peruana',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 131,
  name: 'Camiseta Lacoste 29',
  price: 100,
  image: 'https://lh3.googleusercontent.com/d/1FU7P_lwSw5UX8Y3HGdWc2Bw9UbNJTzZS',
  imageFront: 'https://lh3.googleusercontent.com/d/1FU7P_lwSw5UX8Y3HGdWc2Bw9UbNJTzZS',
  imageBack: 'https://lh3.googleusercontent.com/d/1vE0WsrV-Z61rJqFlXUAsEsA8ScEdxJwW',
  category: 'Peruana',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 132,
  name: 'Camiseta Oversized AMIRI 30',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1MQAWMewYtZ_Anpk7uL2Q-4eMJVn4TE8X',
  imageFront: 'https://lh3.googleusercontent.com/d/1MQAWMewYtZ_Anpk7uL2Q-4eMJVn4TE8X',
  imageBack: 'https://lh3.googleusercontent.com/d/16dVzZrkehddZFaQcaH3FE3YRVVf1u970',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'P'
},
{
  id: 133,
  name: 'Camiseta Oversized AMIRI 31',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1DcUHgkSWMoDbY4KNK8ZYxvZvcSqVDuWm',
  imageFront: 'https://lh3.googleusercontent.com/d/1DcUHgkSWMoDbY4KNK8ZYxvZvcSqVDuWm',
  imageBack: 'https://lh3.googleusercontent.com/d/14XLPU-fkJ-o4em9UICK4XK3vLUeaZ3x3',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'P'
},
{
  id: 134,
  name: 'Camiseta Oversized Nike 32',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1q2mponDlsbjkJUEUpfA7d_-TAlk-PijR',
  imageFront: 'https://lh3.googleusercontent.com/d/1q2mponDlsbjkJUEUpfA7d_-TAlk-PijR',
  imageBack: 'https://lh3.googleusercontent.com/d/1UgOBrCozrcFmSt1OyNGWMPuwADwByb91',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'GG'
},
{
  id: 135,
  name: 'Camiseta Oversized Supreme 33',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1Sj1RtpLxbcUnSYm9pUwQEqnC1mXidpR7',
  imageFront: 'https://lh3.googleusercontent.com/d/1Sj1RtpLxbcUnSYm9pUwQEqnC1mXidpR7',
  imageBack: 'https://lh3.googleusercontent.com/d/1UoqPdvaA88m5cmyIBkIvcjI1Ckw2UdW4',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'GG'
},
{
  id: 136,
  name: 'Camiseta Oversized Adidas 34',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1Hby8Cn9v3sJ_JQVoWyfCNROgU8g-qprP',
  imageFront: 'https://lh3.googleusercontent.com/d/1Hby8Cn9v3sJ_JQVoWyfCNROgU8g-qprP',
  imageBack: 'https://lh3.googleusercontent.com/d/1MKRD4S8afNSpVaMSPqBJ4VkYCh9UaW4A',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'GG'
},
{
  id: 137,
  name: 'Camiseta Oversized Nike 35',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1j7smkkwoBxwPkigY_WZAji5IGz2Gtig2',
  imageFront: 'https://lh3.googleusercontent.com/d/1j7smkkwoBxwPkigY_WZAji5IGz2Gtig2',
  imageBack: 'https://lh3.googleusercontent.com/d/1GBdCZymM5NY_bZdce6moEjgkpSBem_vt',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'GG'
},
{
  id: 138,
  name: 'Camiseta Oversized Nike 36',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/19m7lNemLz3RERe-L9C0uZTfb5kgz1J2z',
  imageFront: 'https://lh3.googleusercontent.com/d/19m7lNemLz3RERe-L9C0uZTfb5kgz1J2z',
  imageBack: 'https://lh3.googleusercontent.com/d/1XpSLJsKpEaveKewqtMbZvjvx5TZ4L-uz',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'GG'
},
{
  id: 139,
  name: 'Camiseta Oversized Nike 37',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1RKRfTffK77_Sbv2p_NkSyyHMSt5fW0bj',
  imageFront: 'https://lh3.googleusercontent.com/d/1RKRfTffK77_Sbv2p_NkSyyHMSt5fW0bj',
  imageBack: 'https://lh3.googleusercontent.com/d/1VT_v-bWSKWE9k-Q1whzu-D5-pUdQPmn5',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 140,
  name: 'Camiseta Oversized Nike 38',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1JrsL9dpVGlDgzN5ojk1PyTbFKFc4fm67',
  imageFront: 'https://lh3.googleusercontent.com/d/1JrsL9dpVGlDgzN5ojk1PyTbFKFc4fm67',
  imageBack: 'https://lh3.googleusercontent.com/d/1S5S-0_-bDM7BmZTX67xY2PvZ0zquUYbl',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 141,
  name: 'Camiseta Oversized Nike 39',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1ufDOETEomYsSbQ-1qthr0USWKvkWscHo',
  imageFront: 'https://lh3.googleusercontent.com/d/1ufDOETEomYsSbQ-1qthr0USWKvkWscHo',
  imageBack: 'https://lh3.googleusercontent.com/d/1VAvEAA4g54LHdo7Lssogy8Il9pffnQbY',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 142,
  name: 'Camiseta Oversized The North 40',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1NTmTXyX5h8cwlb2hxA7V_S7XSWFahHvO',
  imageFront: 'https://lh3.googleusercontent.com/d/1NTmTXyX5h8cwlb2hxA7V_S7XSWFahHvO',
  imageBack: 'https://lh3.googleusercontent.com/d/1bHt8_rpYY9xfiLDDmtCuOy88CZ9QoxKV',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 143,
  name: 'Camiseta Oversized Nike 41',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1uSjZ0E-nqKyBfv4oSyTR0OxiTWxnJed_',
  imageFront: 'https://lh3.googleusercontent.com/d/1uSjZ0E-nqKyBfv4oSyTR0OxiTWxnJed_',
  imageBack: 'https://lh3.googleusercontent.com/d/1Ddov67p5y5wl58I1VJ_gEIAQFItK1g8a',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 144,
  name: 'Camiseta Oversized 42',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/16nvCazOWx03b9OwYX1MXMeqMFSlyZoBY',
  imageFront: 'https://lh3.googleusercontent.com/d/16nvCazOWx03b9OwYX1MXMeqMFSlyZoBY',
  imageBack: 'https://lh3.googleusercontent.com/d/15k4UJXe_ZuoBOB3_qWF2Pec3oRLP-KW8',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'M'
},
{
  id: 145,
  name: 'Camiseta Oversized Adidas 43',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1ZilNur3nXZMx6n7Cggu28ca9NTORnzul',
  imageFront: 'https://lh3.googleusercontent.com/d/1ZilNur3nXZMx6n7Cggu28ca9NTORnzul',
  imageBack: 'https://lh3.googleusercontent.com/d/1e4IIt5DyfqF2Jm6LL4nQ6mC87byTEWPp',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'G'
},
{
  id: 146,
  name: 'Camiseta Oversized Nike 44',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1Ppa52oXA_kVXORjYDUBWNViBb3KpDEQO',
  imageFront: 'https://lh3.googleusercontent.com/d/1Ppa52oXA_kVXORjYDUBWNViBb3KpDEQO',
  imageBack: 'https://lh3.googleusercontent.com/d/1I77ucQvbhjzK76xOOxjhwFReNy_-5QRk',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'G'
},
{
  id: 147,
  name: 'Camiseta Oversized Nike 45',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1WdGH3-eXE6phb59X4_4dLrbR1zwX4-s3',
  imageFront: 'https://lh3.googleusercontent.com/d/1WdGH3-eXE6phb59X4_4dLrbR1zwX4-s3',
  imageBack: 'https://lh3.googleusercontent.com/d/16EDuaipB7Dm8vnLAYb-m9hkUDUdiQmh9',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'G'
},
{
  id: 148,
  name: 'Camiseta Oversized Nike 46',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1K4IsoH6jZspcWbIzCjS7AUB0myeUt9Ts',
  imageFront: 'https://lh3.googleusercontent.com/d/1K4IsoH6jZspcWbIzCjS7AUB0myeUt9Ts',
  imageBack: 'https://lh3.googleusercontent.com/d/1vJjlcE8bu56EFTcFNLAGSQ1Oy6OueAzL',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'G'
},
{
  id: 149,
  name: 'Camiseta Oversized Nike 47',
  price: 79.99,
  image: 'https://lh3.googleusercontent.com/d/1KSzumkMvnhvX-CSZ2QaI6ClZf-f-bt_5',
  imageFront: 'https://lh3.googleusercontent.com/d/1KSzumkMvnhvX-CSZ2QaI6ClZf-f-bt_5',
  imageBack: 'https://lh3.googleusercontent.com/d/1lhQhO8t4xc8bo8wIoIvOVFDgf5DSZ5jk',
  category: 'Oversized',
  isNew: true,
  isSale: false,
  size: 'G'
}


];

const ITEMS_PER_PAGE = 12;

export default function Catalog() {
  // Estado
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const dialogRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  // ===== Acessibilidade do modal (ESC + focus trap + bloqueio scroll) =====
  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // foca no título do modal ao abrir
    dialogRef.current?.querySelector<HTMLElement>("#product-title")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow || "unset";
    };
  }, [isModalOpen]);

  // Fechar filtros ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===== Contagem por categoria (considera busca + tamanhos) =====
  const categoryCounts = useMemo(() => {
    const q = strip(searchTerm);
    const bySearch = (p: any) => strip(p.name).includes(q);
    const bySizes = (p: any) =>
      selectedSizes.length === 0 ||
      selectedSizes.some((s) => parseSizes(p.size || "").includes(s.toUpperCase()));
    const bySale = (p: any) => !showOnlySale || p.isSale;

    const base = products.filter((p) => bySearch(p) && bySizes(p) && bySale(p));
    const counts: Record<string, number> = { todos: base.length };

    categories.forEach((c) => {
      if (c.id !== "todos") {
        if (c.id === "promocoes") {
          counts[c.id] = base.filter((p) => p.isSale).length;
        } else {
          counts[c.id] = base.filter((p) => strip(p.category) === strip(c.id)).length;
        }
      }
    });

    return counts;
  }, [searchTerm, selectedSizes, showOnlySale]);

  // ===== Filtro + ordenação =====
  const filteredProducts = useMemo(() => {
    const q = strip(searchTerm);

    const matchesCategory = (p: any) => {
      if (selectedCategory === "todos") return true;
      if (selectedCategory === "promocoes") return p.isSale;
      return strip(p.category) === strip(selectedCategory);
    };

    const matchesSearch = (p: any) => strip(p.name).includes(q);

    const matchesSizes = (p: any) =>
      selectedSizes.length === 0 ||
      selectedSizes.some((s) => parseSizes(p.size || "").includes(s.toUpperCase()));

    const matchesSale = (p: any) => !showOnlySale || p.isSale;

    let result = products.filter((p) =>
      matchesCategory(p) &&
      matchesSearch(p) &&
      matchesSizes(p) &&
      matchesSale(p)
    );

    const sortRelevance = (a: any, b: any) => {
      const isASale = a.isSale ? 1 : 0;
      const isBSale = b.isSale ? 1 : 0;

      if (isASale !== isBSale) {
        return isBSale - isASale; // Promos first
      }

      const isANew = a.isNew ? 1 : 0;
      const isBNew = b.isNew ? 1 : 0;

      if (isANew !== isBNew) {
        return isBNew - isANew; // New items next
      }

      return 0; // Maintain original order for others
    };

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "relevance":
      default:
        result.sort(sortRelevance);
        break;
    }

    return result;
  }, [selectedCategory, searchTerm, selectedSizes, sort, showOnlySale]);

  // Paginação incremental
  const productsToShow = useMemo(() => filteredProducts.slice(0, visibleItems), [filteredProducts, visibleItems]);
  const hasMoreItems = visibleItems < filteredProducts.length;

  // Handlers
  const handleProductClick = useCallback((product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const loadMore = () => setVisibleItems((prev) => prev + ITEMS_PER_PAGE);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleItems(ITEMS_PER_PAGE);
    setShowFilters(false);
  };

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSizes([]);
    setSelectedCategory("todos");
    setSort("relevance");
    setShowOnlySale(false);
    setVisibleItems(ITEMS_PER_PAGE);
  };

  // Contador de filtros ativos
  const activeFiltersCount = selectedSizes.length + (showOnlySale ? 1 : 0) + (searchTerm ? 1 : 0);

  // ===== Render =====
  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-black text-4xl md:text-6xl mb-6">
            <span className="text-foreground">NOSSO</span>
            <br />
            <span className="bg-gradient-urban bg-clip-text text-transparent">CATÁLOGO</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada peça é uma declaração. Encontre a camiseta que combina com seu estilo urbano.
          </p>
        </div>

        {/* Busca principal */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-secondary border-border focus:border-accent pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Botão de filtros para mobile */}
          <div className="md:hidden flex items-center gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 w-full"
            >
              <Filter size={16} />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* Toggle de visualização */}
            <div className="flex border rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "bg-secondary"}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-accent text-accent-foreground" : "bg-secondary"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Ordenação para desktop */}
          <div className="hidden md:flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground"
              aria-label="Ordenar por"
            >
              <option value="relevance">Relevância</option>
              <option value="newest">Novidades</option>
              <option value="price-asc">Preço: menor → maior</option>
              <option value="price-desc">Preço: maior → menor</option>
              <option value="name-asc">Nome (A→Z)</option>
            </select>

            <Button variant="ghost" onClick={clearFilters} className="text-sm">
              Limpar filtros
            </Button>
          </div>
        </div>

        {/* Layout principal */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtros laterais (desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-secondary rounded-lg p-4 sticky top-24">
              <h3 className="font-semibold mb-4">Filtros</h3>

              {/* Filtro de promoções */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium">Promoções</label>
                  <Badge variant="secondary">{categoryCounts.promocoes || 0}</Badge>
                </div>
                <button
                  onClick={() => setShowOnlySale(!showOnlySale)}
                  className={`w-full p-3 rounded-lg text-left transition ${showOnlySale
                    ? "bg-red-100 text-red-800 border border-red-300"
                    : "bg-background border border-border hover:bg-accent/10"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Ver apenas promoções</span>
                    {showOnlySale && <X size={16} />}
                  </div>
                </button>
              </div>

              {/* Filtro de tamanhos */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Tamanhos</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["P", "M", "G", "GG"].map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`p-2 rounded border text-sm transition ${selectedSizes.includes(s)
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background border-border hover:bg-accent/10"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categorias */}
              <div>
                <h4 className="font-medium mb-3">Categorias</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full p-2 rounded text-left transition flex items-center justify-between ${selectedCategory === category.id
                        ? "bg-gradient-urban text-background"
                        : "hover:bg-accent/10"
                        }`}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{categoryCounts[category.id] || 0}</Badge>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {/* Header de resultados */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>

              {/* Ordenação para mobile */}
              <div className="md:hidden flex items-center gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="px-3 py-1 text-sm rounded bg-secondary border border-border"
                  aria-label="Ordenar por"
                >
                  <option value="relevance">Relevância</option>
                  <option value="newest">Novidades</option>
                  <option value="price-asc">Preço: menor</option>
                  <option value="price-desc">Preço: maior</option>
                  <option value="name-asc">Nome A-Z</option>
                </select>
              </div>
            </div>

            {/* Filtros mobile */}
            {showFilters && (
              <div ref={filtersRef} className="md:hidden bg-secondary rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filtros</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={20} />
                  </button>
                </div>

                {/* Filtro de promoções mobile */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowOnlySale(!showOnlySale)}
                    className={`w-full p-3 rounded-lg text-left transition ${showOnlySale
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-background border border-border"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Ver apenas promoções</span>
                      {showOnlySale && <X size={16} />}
                    </div>
                  </button>
                </div>

                {/* Filtro de tamanhos mobile */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Tamanhos</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {["P", "M", "G", "GG"].map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className={`p-2 rounded border text-sm transition ${selectedSizes.includes(s)
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background border-border"
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categorias mobile */}
                <div>
                  <h4 className="font-medium mb-2">Categorias</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`p-2 rounded text-left transition flex items-center justify-between ${selectedCategory === category.id
                          ? "bg-gradient-urban text-background"
                          : "bg-background"
                          }`}
                      >
                        <span className="text-sm">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {categoryCounts[category.id] || 0}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Grid de produtos / Empty */}
            {productsToShow.length > 0 ? (
              <>
                <div className={`grid gap-6 mb-12 ${viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
                  }`}>
                  {productsToShow.map((product: any) => (
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
                      Ver Mais ({filteredProducts.length - visibleItems})
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Nenhum produto encontrado.</p>
                <div className="mt-4">
                  <Button variant="ghost" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal acessível */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-title"
            className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-[0_0_20px_5px_rgba(0,255,0,0.3)] border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800"
              aria-label="Fechar"
            >
              ×
            </button>

            <ProductCarousel product={selectedProduct} />

            <div className="space-y-2 text-center mt-4">
              <h3 id="product-title" tabIndex={-1} className="text-2xl font-bold">
                {selectedProduct.name}
              </h3>
              <p className="text-lg">
                <span className="font-semibold">Preço:</span> {BRL(selectedProduct.price)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Tamanhos:</span> {selectedProduct.size}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Categoria:</span> {selectedProduct.category}
              </p>

              {(() => {
                const text = `Olá! Tenho interesse no produto *${selectedProduct.name}* no valor de *${BRL(
                  selectedProduct.price
                )}*.`;
                const wa = `https://wa.me/5511972988072?text=${encodeURIComponent(text)}`;
                return (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 shadow-[0_0_10px_rgba(0,255,0,0.5)] font-medium"
                  >
                    {/* Ícone simples */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d="M20 2H4C2.9 2 2 2.9 2 4v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                    Falar no WhatsApp
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}