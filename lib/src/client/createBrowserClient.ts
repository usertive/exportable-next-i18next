import {Config} from '../config';
import i18n, {i18n as I18NextClient} from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

export let globalInstance: I18NextClient;

export function createBrowserClient(config: Config): I18NextClient {
  globalInstance = i18n.createInstance(config.i18nextOptions);
  globalInstance.use(I18nextBrowserLanguageDetector);
  void globalInstance.init(config.i18nextOptions);

  return globalInstance;
}
