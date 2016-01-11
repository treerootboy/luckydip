var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
console.log(path.join(__dirname, 'node_modules/react/addons.js'));
var config = {
	entry: [ 
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./app/entry.js'
	],
	output: {
		path: './',
		filename: 'bundle.js'
	},
	resolve: {
		alias: {
			'react-with-addons': path.join(__dirname, 'node_modules/react/addons.js')
		}
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loaders: ['babel'], include: path.join(__dirname, 'app') },
			{ test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
			{ test: /\.(eot|woff|ttf|svg|woff2|jpg|png|gif)$/i, loader: 'url' },
			{ test: /\.(sql)$/i, loader: 'raw' },
			{ test: /\.(json)$/i, loader: 'json' }
		]
	},
    plugins: [
        new HtmlWebpackPlugin({
        	inject: true,
          	template: './app/index.html'
        })
    ]
}

module.exports = config;
