import {Resource} from 'i18next';

export interface ServerSideTranslationsOptions {
  defaultNS: string | null;
}

export interface I18nSerializedProps {
  _nextI18Next?: {
    initialI18nStore: Resource;
    initialLocale: string;
    options: ServerSideTranslationsOptions;
  };
}
