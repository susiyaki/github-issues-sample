import dayjs from 'dayjs';
import {pastTimeFormat} from './index';

describe('【Lib】pastTimeFormat', () => {
  describe('1年以上前', () => {
    test('2年前以降のとき"last year"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(1, 'year').toDate());
      const expected = 'last year';

      expect(actual).toStrictEqual(expected);
    });
    test('5年以上前のとき"5 years ago"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(5, 'year').toDate());
      const expected = '5 years ago';

      expect(actual).toStrictEqual(expected);
    });
  });
  describe('1ヶ月以上前', () => {
    test('2ヶ月前以降のとき"last month"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(1, 'month').toDate());
      const expected = 'last month';

      expect(actual).toStrictEqual(expected);
    });
    test('3ヶ月前のとき"3 months ago"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(3, 'month').toDate());
      const expected = '3 months ago';

      expect(actual).toStrictEqual(expected);
    });
  });
  describe('1日以上前', () => {
    test('2日前以降のとき"yesterday"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(1, 'day').toDate());
      const expected = 'yesterday';

      expect(actual).toStrictEqual(expected);
    });
    test('19日前のとき"19 days ago"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(19, 'day').toDate());
      const expected = '19 days ago';

      expect(actual).toStrictEqual(expected);
    });
  });
  describe('1時間以上前', () => {
    test('2時間前以降のとき"1 hour ago"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(1, 'hour').toDate());
      const expected = '1 hour ago';

      expect(actual).toStrictEqual(expected);
    });
    test('3時間以上前のとき"3 hours ago"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(3, 'hour').toDate());
      const expected = '3 hours ago';

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('1分以上前', () => {
    test('2分前以降のとき"1 minute ago"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(1, 'minute').toDate());
      const expected = '1 minute ago';

      expect(actual).toStrictEqual(expected);
    });
    test('5分前のとき"5 minutes ago"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(5, 'minute').toDate());
      const expected = '5 minutes ago';

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('秒単位', () => {
    test('10秒前以内の場合"now"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(6, 'second').toDate());
      const expected = 'now';

      expect(actual).toStrictEqual(expected);
    });
    test('11秒前のとき"11 seconds ago"が返る', () => {
      const actual = pastTimeFormat(dayjs().subtract(11, 'second').toDate());
      const expected = '11 seconds ago';

      expect(actual).toStrictEqual(expected);
    });
  });
});
