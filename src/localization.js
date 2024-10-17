import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from './generated/locale-codes';

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: locale => import(`./generated/locales/${locale}.js`),
});

export const setLocaleFromLang = async () => {
  await setLocale(document.documentElement.lang);
};
