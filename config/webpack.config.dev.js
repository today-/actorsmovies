const path = require('path');
const dotenv = require('dotenv').config();
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer({
  displayName: true,
});

const publicPath = '/';

module.exports = () => ({
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  stats: true,
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    clientLogLevel: 'info',
    disableHostCheck: true,
    open: true,
    hot: true,
    contentBase: './build',
    compress: true,
    port: process.env.APP_PORT,
    stats: 'errors-only',
    openPage: '',
    proxy: {
      '/api': {
        target: process.env.APP_HOST,
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          console.log(req.url);
        }
      },
    }
  },
  entry: ['@babel/polyfill', path.resolve('src/index.tsx')],
  output: {
    publicPath,
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '~': path.resolve('src/'),
      'react-dom': '@hot-loader/react-dom'
    },
    mainFields: ['main'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
            }
          }
        ]
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              publicPath: `${publicPath}static/media/`,
              outputPath: 'static/media/',
              name: '[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              useTranspileModule: true,
              forceIsolatedModules: true,
              getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
              configFileName: 'tsconfig.json',
              silent: false,
              useBabel: true,
              babelCore: '@babel/core'
            }
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              'sass-loader',
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              publicPath: `${publicPath}static/media/`,
              outputPath: 'static/media/',
              name: '[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'public' }]),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
      env: {
        // metrikaId: process.env.METRIKA_ID,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HotModuleReplacementPlugin(),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
});
