export function parseQueryString<T>(queryString: string): T {
  return queryString
    .substring(1)
    .split('&')
    .map((p) => p.split('='))
    .reduce((obj, e) => ({...obj, [e[0]]: e[1]}), {}) as T;
}
