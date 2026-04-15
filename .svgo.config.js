// SVGO config — conservative, preserves stroke="currentColor" and viewBox.
// See https://svgo.dev/docs/preset-default/
export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: false,
          convertColors: { currentColor: false },
          removeUnknownsAndDefaults: { keepDataAttrs: true },
        },
      },
    },
    { name: 'removeDimensions' },
  ],
};
