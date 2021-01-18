import {parseQueryString} from './index';

describe('【Lib】parseQueryString', () => {
  test('queryStringからkey: valueペアを生成できる', () => {
    const queryString = '?query1=aaaaa&query2=bb';
    const expectedData = {
      query1: 'aaaaa',
      query2: 'bb',
    };

    const actual = parseQueryString<'query1' | 'query2'>(queryString);
    expect(actual).toStrictEqual(expectedData);
  });
});
