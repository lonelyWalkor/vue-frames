const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    index: "./index.js"
  },
  output: {
    // 输出文件，路径相对于本文件所在的位置
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].js',
    // 非主入口的文件名，即未被列在entry中，却又需要被打包出来的文件命名配置
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    loaders: [
      // 使用babel 加载 .js 结尾的文件
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;