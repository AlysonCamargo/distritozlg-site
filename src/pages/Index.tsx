import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { products, Product } from '@/data/products';

const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const product = products.find(p => p.id === Number(id));
      if (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
      } else {
        navigate('/', { replace: true });
      }
    } else {
      setIsModalOpen(false);
    }
  }, [id, navigate]);

  const featuredProducts = products.filter(p => p.isNew || p.isSale).slice(0, 4);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Distrito ZLG - Streetwear Urbano 2026 🔥</title>
        <meta name="description" content="Comece o ano com estilo! Streetwear exclusivo, oversized, dryfit e muito mais. Frete grátis acima de R$ 150." />
        <meta property="og:title" content="Distrito ZLG - Streetwear Urbano 2026 🔥" />
        <meta property="og:description" content="Comece o ano com estilo! Streetwear exclusivo com frete grátis." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navigation />
      <Hero />

      {/* Featured Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-border pb-4">
            <div>
              <h2 className="font-heading font-light text-3xl md:text-4xl tracking-tight uppercase">
                Trending <span className="font-bold">Now</span>
              </h2>
              <p className="text-muted-foreground mt-2 font-light">As peças mais desejadas da temporada.</p>
            </div>
            <a href="#catalog" className="text-sm font-medium uppercase tracking-widest hover:text-muted-foreground transition-colors mt-4 md:mt-0">
              Ver Coleção Completa &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div
                key={product.id}
                className="transform transition-transform hover:scale-105 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Catalog />
      <About />
      <Contact />
      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;
