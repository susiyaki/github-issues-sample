const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./'],
      alias: {
        '@types': './src/types',
        '@config': './src/config',
        '@hooks': './src/hooks',
        '@pages': './src/pages',
      },
    },
  ],
];
