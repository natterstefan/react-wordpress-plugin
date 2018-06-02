const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pkg = require('../package.json')
const SRC_DIR = path.resolve(__dirname, '..', 'src')
const BUILD_DIR = path.resolve(__dirname, '..', 'dist')

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].css'
})

const bundle = (name) => ({
  [`${name}.bundled.js`]: [
    'babel-polyfill',
    path.resolve(__dirname, '..', 'src', 'react', `${name}.js`)
  ]
})

const styles = (name) => ({
  [`${name}.styles`]: [
    path.resolve(__dirname, '..', 'src', 'react', 'styles', `${name}.scss`)
  ]
})

module.exports = {
  entry: {
    ...bundle('admin'),
    ...bundle('public'),
    ...styles('admin'),
    ...styles('public'),
  },

  output: {
    filename: '[name]',
    path: path.join(__dirname, '..', 'dist-build')
  },

  resolve: {
    extensions: ['.js', '.css', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC_DIR,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'production',
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    extractSass,
    // Note: use CopyWebpackPlugin for wp-file changes, as FileManagerPlugin does
    // not copy them properly in watch-mode
    new CopyWebpackPlugin(
      [
        {
          context: './src/wordpress',
          from: path.resolve(__dirname, '..', 'src', 'wordpress') + '/**/*.php',
          to: BUILD_DIR
        },
        {
          context: './src/wordpress',
          from:
            path.resolve(__dirname, '..', 'src', 'wordpress') +
            '/languages/*.pot',
          to: BUILD_DIR + '/languages'
        },
        {
          context: './src/wordpress',
          from: path.resolve(__dirname, '..', 'src', 'wordpress') + '/*.txt',
          to: BUILD_DIR
        },
        {
          context: './src/static',
          from: path.resolve(__dirname, '..', 'src', 'static') + '/**/*.+(png|jpg)',
          to: BUILD_DIR + '/static'
        }
      ],
      {
        copyUnmodified: true // copy w/ every watch
      }
    ),
    new FileManagerPlugin({
      // onStart: {
      //   delete: [
      //     path.resolve(__dirname, '..', 'dist'),
      //     path.resolve(__dirname, '..', 'dist-build')
      //   ]
      // },
      onEnd: {
        copy: [
          {
            source: path.resolve(
              __dirname,
              '..',
              'dist-build',
              'css',
              'admin.styles.css'
            ),
            destination: path.resolve(__dirname, '..', 'dist', 'admin', 'css')
          },
          {
            source: path.resolve(
              __dirname,
              '..',
              'dist-build',
              'admin.bundled.js'
            ),
            destination: path.resolve(__dirname, '..', 'dist', 'admin', 'js')
          },
          {
            source: path.resolve(
              __dirname,
              '..',
              'dist-build',
              'css',
              'public.styles.css'
            ),
            destination: path.resolve(__dirname, '..', 'dist', 'public', 'css')
          },
          {
            source: path.resolve(
              __dirname,
              '..',
              'dist-build',
              'public.bundled.js'
            ),
            destination: path.resolve(__dirname, '..', 'dist', 'public', 'js')
          }
        ]
        // delete: [path.resolve(__dirname, '..', 'dist-build')] // will cause errors when watching files
      }
    })
  ]
}
