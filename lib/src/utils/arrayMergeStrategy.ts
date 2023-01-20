import {Options as MergeOptions} from 'deepmerge';

export const arrayMergeStrategy = {
  OVERRIDE: function arrayMerge<T>(target: T[], source: T[], _options?: MergeOptions): T[] {
    return source; // Override array
  }
};
