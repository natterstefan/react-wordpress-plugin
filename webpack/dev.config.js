const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// DEV Plugins
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const baseConfig = require('./common.config.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',

  plugins: [
    new ErrorOverlayPlugin(),
    new webpack.NamedModulesPlugin(),
    new FileManagerPlugin({
      onEnd: {
        copy: [
          {
            source: path.resolve(
              __dirname,
              '..',
              'dist-build',
              'css',
              'admin.styles.css.map'
            ),
            destination: path.resolve(__dirname, '..', 'dist', 'admin', 'css')
          },
          {
            source: path.resolve(
              __dirname,
              '..',
              'dist-build',
              'admin.bundled.js.map'
            ),
            destination: path.resolve(__dirname, '..', 'dist', 'admin', 'js')
          },
        ]
      }
    }),
  ]
})
