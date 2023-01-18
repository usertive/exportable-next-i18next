import {Config, mergeConfig} from '../config';
import {getServerClient} from './getServerClient';
import {i18n as I18NextInstance, Resource} from 'i18next';
import {I18nSerializedProps, ServerSideTranslationsOptions} from '../types';
import {globalInstance} from '../client/createBrowserClient';
import deepMerge from 'ts-deepmerge';
import {resolveDefaultNamespace} from '../utils/resolveDefaultNamespace';

export const serverSideTranslations = async (
  initialLocale: string,
  requestedNamespaces: string[] | undefined | null,
  providedConfig: unknown,
  options?: ServerSideTranslationsOptions
): Promise<Required<I18nSerializedProps>> => {
  //TODO: function arguments validation

  const config: Config = mergeConfig(providedConfig as Config);

  config.i18nextOptions.lng = initialLocale;

  // Reload resources on page reload
  await globalInstance?.reloadResources();

  const i18nInstance: I18NextInstance = await getServerClient(config);

  const initialI18nStore: Resource = {[initialLocale]: {}};

  if (requestedNamespaces != null) {
    requestedNamespaces.forEach((ns: string) => {
      for (const locale in initialI18nStore) {
        initialI18nStore[locale][ns] = (i18nInstance.services.resourceStore.data[locale] || {})[ns] || {};
      }
    });
  } else {
    for (const locale in initialI18nStore) {
      initialI18nStore[locale] = i18nInstance.services.resourceStore.data[locale] || {} || {};
    }
  }

  const defaultOptions: ServerSideTranslationsOptions = {defaultNS: resolveDefaultNamespace(i18nInstance)};
  const finalOptions = deepMerge(defaultOptions, options ?? {});

  return {
    _nextI18Next: {
      initialI18nStore,
      initialLocale,
      options: finalOptions,
    },
  };
};
