import {ComponentProps, memo, PropsWithChildren, useMemo} from 'react';
import {NextRouter, useRouter} from 'next/router.js';
import {default as NextLink} from 'next/link.js';
import {useTranslation} from 'react-i18next';

type NextLinkProps = ComponentProps<typeof NextLink>;

export type LinkProps = PropsWithChildren<Omit<NextLinkProps, 'href'> & Partial<Pick<NextLinkProps, 'href'>>>;

function Link(props: PropsWithChildren<LinkProps>) {
  const {children, locale, ...LinkProps} = props;

  const router: NextRouter = useRouter();
  const {i18n} = useTranslation();
  const detectedLocale: string | undefined = i18n.language;

  const href: string = useMemo(() => {
    let href = props.href || router.pathname;

    if (locale) {
      if (props.href) href = `/${locale}${href.toString()}`;
      else href = router.pathname.replace('[lang]', locale);
    } else {
      href = `/${detectedLocale}${href.toString()}`;
    }

    href = href.replace('//', '/');

    return href;
  }, [detectedLocale, locale, props.href, router.pathname]);

  return (
    <NextLink passHref {...LinkProps} href={href}>
      {children}
    </NextLink>
  );
}

export default memo(Link);
