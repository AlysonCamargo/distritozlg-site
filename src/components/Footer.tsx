import { Instagram, Mail, MapPin, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/distritozlg',
      icon: Instagram,
    },
    {
      name: 'Email',
      href: 'mailto:contato@distritozlg.com.br',
      icon: Mail,
    },
    {
      name: 'Localização',
      href: 'https://maps.app.goo.gl/87cntHo8MpEvmwTZ6',
      icon: MapPin,
    }
  ];

  const quickLinks = [
    { name: t('nav.catalog'), href: '/#catalog' },
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.contact'), href: '/#contact' },
    { name: t('footer.privacy'), href: '/politica-de-privacidade' },
    { name: t('footer.terms'), href: '/termos-de-uso' },
  ];

  return (
    <footer className="bg-background border-t border-border pt-16">
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-foreground flex items-center justify-center">
                <span className="text-sm font-bold text-background font-heading tracking-tighter">ZLG</span>
              </div>
              <span className="font-heading font-medium tracking-[0.15em] text-lg uppercase text-foreground">
                Distrito
              </span>
            </div>

            <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
              {t('footer.desc')}
            </p>

            <p className="text-foreground font-semibold mb-8 text-xs uppercase tracking-widest">
              {t('footer.tagline')}
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-transparent border border-border text-muted-foreground hover:text-foreground hover:border-foreground rounded-sm flex items-center justify-center transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg text-foreground mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg text-foreground mb-4">
              {t('footer.contactTitle')}
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                <strong className="text-foreground">{t('footer.whatsapp')}:</strong><br />
                (11) 97298-8072
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">{t('footer.email')}:</strong><br />
                contato@distritozlg.com.br
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">{t('footer.location')}:</strong><br />
                <span dangerouslySetInnerHTML={{ __html: t('footer.locationDesc') }} />
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="text-center mb-8">
            <h4 className="font-heading font-bold text-xl text-foreground mb-2">
              {t('footer.newsletterTitle')}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                className="flex-1 px-4 py-3 bg-transparent border border-border focus:border-foreground focus:outline-none text-foreground text-xs tracking-widest uppercase placeholder:text-muted-foreground"
              />
              <button className="px-8 py-3 bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors uppercase tracking-widest text-xs">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="uppercase tracking-widest text-[10px] font-semibold">{t('footer.rights')}</span>
            <Heart className="w-3.5 h-3.5 text-muted-foreground" />
          </div>

          <div className="flex space-x-6">
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;