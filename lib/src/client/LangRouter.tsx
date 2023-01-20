import {NextRouter, useRouter} from 'next/router.js';
import {memo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

function LangRouter() {
  const router: NextRouter = useRouter();
  const {i18n} = useTranslation();
  useEffect(()=>{
    if (i18n.language && router.isReady) {
      void router.push({pathname: `/[lang]${router.pathname}`, query: {...router.query, lang: i18n.language}});
    }
  },[i18n.language, router])

  return null;
}

export default memo(LangRouter);
