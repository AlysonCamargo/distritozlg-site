import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <button
      onClick={() => i18n.changeLanguage(i18n.language === "en" ? "pt" : "en")}
      className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors tracking-widest pl-3 flex items-center border-l border-border h-5 ml-2"
    >
      {i18n.language === 'en' ? 'EN' : 'PT'}
    </button>
  );
}
