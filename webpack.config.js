const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const buildPath = path.resolve(__dirname, './build');
const srcPath = path.resolve(__dirname, './src');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd
                ? '[path][name]__[local]'
                : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  entry: path.join(srcPath, 'index.tsx'),
  target: isProd ? 'browserslist' : 'web',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: buildPath,
    filename: isProd ? 'bundle-[hash].js' : 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
    }),
    !isProd && new ReactRefreshPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
    new TsCheckerPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.join(srcPath, 'components'),
      App: path.join(srcPath, 'App'),
      pages: path.join(srcPath, 'App/pages'),
      styles: path.join(srcPath, 'styles'),
      stores: path.join(srcPath, 'stores'),
      shared: path.join(srcPath, 'shared'),
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 9002,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    hot: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
