const path = require('path');
const webpack = require('webpack'); //访问内置的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');

var page_config = require("./pages.config.js");







var getEntry = function () {
    var entry = {};
    //读取开发目录
    glob.sync('./pages/**/*.js').forEach(function (name) {

		//console.log(name);
		
        var n = name.slice(name.lastIndexOf('pages/') + 6, name.length - 3);

        //n = n.slice(0, n.lastIndexOf('/'));
        //console.log(n);
        //对路径字符串进行了一些裁剪成想要的路径
        entry[n] = name.slice(0,name.length - 3);

        //console.log(entry[n]);
    });
    return entry;
};
//getEntry();
//console.log(getEntry());
//console.log(entry);
var pages_obj = getEntry();

let entry = {};
for(let key in pages_obj){
	entry[key] = pages_obj[key] + ".js";
}
for(let key in page_config.common_js){
	entry[key] = page_config.common_js[key] + ".js";
}
//for(let key in page_config.common_css){
//	entry[key] = page_config.common_css[key] + ".css";
//}


//var patterns = [{
//	from: './pages/account/bindingRelation/bindingRelation.html',
//	to: 'pages/bindingRelation/'
//}];
//
//
//
//var options = {
//	ignore: [
//		// Doesn't copy any files with a txt extension    
//		'*.txt',
//
//		// Doesn't copy any file, even if they start with a dot
//		//'**/*',
//
//		// Doesn't copy any file, except if they start with a dot
//		//{ glob: '**/*', dot: false }
//	],
//
//	// By default, we only copy modified files during
//	// a watch or webpack-dev-server build. Setting this
//	// to `true` copies all files.
//	copyUnmodified: true
//};

const config = {
	entry: entry,
	output: {
		// 输出文件，路径相对于本文件所在的位置
		path: path.resolve(__dirname, '../dist/'),
		filename: 'pages/[name].min.js',
		// 非主入口的文件名，即未被列在entry中，却又需要被打包出来的文件命名配置
		chunkFilename: '[id].[chunkhash].js'
	},
	module: {
		loaders: [
			// 使用babel 加载 .js 结尾的文件
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-0'],
					plugins: ['transform-runtime']
				}
			},
			// 使用css-loader和style-loader 加载 .css 结尾的文件
			{
				test: /\.css$/,
				// 将样式抽取出来为独立的文件
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader"),
				exclude: /node_modules/
			},
			// 使用less-loader、css-loader和style-loade 加载 .less 结尾的文件
			{
				test: /\.less$/,
				// 将样式抽取出来为独立的文件
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader"),
				exclude: /node_modules/
			},
			// 加载图片
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader',
				query: {
					// 把较小的图片转换成base64的字符串内嵌在生成的js文件里
					limit: 10000,
					// 路径要与当前配置文件下的publicPath相结合
					name: '../img/[name].[ext]?[hash:7]'
				}
			},
			// 加载图标
			{
				test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
				loader: 'file-loader',
				query: {
					// 把较小的图标转换成base64的字符串内嵌在生成的js文件里    
					limit: 10000,
					name: '../fonts/[name].[ext]?[hash:7]',
					prefix: 'font'
				}
			},
			// 加载html
			{
				test:/\.html/,
				loader:"html-loader?interpolate=require"
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		//new CopyWebpackPlugin(patterns, options)
		new ExtractTextPlugin('pages/[name].min.css')
	]
};

module.exports = config;

// 在文件的最下面加上一个数组遍历，将想生成HtmlWebpackPlugin的js写在数组里生成，一些特定的页面引入多js的也可以自己定制，注意层次结构，就可以随心所欲的修改了
//const htmlArray = ['./pages/account/bindingRelation/bindingRelation'];
const htmlArray = [];
for(const key in pages_obj){
	htmlArray.push(pages_obj[key]);
}

var common_chunk_arr = [];
for(let key in page_config.common_js){
	common_chunk_arr.push(page_config.common_js[key]);
}
for(let key in page_config.common_css){
	common_chunk_arr.push(page_config.common_css[key]);
}
htmlArray.forEach((element) => {
	
	let chunksArray = [];
	//var pathArr = element.split("/");
	//chunksArray.push(pathArr[pathArr.length - 1]);
	chunksArray.push(element.split("/pages/")[1]);
	chunksArray = chunksArray.concat(common_chunk_arr);
	//console.log(chunksArray);
	const newPlugin = new HtmlWebpackPlugin({
		filename: element + '.html',
		template: element + '.html', // 获取最初的html末班
		inject: 'body', // 插入文件的位置
		hash: true, // 在生成的文件后面增加一个hash，防止缓存
		chunks: chunksArray
	});
	
	module.exports.plugins.push(newPlugin);
});