import {InitOptions} from 'i18next';
import deepMerge from 'deepmerge';
import {arrayMergeStrategy} from './utils/arrayMergeStrategy';

export interface NextJsI18NOptions {
  locales: string[];
  defaultLocale: string;
}

export type I18NextOptions = InitOptions;

export interface Config {
  nextJsOptions: NextJsI18NOptions;
  i18nextOptions: I18NextOptions;
}

export const defaultConfig: Config = {
  nextJsOptions: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  i18nextOptions: {
    interpolation: {
      escapeValue: false, // React already do this for us
    },
    load: 'currentOnly',
    react: {
      useSuspense: false,
    },
    backend: {
      addPath: `./public/locales/{{lng}}/{{ns}}.missing.json`,
      loadPath: `./public/locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ['path', 'cookie', 'navigator'],
      lookupFromPathIndex: 0,
      lookupCookie: 'i18nextLanguage',
      caches: [],
    },
  },
};

export function mergeConfig(userConfig: Partial<Config>): Config {
  //TODO: config validation

  const config = deepMerge(defaultConfig, userConfig, {arrayMerge: arrayMergeStrategy.OVERRIDE}) as Config;

  config.i18nextOptions.supportedLngs = config.nextJsOptions.locales;
  config.i18nextOptions.fallbackLng = config.nextJsOptions.defaultLocale;

  return config;
}
