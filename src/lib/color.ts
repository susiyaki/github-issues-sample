export const colorService = {
  hex2rgb: (hex: string): number[] => {
    if (hex.slice(0, 1) == '#') hex = hex.slice(1);
    if (hex.length == 3)
      hex =
        hex.slice(0, 1) +
        hex.slice(0, 1) +
        hex.slice(1, 2) +
        hex.slice(1, 2) +
        hex.slice(2, 3) +
        hex.slice(2, 3);

    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (
      str,
    ) {
      return parseInt(str, 16);
    });
  },

  getLuminance: (rgb: number[]): number => {
    const r = 0.298912;
    const g = 0.586611;
    const b = 0.114478;
    return Math.floor(r * rgb[0] + g * rgb[1] + b * rgb[2]);
  },
};
