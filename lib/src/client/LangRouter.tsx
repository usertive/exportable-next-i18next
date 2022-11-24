import {NextRouter, useRouter} from 'next/router';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

function LangRouter() {
  const router: NextRouter = useRouter();
  const {i18n} = useTranslation();

  if (i18n.language) {
    void router.push({pathname: `/[lang]${router.pathname}`, query: {...router.query, lang: i18n.language}});
  }

  return null;
}

export default memo(LangRouter);
