import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Users, Palette, Target } from 'lucide-react';

const About = () => {
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
            A <span className="font-bold">Essência</span>
            <br />
            da <span className="text-foreground">Marca</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nascemos nas ruas, crescemos com a cultura. A <strong className="text-accent">Distrito ZLG</strong> é mais 
              que uma marca - somos um movimento que veste a autenticidade da juventude urbana.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Desde 2025, criamos camisetas que falam a linguagem da rua. Cada peça é pensada para quem 
              não tem medo de se expressar, para quem vive intensamente e quer que sua roupa reflita essa energia.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-transparent border-border rounded-sm hover:border-foreground transition-all duration-300 shadow-none">
            <CardContent className="p-10">
              <h3 className="font-heading font-semibold tracking-widest uppercase text-xl text-foreground mb-6">
                Nossa Origem
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tudo começou quando dois amigos se juntaram no começo de 2025 com uma ideia simples: 
                criar roupas que representassem nossa vibe, nossa cultura, nosso jeito de ver o mundo.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Das conversas no ponto de ônibus nasceu a Distrito ZLG. O "ZLG" são as iniciais dos fundadores que ousaram sonhar grande.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-border rounded-sm hover:border-foreground transition-all duration-300 shadow-none">
            <CardContent className="p-10">
              <h3 className="font-heading font-semibold tracking-widest uppercase text-xl text-foreground mb-6">
                O Futuro
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nosso objetivo é simples: ser a marca que representa a juventude urbana brasileira. 
                Queremos estar em cada quebrada, em cada rolê, em cada momento importante.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Estamos expandindo, mas sem perder a essência. Cada nova cidade, cada novo cliente, 
                faz parte da nossa família urbana que só cresce.
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
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
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
              Conheça as Peças
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;