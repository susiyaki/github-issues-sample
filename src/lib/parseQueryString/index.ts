export function parseQueryString<T>(queryString: string): T {
  // TODO 不適切な値のとき弾く
  return queryString
    .substring(1)
    .split('&')
    .map((p) => p.split('='))
    .reduce((obj, e) => ({...obj, [e[0]]: e[1]}), {}) as T;
}
