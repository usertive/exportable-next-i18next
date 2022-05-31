import {InitOptions} from 'i18next';
import deepMerge from 'ts-deepmerge';

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
  const config = deepMerge.withOptions({mergeArrays: false}, defaultConfig, userConfig) as Config;

  config.i18nextOptions.supportedLngs = config.nextJsOptions.locales;
  config.i18nextOptions.fallbackLng = config.nextJsOptions.defaultLocale;

  return config;
}

/**
 * @throws Error
 */

/*export async function loadConfig() {
  const moduleName = 'exportable-next-i18next';

  const explorer = cosmiconfig(moduleName, {
    searchPlaces: [
      `${moduleName}.config.js`,
      `${moduleName}.config.cjs`,
      `${moduleName}.config.mjs`,
      `${moduleName}.config.ts`,
      `${moduleName}.config.cts`,
      `${moduleName}.config.mts`,
    ],
    loaders: {
      '.ts': TypeScriptLoader(),
      '.cts': TypeScriptLoader(),
      '.mts': TypeScriptLoader(),
    },
  });

  let result: CosmiconfigResult | null;
  try {
    result = await explorer.search();
  } catch (e: unknown) {
    throw new Error('Cosmiconfig has refused to read the config file. ' + String(e));
  }

  if (result == null) throw new Error('Cosmiconfig did not found any config specified by `searchPlaces` option.');

  //TODO: config validation

  return deepMerge(defaultConfig, result.config) as Config;
}*/
