import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {appWithTranslations} from '@usertive/exportable-next-i18next/client';
import {config as i18nConfig} from '../../exportable-next-i18next.config';

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslations(MyApp, i18nConfig);
