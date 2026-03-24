import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    // Monta o corpo do e-mail
    const body = `Nome: ${name}%0AEmail: ${email}%0AMensagem: ${message}`;

    // Gera o link mailto
    const mailtoLink = `mailto:mcgm@gmail.com?subject=${encodeURIComponent(subject || "Contato")}&body=${body}`;

    // Abre o cliente de e-mail do usuário
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20 border-b border-border pb-10">
          <h2 className="font-heading font-light text-4xl md:text-6xl mb-6 tracking-tight uppercase">
            Fale com o <span className="font-bold">Distrito</span>
          </h2>
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground max-w-2xl mx-auto">
            Atendimento exclusivo para clientes e parceiros.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-background border-border rounded-sm shadow-none">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="font-heading font-semibold uppercase tracking-widest text-lg text-foreground">
                Envie uma Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Nome *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 bg-secondary border-border focus:border-accent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 bg-secondary border-border focus:border-accent"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-foreground font-medium">
                    Assunto
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 bg-secondary border-border focus:border-accent"
                    placeholder="Sobre o que você quer falar?"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Mensagem *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="mt-1 bg-secondary border-border focus:border-accent resize-none"
                    placeholder="Conte tudo aqui..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-foreground text-background font-semibold uppercase tracking-widest text-xs hover:bg-foreground/90 transition-colors rounded-sm h-14 mt-4"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading font-semibold tracking-widest uppercase text-lg text-foreground mb-8">
                Canais Diretos
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-transparent border border-border rounded-sm flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-widest text-foreground mb-1">Instagram</h4>
                    <p className="text-muted-foreground text-sm mb-2">Acompanhe nossos lançamentos</p>
                    <a href="https://www.instagram.com/distritozlg/" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-muted-foreground font-medium text-sm transition-colors">@distritozlg</a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-transparent border border-border rounded-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-widest text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm mb-2">Para parcerias e dúvidas</p>
                    <a href="mailto:contato@distritozlg.com.br" className="text-foreground underline hover:text-muted-foreground font-medium text-sm transition-colors">contato@zlg.com.br</a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-transparent border border-border rounded-sm flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-widest text-foreground mb-1">WhatsApp</h4>
                    <p className="text-muted-foreground text-sm mb-2">Atendimento direto</p>
                    <a href="https://wa.me/5511972988072" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-muted-foreground font-medium text-sm transition-colors">(11) 97298-8072</a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-transparent border border-border rounded-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-widest text-foreground mb-1">Localização</h4>
                    <p className="text-muted-foreground text-sm">Bragança Paulista - SP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <Card className="bg-transparent border-border rounded-sm shadow-none mt-12">
              <CardContent className="p-8">
                <h4 className="font-heading font-semibold tracking-widest uppercase text-sm text-foreground mb-6">
                  Horários de Atendimento
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Segunda - Sexta</span>
                    <span className="text-foreground font-medium">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sábado</span>
                    <span className="text-foreground font-medium">9h - 14h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domingo</span>
                    <span className="text-muted-foreground">Fechado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
