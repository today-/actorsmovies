const path = require('path');
const dotenv = require('dotenv').config();
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer({
  minify: true,
});

const publicPath = '/';

module.exports = () => ({
  mode: 'production',
  target: 'web',
  devtool: 'nosources-source-map',
  bail: true,
  entry: ["@babel/polyfill", path.resolve('src/index.tsx')],
  output: {
    path: path.resolve('build'),
    publicPath,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '~': path.resolve('src/')
    },
    mainFields: ['main'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        extractComments: true,
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        styles: {
          test: /\.css$/,
          chunks: 'all',
          reuseExistingChunk: true,
        }
      }
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.resolve('node_modules/effector')],
            options: {
              presets: [
                ['@babel/preset-env', { "forceAllTransforms": true }]
              ],
            }
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              publicPath: `${publicPath}static/media/`,
              outputPath: 'static/media/',
              name: '[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'awesome-typescript-loader',
                options: {
                  getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
                  configFileName: 'tsconfig.json',
                  silent: true,
                  useBabel: true,
                  babelCore: '@babel/core'
                },
              },
            ],
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: `${publicPath}static/css`,
                }
              },
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 11',
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
            loader: 'file-loader',
            exclude: [/\.js$/, /\.html$/, /\.json$/],
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'public' }], { ignore: ['index.html'] }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
      filename: 'frontend.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      env: {
        metrikaId: process.env.METRIKA_ID,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: `static/css/[name].[hash].css`,
      chunkFilename: `static/css/[id].[hash].css`,
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
});
