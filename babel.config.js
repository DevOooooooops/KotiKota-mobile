/** @type {import('@babel/core').TransformOptions['plugins']} */

/** @type {import('@babel/core').TransformOptions} */
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {},
    },
    plugins: [
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./tamagui.config.ts",
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development'
        },
      ],
      // NOTE: this is only necessary if you are using reanimated for animations
      "react-native-reanimated/plugin",
    ],
  };
};