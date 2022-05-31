import {I18nSerializedProps} from '../types';
import {useMemo} from 'react';
import {createBrowserClient} from './createBrowserClient';
import deepMerge from 'ts-deepmerge';
import {Config, I18NextOptions} from '../config';

export function useI18nBrowserInstance(serializedProps: I18nSerializedProps['_nextI18Next'], config: Config) {
  return useMemo(() => {
    const i18nextOptions: I18NextOptions = {};

    if (serializedProps !== undefined) {
      i18nextOptions.resources = serializedProps.initialI18nStore;
      i18nextOptions.lng = serializedProps.initialLocale;
    }

    return createBrowserClient(deepMerge.withOptions({mergeArrays: false}, config, {i18nextOptions}));
  }, [serializedProps, config]);
}
