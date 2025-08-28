import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-streetwear.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
            <span className="text-foreground">DISTRITO</span>
            <br />
            <span className="bg-gradient-urban bg-clip-text text-transparent">Z LG</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
            STREETWEAR QUE FALA A TUA LINGUAGEM
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Camisetas exclusivas para quem vive a cultura urbana. 
            Design autêntico, qualidade premium, estilo que não passa despercebido.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#catalog">
              <Button 
                size="lg" 
                className="bg-gradient-urban text-background font-bold px-8 py-6 text-lg hover:shadow-glow transition-all duration-300"
              >
                VER CATÁLOGO
              </Button>
            </a>
            <a href="#about">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold px-8 py-6 text-lg transition-all duration-300"
              >
                NOSSA HISTÓRIA
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Designs Únicos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-pink mb-2">10K+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-purple mb-2">5★</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Avaliação Média</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-accent/30 rounded-full animate-pulse" />
      <div className="absolute bottom-32 right-16 w-12 h-12 bg-neon-pink/20 rounded-lg rotate-45 animate-bounce" />
      <div className="absolute top-1/2 right-8 w-6 h-6 bg-neon-purple/40 rounded-full animate-ping" />
    </section>
  );
};

export default Hero;