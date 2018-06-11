/*
  FOR DEVELOPMENT test
*/
const path = require('path')
// const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

console.log(process.env.NODE_ENV)
process.traceDeprecation = true

module.exports = {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    // 'webpack-dev-server/client?http://0.0.0.0:8007',
    // 'webpack/hot/only-dev-server',
    'whatwg-fetch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      modules: path.resolve(__dirname, 'src/modules'),
      static: path.resolve(__dirname, 'src/static'),
      store: path.resolve(__dirname, 'src/store'),
      tools: path.resolve(__dirname, 'src/tools'),
      api: path.resolve(__dirname, 'src/api')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
      chunkFilename: 'css/[id].css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      Map: ['immutable', 'Map'],
      List: ['immutable', 'List'],
      fromJS: ['immutable', 'fromJS']
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    })
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 1,
              sourceMap: true,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                require('postcss-global-import')(),
                require('postcss-import')({
                  path: './src/modules/shared/styles/'
                }),
                require('postcss-mixins')(),
                require('postcss-nested')(),
                require('postcss-simple-vars')(),
                require('autoprefixer')()
                // require('cssnano')(),
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]'
      },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'file-loader' }]
      }
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: './src',
    hot: true,
    host: '0.0.0.0',
    compress: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': '*'
    },
    port: 7777
  }
}
