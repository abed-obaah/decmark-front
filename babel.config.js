module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["@babel/plugin-transform-flow-strip-types"],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["module-resolver", {
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@globals': './src/globals',
          '@hooks': './src/hooks',
          '@navigators': './src/navigators',
          '@redux': './src/redux',
          '@screens': './src/screens',
        },
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }],
    ]
  };
};
