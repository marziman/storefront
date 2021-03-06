// next.config.js
const withImages = require('next-images');
const path = require('path');
module.exports = withImages({
  esmodule: true,
  exclude: path.resolve(__dirname, 'assets/icons'),
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        '@svgr/webpack'
      ]
    });
    return config
  }
});