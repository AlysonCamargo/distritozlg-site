import { useState } from 'react';
import { Menu, X, Search, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { Input } from '@/components/ui/input';

const Navigation = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { items: wishlistItems, setIsWishlistOpen } = useWishlist();

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.catalog'), href: '#catalog' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const term = (e.target as HTMLInputElement).value;
      window.location.href = `/?q=${encodeURIComponent(term)}#catalog`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-8 h-8 bg-foreground flex items-center justify-center">
              <span className="text-sm font-bold text-background font-heading tracking-tighter">ZLG</span>
            </div>
            <span className="font-heading font-medium tracking-[0.15em] text-lg uppercase text-foreground hidden sm:block">
              Distrito
            </span>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8 relative">
            <Input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              className="w-full bg-secondary/30 border-transparent focus:border-foreground pl-10 rounded-sm text-sm"
              onKeyDown={handleSearch}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-muted-foreground transition-colors duration-200 text-xs font-semibold tracking-widest uppercase"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-5 border-l border-border pl-8">
              <div className="flex items-center">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <button className="relative group" onClick={() => setIsWishlistOpen(true)}>
                <Heart className="w-5 h-5 text-foreground transition-colors" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-sm">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button className="relative group" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="w-5 h-5 text-foreground transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-5 md:hidden">
            <div className="flex items-center">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            <button className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="w-5 h-5 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-foreground text-background text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-sm">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fadeIn bg-background">
            <div className="mb-4 relative px-4">
              <Input
                type="text"
                placeholder={t('nav.searchMobile')}
                className="w-full bg-secondary/30 border-transparent focus:border-foreground pl-10 rounded-sm text-sm"
                onKeyDown={handleSearch}
              />
              <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-accent transition-colors duration-200 font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;