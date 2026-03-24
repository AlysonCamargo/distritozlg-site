import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptTranslations from './locales/pt.json';
import enTranslations from './locales/en.json';

// Recupera o idioma salvo ou define o padrão como português
const savedLanguage = localStorage.getItem('distritozlg-lang') || 'pt';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: ptTranslations },
      en: { translation: enTranslations }
    },
    lng: savedLanguage,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

// Escuta por mudanças para salvar no localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('distritozlg-lang', lng);
});

export default i18n;
