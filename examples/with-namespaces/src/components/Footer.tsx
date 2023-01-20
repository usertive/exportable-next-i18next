import {memo} from 'react';
import styles from '../styles/Home.module.css';
import {Trans} from '@usertive/exportable-next-i18next/client';

function Logo() {
  return (
    <span key={0} className={styles.logo}>
      <img src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
    </span>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Trans i18nKey={'common:footer.poweredBy'} components={[<Logo key={0} />]} />
      </a>
    </footer>
  );
}

export default memo(Footer);
