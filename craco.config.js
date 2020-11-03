const CracoAlias = require('craco-alias');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [];

if (!isDevelopment) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  webpack: { plugins },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        aliases: {
          '@': './src'
        }
      }
    }
  ]
};
