const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src/'],
      alias: {
        '@types': './types',
        '@config': './config',
        '@hooks': './hooks',
        '@pages': './pages',
      },
    },
  ],
];
