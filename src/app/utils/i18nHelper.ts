import { DateFnsConfigurationService } from 'ngx-date-fns';
import { enUS as enLocale, nl as nlLocale } from 'date-fns/locale';
import { en_US, nl_NL, NzI18nInterface } from 'ng-zorro-antd/i18n';

export enum LANGUAGE_CODE {
  EN = 'en',
  NL = 'nl',
}

export interface Language {
  code: LANGUAGE_CODE;
  label: string;
  icon: string;
}

export const LANGUAGES: Map<LANGUAGE_CODE, Language> = new Map<
  LANGUAGE_CODE,
  Language
>([
  [
    LANGUAGE_CODE.EN,
    {
      code: LANGUAGE_CODE.EN,
      label: 'English',
      icon: 'assets/flags/en.svg',
    },
  ],
  [
    LANGUAGE_CODE.NL,
    {
      code: LANGUAGE_CODE.NL,
      label: 'Nederlands',
      icon: 'assets/flags/nl.svg',
    },
  ],
]);

const LOCALE_KEY = 'USER_LOCALE';

/**
 * Get the current locale (set in local storage)
 * If none is set fallback to English
 */
export function getLocale(): LANGUAGE_CODE {
  return (
    (localStorage.getItem(LOCALE_KEY) as LANGUAGE_CODE) || LANGUAGE_CODE.EN
  );
}

/**
 * Set the current locale and reload the window so we can load the new translations
 */
export function setLocale(locale: LANGUAGE_CODE): void {
  if (locale !== getLocale()) {
    localStorage.setItem(LOCALE_KEY, locale);
    window.location.reload();
  }
}

/**
 * Get the current Language object
 */
export function getLanguage(): Language {
  const locale = getLocale();

  return (
    LANGUAGES.get(locale) || {
      code: LANGUAGE_CODE.EN,
      label: 'English',
      icon: 'assets/flags/en.svg',
    }
  );
}

/**
 * Function to set the locale for date-fns and ngx-date-fns
 */
export function setDateFnsLocale(): DateFnsConfigurationService {
  const configLocale = new DateFnsConfigurationService();

  switch (getLanguage().code) {
    case LANGUAGE_CODE.NL:
      configLocale.setLocale(nlLocale);
      break;

    default:
      configLocale.setLocale(enLocale);
      break;
  }

  return configLocale;
}

/**
 * Function to set the locale for NG-Zorro
 */
export function ngZorroGlobalLanguage(): NzI18nInterface {
  switch (getLanguage().code) {
    case LANGUAGE_CODE.NL:
      return nl_NL;
    default:
      return en_US;
  }
}
