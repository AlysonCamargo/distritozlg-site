import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <Catalog />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
