import {i18n as I18NextInstance} from 'i18next';

export function resolveDefaultNamespace(i18nInstance: I18NextInstance) {
  const nativeNamespace: string | readonly string[] | false | undefined = i18nInstance.options.defaultNS;

  if (!nativeNamespace) return undefined;

  if (Array.isArray(nativeNamespace)) {
    return nativeNamespace.length > 1 ? nativeNamespace[0] : undefined;
  }

  return nativeNamespace;
}
