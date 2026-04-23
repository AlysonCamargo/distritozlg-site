import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Users, Palette, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const values = [
    {
      icon: Zap,
      title: 'Autenticidade',
      description: 'Cada design nasce da rua, para a rua. Sem frescura, só atitude.',
    },
    {
      icon: Palette,
      title: 'Criatividade',
      description: 'Arte urbana que veste. Cada estampa conta uma história única.',
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Mais que clientes, somos uma crew. Unidos pela paixão urbana.',
    },
    {
      icon: Target,
      title: 'Qualidade',
      description: 'Tecidos premium, impressão duradoura. Feito para resistir às ruas.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 border-b border-border pb-10">
          <h2 className="font-heading font-light text-4xl md:text-6xl mb-6 tracking-tight uppercase">
            {t('about.title')} <br />
            <span className="font-bold">{t('about.subtitle')}</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('about.desc1')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.desc2')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-transparent border-border rounded-sm hover:border-foreground transition-all duration-300 shadow-none">
            <CardContent className="p-10">
              <h3 className="font-heading font-semibold tracking-widest uppercase text-xl text-foreground mb-6">
                {t('about.originTitle')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('about.originText')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.originText2')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-border rounded-sm hover:border-foreground transition-all duration-300 shadow-none">
            <CardContent className="p-10">
              <h3 className="font-heading font-semibold tracking-widest uppercase text-xl text-foreground mb-6">
                {t('about.futureTitle')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('about.futureText')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.futureText2')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => (
            <Card key={index} className="bg-transparent border-none shadow-none group">
              <CardContent className="p-2 text-center">
                <div className="w-12 h-12 bg-secondary rounded-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-foreground transition-colors duration-300">
                  <value.icon className="w-5 h-5 text-foreground group-hover:text-background transition-colors duration-300" />
                </div>
                <h4 className="font-semibold uppercase tracking-widest text-sm text-foreground mb-3">
                  {t(`about.${value.title === 'Autenticidade' ? 'auth' : value.title === 'Criatividade' ? 'creativity' : value.title === 'Comunidade' ? 'community' : 'quality'}Title`)}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`about.${value.title === 'Autenticidade' ? 'auth' : value.title === 'Criatividade' ? 'creativity' : value.title === 'Comunidade' ? 'community' : 'quality'}Text`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="#catalog">
            <Button
              size="lg"
              className="bg-foreground text-background rounded-sm tracking-widest uppercase font-semibold px-10 py-7 text-sm hover:bg-foreground/90 transition-all duration-300"
            >
              {t('about.cta')}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;