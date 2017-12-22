const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  // 其他解决方案
  // resolve: {
  //   // require时省略的扩展名，遇到.vue结尾的也要去加载
  //   extensions: ['','.js'],
  //   // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
  //   alias:{}
  // },
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
      },
      {
        test:/\.html/,
        loader:"html-loader?interpolate=require"
      }
    ]
  },
  plugins: [
    // 位于开发环境下
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './page/index.html', // 获取最初的html末班
      inject: 'body', // 插入文件的位置
      hash: true, // 在生成的文件后面增加一个hash，防止缓存
      chunks: ["index"]
    }),
    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),

    // 模块热替换插件
    new webpack.HotModuleReplacementPlugin(),

    // 允许错误不打断程序
    new webpack.NoErrorsPlugin(),
  ]
};
config.output.publicPath = '/';


// 启用source-map，开发环境下推荐使用cheap-module-eval-source-map
config.devtool='cheap-module-eval-source-map';

// 为了实现热加载，需要动态向入口配置中注入 webpack-hot-middleware/client ，路径相对于本文件所在的位置
// var devClient = 'webpack-hot-middleware/client';
// 为了修改html文件也能实现热加载，需要修改上面的devClient变量，引入同级目录下的dev-client.js文件
var devClient = './build/dev-client';
// Object.keys()返回对象的可枚举属性和方法的名称
Object.keys(config.entry).forEach(function (name, i) {
  var extras = [devClient];
  config.entry[name] = extras.concat(config.entry[name]);
})

module.exports = config;