import {AppProps as NextAppProps} from 'next/app';
import React, {ComponentType} from 'react';
import {i18n as I18NextClient} from 'i18next';
import {I18nSerializedProps, ServerSideTranslationsOptions} from '../types';
import {Config, mergeConfig} from '../config';
import {useI18nBrowserInstance} from './useI18nBrowserInstance';
import {I18nextProvider} from 'react-i18next';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {getDisplayName} from 'next/dist/shared/lib/utils';

export const appWithTranslations = <Props extends NextAppProps = NextAppProps>(
  WrappedComponent: ComponentType<Props>,
  providedConfig: unknown
) => {
  const AppWithTranslations = (props: Props) => {
    const pageProps = props.pageProps as I18nSerializedProps;
    const serializedI18NextProps: I18nSerializedProps['_nextI18Next'] = pageProps._nextI18Next;
    const locale: string | null = serializedI18NextProps?.initialLocale ?? null;

    if (providedConfig == undefined) {
      throw new Error(
        'AD-HOC `appWithTranslations` requires `config` argument to be a valid exportable-next-i18next config.'
      );
    }

    const config: Config = mergeConfig(providedConfig as Config);

    const i18n: I18NextClient | null = useI18nBrowserInstance(serializedI18NextProps, config as Config);

    const options: ServerSideTranslationsOptions | undefined = serializedI18NextProps?.options;

    return (
      <I18nextProvider i18n={i18n} defaultNS={options?.defaultNS}>
        <WrappedComponent key={locale} {...props} />
      </I18nextProvider>
    );
  };

  hoistNonReactStatics(AppWithTranslations, WrappedComponent);
  AppWithTranslations.displayName = `appWithTranslations(${getDisplayName(WrappedComponent)})`;

  return AppWithTranslations;
};
