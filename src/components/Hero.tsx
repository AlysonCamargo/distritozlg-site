import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import heroImage from '@/assets/hero-streetwear.jpg';

const testimonials = [
  {
    name: "Lucas Gabriel",
    handle: "@e_lucasss",
    initials: "LG",
    text: "A melhor loja de streetwear que já comprei. Qualidade absurda!"
  },
  {
    name: "Bruno Antonio",
    handle: "@bruno.antonio_silva",
    initials: "BA",
    text: "As peças chegaram super rápido e o atendimento foi excelente. Recomendo demais!"
  },
  {
    name: "Alyson Camargo",
    handle: "@Alyshow",
    initials: "AC",
    text: "Estilo único! Todo mundo pergunta onde comprei. Virei cliente fiel."
  }
];

const Hero = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-10">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight animate-slideUp">
            DISTRITO <br />
            <span className="bg-gradient-urban bg-clip-text text-transparent">ZLG</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed animate-slideUp delay-100">
            Streetwear autêntico para quem não segue tendências, cria.
            Qualidade premium e design exclusivo em cada peça.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slideUp delay-200">
            <a href="#catalog">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-foreground text-background font-bold px-8 py-6 text-lg hover:bg-foreground/90 transition-all duration-300 gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                COMPRAR AGORA
              </Button>
            </a>
            <a href="#about">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 font-bold px-8 py-6 text-lg transition-all duration-300 gap-2"
              >
                SAIBA MAIS
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-8 border-t border-border/50 animate-fadeIn delay-300">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">100+</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Modelos Exclusivos</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">200+</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">5 ★</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Avaliação Clientes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - Mobile (Inline) & Desktop (Floating) */}
      <div className="relative z-10 container mx-auto px-4 mt-12 lg:hidden">
        <div className="bg-secondary/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-urban flex items-center justify-center text-background font-bold text-xl shrink-0">
              {testimonials[currentTestimonial].initials}
            </div>
            <div>
              <p className="font-bold text-foreground">{testimonials[currentTestimonial].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[currentTestimonial].handle}</p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 italic">
            "{testimonials[currentTestimonial].text}"
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block animate-float w-80">
        <div className="bg-secondary/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-2xl transition-all duration-500">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-urban flex items-center justify-center text-background font-bold text-xl">
              {testimonials[currentTestimonial].initials}
            </div>
            <div>
              <p className="font-bold text-foreground">{testimonials[currentTestimonial].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[currentTestimonial].handle}</p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 italic min-h-[3rem]">
            "{testimonials[currentTestimonial].text}"
          </p>

          {/* Indicators */}
          <div className="flex justify-center gap-1 mt-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${idx === currentTestimonial ? 'bg-accent' : 'bg-muted-foreground/30'}`}
                onClick={() => setCurrentTestimonial(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;