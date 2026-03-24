import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-streetwear.jpg';

const Hero = () => {
  return (
    <>
      <section id="home" className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        {/* Full Bleed Background Image with subtle overlay for contrast */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <div className="max-w-4xl flex flex-col items-center">
            <span className="text-white/80 font-medium text-xs md:text-sm tracking-[0.2em] uppercase mb-6 animate-fadeIn">
              Nova Coleção 2026
            </span>

            <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl mb-6 leading-none tracking-tight text-white animate-slideUp">
              ELEVATE YOUR <br className="hidden md:block" />
              <span className="italic font-light">EVERYDAY</span>
            </h1>

            <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl font-light leading-relaxed animate-slideUp delay-100">
              Streetwear minimalista desenhado para durar. A fusão perfeita entre conforto absoluto e design atemporal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-slideUp delay-200">
              <a href="#catalog" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-white text-black hover:bg-white/90 font-medium px-10 py-7 text-sm tracking-widest uppercase transition-all duration-300 rounded-none"
                >
                  Shop Collection
                </Button>
              </a>
              <a href="#about" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:bg-white hover:text-black font-medium px-10 py-7 text-sm tracking-widest uppercase transition-all duration-300 rounded-none bg-transparent backdrop-blur-sm"
                >
                  A Marca
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <h3 className="font-heading font-semibold text-base mb-3 tracking-wide uppercase">Qualidade Premium</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">Algodão de alta gramatura e sustentável para um perfeito caimento estruturado.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <h3 className="font-heading font-semibold text-base mb-3 tracking-wide uppercase">Envio Expresso</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">Agilidade na postagem. Entregas expressas em tempo recorde em todo o Brasil.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <h3 className="font-heading font-semibold text-base mb-3 tracking-wide uppercase">Troca Descomplicada</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">Primeira troca gratuita, rápida e sem burocracia para você aproveitar com segurança.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;