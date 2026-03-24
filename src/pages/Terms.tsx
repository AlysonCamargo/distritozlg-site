import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-heading uppercase tracking-widest mb-8 text-center">{t('terms.title')}</h1>
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground space-y-6">
          <p>{t('terms.intro')}</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4 uppercase tracking-wider">{t('terms.h1')}</h2>
          <p>{t('terms.p1')}</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4 uppercase tracking-wider">{t('terms.h2')}</h2>
          <p>{t('terms.p2')}</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4 uppercase tracking-wider">{t('terms.h3')}</h2>
          <p>{t('terms.p3')}</p>
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4 uppercase tracking-wider">{t('terms.h4')}</h2>
          <p>{t('terms.p4')}</p>
          <p className="mt-8 pt-8 border-t border-border text-sm">
            {t('terms.updated')}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
