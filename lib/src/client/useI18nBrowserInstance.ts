import {I18nSerializedProps} from '../types';
import {useMemo} from 'react';
import {createBrowserClient} from './createBrowserClient';
import deepMerge from 'deepmerge';
import {arrayMergeStrategy} from '../utils/arrayMergeStrategy';
import {Config, I18NextOptions} from '../config';

export function useI18nBrowserInstance(serializedProps: I18nSerializedProps['_nextI18Next'], config: Partial<Config>) {
  return useMemo(() => {
    const i18nextOptions: I18NextOptions = {};

    if(serializedProps !== undefined) {
      i18nextOptions.resources = serializedProps.initialI18nStore;
      i18nextOptions.lng = serializedProps.initialLocale;
    }

    const nextConfig: Partial<Config> = {i18nextOptions};

    return createBrowserClient(deepMerge(config, nextConfig, {arrayMerge: arrayMergeStrategy.OVERRIDE}));
  }, [serializedProps, config]);
}
