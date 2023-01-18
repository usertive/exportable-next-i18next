import type {GetStaticPathsContext, GetStaticPropsContext} from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {config as i18nConfig} from '../../../exportable-next-i18next.config';
import {serverSideTranslations} from '@usertive/exportable-next-i18next/dist/server';
import {Link, Trans, useTranslation} from '@usertive/exportable-next-i18next/dist/client';

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
      ...(await serverSideTranslations(locale, null, i18nConfig)),
    },
  };
};

function Arrow() {
  return <span>&rarr;</span>;
}

function Logo() {
  return (
    <span key={0} className={styles.logo}>
      <img src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
    </span>
  );
}

export default function Home() {
  const {t, i18n} = useTranslation();
  const nextLocale = i18n.language === 'en' ? 'de' : 'en';
  const nextLocaleLabel = nextLocale === 'en' ? 'English' : 'German';

  return (
    <div className={styles.container}>
      <Head>
        <title>{t('head.title')}</title>
        <meta name='description' content={t('head.description')} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Trans
            i18nKey={'main.title'}
            values={{framework: 'Next.js'}}
            components={[<a key={0} href='https://nextjs.org' />]}
          />
        </h1>

        <Link locale={nextLocale} className={styles.link}>
          <Trans
            i18nKey={'main.langSwitchLink'}
            values={{locale: nextLocaleLabel}}
            components={[<code key={0} className={styles.code} />]}
          />
        </Link>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs' className={styles.card}>
            <h2>
              <Trans i18nKey={'main.tiles.documentation.title'} components={[<Arrow key={0} />]} />
            </h2>
            <p>{t('main.tiles.documentation.description')}</p>
          </a>

          <a href='https://nextjs.org/learn' className={styles.card}>
            <h2>
              <Trans i18nKey={'main.tiles.learn.title'} components={[<Arrow key={0} />]} />
            </h2>
            <p>{t('main.tiles.learn.description')}</p>
          </a>

          <a href='https://github.com/vercel/next.js/tree/canary/examples' className={styles.card}>
            <h2>
              <Trans i18nKey={'main.tiles.examples.title'} components={[<Arrow key={0} />]} />
            </h2>
            <p>{t('main.tiles.examples.description')}</p>
          </a>

          <a
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
          >
            <h2>
              <Trans i18nKey={'main.tiles.deploy.title'} components={[<Arrow key={0} />]} />
            </h2>
            <p>{t('main.tiles.deploy.description')}</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Trans i18nKey={'footer.poweredBy'} components={[<Logo key={0} />]} />
        </a>
      </footer>
    </div>
  );
}
