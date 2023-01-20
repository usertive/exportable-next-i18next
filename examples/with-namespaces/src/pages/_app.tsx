import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {appWithTranslations, useTranslation} from '@usertive/exportable-next-i18next/client';
import {config as i18nConfig} from '../../exportable-next-i18next.config';
import Head from 'next/head';

function MyApp({Component, pageProps}: AppProps) {
  const {t} = useTranslation('common');

  return (
    <>
      <Head>
        <meta name='description' content={t('head.description')} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslations(MyApp, i18nConfig);
