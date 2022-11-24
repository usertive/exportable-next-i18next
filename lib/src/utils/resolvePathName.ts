import {ParsedUrlQuery} from 'querystring';

export function resolvePathName(pathName: string, queryParams: ParsedUrlQuery) {
  let amountOfParameters = 0;
  for (const queryParam in queryParams) {
    const queryParamValue: string = Array.isArray(queryParams[queryParam])
      ? (queryParams[queryParam] as string[]).join('')
      : (queryParams[queryParam] as string);
    const newPathName = pathName.replaceAll(`[${queryParam}]`, queryParamValue);
    if(newPathName !== pathName) {
        pathName = newPathName;
    } else {
        const char = amountOfParameters > 0 ? "&" : "?";
        pathName = `${pathName}${char}${queryParam}=${queryParamValue}`
        amountOfParameters++;
    }

    pathName = pathName.replaceAll(`[${queryParam}]`, queryParamValue);
  }

  return pathName;
}
