import {ParsedUrlQuery} from 'querystring';

export function resolvePathName(pathName: string, queryParams: ParsedUrlQuery) {
  for (const queryParam in queryParams) {
    const queryParamValue: string = Array.isArray(queryParams[queryParam])
      ? (queryParams[queryParam] as string[]).join('')
      : (queryParams[queryParam] as string);

    pathName = pathName.replaceAll(`[${queryParam}]`, queryParamValue);
  }

  return pathName;
}
