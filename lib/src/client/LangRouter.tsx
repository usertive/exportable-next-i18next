import {NextRouter, useRouter} from 'next/router';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {join} from 'path';
import {resolvePathName} from '../utils';

function LangRouter() {
  const router: NextRouter = useRouter();
  const {i18n} = useTranslation();

  if (i18n.language) {
    const interpolatedRoute: string = resolvePathName(router.pathname, router.query);
    const resolvedPath: string = join('/' + i18n.language, interpolatedRoute).replace(/\/$/, '');

    void router.push(resolvedPath);
  }

  return null;
}

export default memo(LangRouter);
