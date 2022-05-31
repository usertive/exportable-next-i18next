import {Config} from '@usertive/exportable-next-i18next';

export const config: Config = {
  // Pass those options ⬇️ the same way you would do with a standard Next.js app
  nextJsOptions: {
    locales: ['en', 'de'],
    defaultLocale: 'en'
  },
  // Pass whatever option you want to i18next here
  i18nextOptions: {
    // Those options are mandatory ⬇️
    // See https://github.com/i18next/i18next-fs-backend for details
    backend: {
      addPath: './public/locales/{{lng}}.missing.json',
      loadPath: './public/locales/{{lng}}.json',
    },
  }
};
