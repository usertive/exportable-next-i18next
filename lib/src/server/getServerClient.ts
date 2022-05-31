import {Config} from '../config';
import i18n, {i18n as I18NextClient} from 'i18next';
import i18nextFSBackend from 'i18next-fs-backend';

let globalInstance: I18NextClient | undefined;

async function createServerClient(config: Config): Promise<I18NextClient> {
  const instance: I18NextClient = i18n
    .createInstance({
      ...config.i18nextOptions,
      preload: config.nextJsOptions.locales,
    })
    .use(i18nextFSBackend);

  await instance.init(config.i18nextOptions);

  return instance;
}

export async function getServerClient(config: Config): Promise<I18NextClient> {
  if (globalInstance === undefined) globalInstance = await createServerClient(config);
  else {
    globalInstance = globalInstance.cloneInstance({...config.i18nextOptions, initImmediate: false});
    await globalInstance.reloadResources();
  }

  if (!globalInstance.isInitialized) await globalInstance.init();

  return globalInstance;
}
