import type {GetStaticPathsContext, GetStaticPropsContext} from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {config as i18nConfig} from '../../../exportable-next-i18next.config';
import {serverSideTranslations} from '@usertive/exportable-next-i18next/dist/server';
import {Link, Trans, useTranslation} from '@usertive/exportable-next-i18next/dist/client';
import Footer from '../../components/Footer';

export function getStaticPaths(_context: GetStaticPathsContext) {
  return {
    /**
     * Generate a page for each locale defined in the config file.
     * It's important to name the param `lang`, it won't work otherwise!
     */
    paths: i18nConfig.nextJsOptions.locales.map((locale: string) => ({params: {lang: locale}})),
    fallback: false,
  };
}

export const getStaticProps = async (context: GetStaticPropsContext<{lang: string}>) => {
  // Get current locale (language code) from props generated by `getStaticPaths`.
  const locale: string = context.params!.lang;

  return {
    props: {
      /**
       * This is an async function that you need to include on your page-level components, via getStaticProps.
       * This function will take care of injecting translations into your front-end app.
       * The arguments are as follows:
       * 1. locale - current locale to inject translations for;
       * 2. namespaces - array of namespaces required for this page (`null` if you are not using namespaces);
       * 3. i18nConfig - manually imported config file.
       * 4. extra options - i.e. default namespace to use for this page
       */
      ...(await serverSideTranslations(locale, ['common', 'support'], i18nConfig, {defaultNS: 'support'})),
    },
  };
};

export default function Support() {
  const {t, i18n} = useTranslation();
  const nextLocale = i18n.language === 'en' ? 'de' : 'en';
  const nextLocaleLabel = nextLocale === 'en' ? t('langEnglish') : t('langGerman');

  return (
    <div className={styles.container}>
      <Head>
        <title>{t('common:head.title')}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Trans
            i18nKey={'title'}
            values={{framework: 'Next.js'}}
            components={[<a key={0} href='https://nextjs.org' />]}
          />
        </h1>

        <div className={styles.linksBox}>
          <Link locale={nextLocale}>
            <a className={styles.link}>
              <Trans
                i18nKey={'common:langSwitchLink'}
                values={{locale: nextLocaleLabel}}
                components={[<code key={0} className={styles.code} />]}
              />
            </a>
          </Link>

          <Link href={'/'}>
            <a className={styles.link}>
              <Trans i18nKey={'goToHomePage'} components={[<code key={0} className={styles.code} />]} />
            </a>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
