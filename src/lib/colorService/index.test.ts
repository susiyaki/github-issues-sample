import {colorService} from './index';

describe('【Lib】colorService', () => {
  describe('hex2rgb', () => {
    test('#000000のときrgb(0,0,0)を返す', () => {
      const actual = colorService.hex2rgb('#000000');
      const expectedData = [0, 0, 0];

      expect(actual).toStrictEqual(expectedData);
    });
    test('#ffffffのときrgb(255,255,255)を返す', () => {
      const actual = colorService.hex2rgb('#ffffff');
      const expectedData = [255, 255, 255];

      expect(actual).toStrictEqual(expectedData);
    });
    test('#1cd127のときrgb(28, 209, 39)を返す', () => {
      const actual = colorService.hex2rgb('#1cd127');
      const expectedData = [28, 209, 39];

      expect(actual).toStrictEqual(expectedData);
    });
  });
  describe('getLuminance', () => {
    test('白 rgb(255,255,255) を渡すと255が返る', () => {
      const actual = colorService.getLuminance([255, 255, 255]);

      expect(actual).toBeGreaterThan(255);
    });
    test('黒 rgb(0,0,0) を渡すと0が返る', () => {
      const actual = colorService.getLuminance([0, 0, 0]);

      expect(actual).toStrictEqual(0);
    });
  });
});
