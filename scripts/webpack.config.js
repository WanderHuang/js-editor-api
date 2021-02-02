const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const path = require("path");
const logger = require("./logger");

const cwd = process.cwd();

const env = process.env.NODE_ENV;

module.exports = {
  entry: path.resolve(cwd, "src", "index.ts"),
  mode: env,
  devtool: env === 'development' ? 'source-map' : false,
  output: {
    path: path.resolve(cwd, "dist"),
    filename: "index.[contenthash:8].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "在线编辑器",
      template: path.resolve(cwd, 'template', 'index.html')
    }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      handler(percentage, message, ...args) {
        logger.onCompile(percentage, message, ...args);
      },
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
  ],
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.(le|c)ss$/,
        // include: [path.resolve(cwd, "src")],
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
              // hmr: env === 'development'
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: ["postcss-preset-env"],
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
                importLoaders: 1,
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".less"],
    modules: ['node_modules', path.resolve(cwd, 'src')],
    alias: {
      '@': path.resolve(cwd, 'src')
    }
  },
  target: 'web',
  stats: false,
  // watch: true,
  performance: false,
  devServer: {
    contentBase: path.join(cwd, 'dist'),
    compress: true,
    watchContentBase: true,
    hot: true,
    inline: true,
    open: true,
    // watchOptions: {
    //   poll: true,
    //   aggregateTimeout: 600
    // },
    historyApiFallback: true,
  }
};
