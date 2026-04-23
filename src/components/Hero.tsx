import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-streetwear.jpg';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

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
              {t('hero.badge')}
            </span>

            <h1
              className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl mb-6 leading-none tracking-tight text-white animate-slideUp"
              dangerouslySetInnerHTML={{ __html: t('hero.title') }}
            >
            </h1>

            <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl font-light leading-relaxed animate-slideUp delay-100">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-slideUp delay-200">
              <a href="#catalog" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-white text-black hover:bg-white/90 font-medium px-10 py-7 text-sm tracking-widest uppercase transition-all duration-300 rounded-none"
                >
                  {t('hero.cta1')}
                </Button>
              </a>
              <a href="#about" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:bg-white hover:text-black font-medium px-10 py-7 text-sm tracking-widest uppercase transition-all duration-300 rounded-none bg-transparent backdrop-blur-sm"
                >
                  {t('hero.cta2')}
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
              <h3 className="font-heading font-semibold text-base mb-3 tracking-wide uppercase">{t('hero.features.qualityTitle')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{t('hero.features.qualityDesc')}</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <h3 className="font-heading font-semibold text-base mb-3 tracking-wide uppercase">{t('hero.features.shippingTitle')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{t('hero.features.shippingDesc')}</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <h3 className="font-heading font-semibold text-base mb-3 tracking-wide uppercase">{t('hero.features.returnsTitle')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{t('hero.features.returnsDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;