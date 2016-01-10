var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var config = {
	entry: './app/entry.js',
	output: {
		path: './build',
		filename: '[hash].js'
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
			{ test: /\.(jpg|gif|png|eot|woff|ttf|svg|woff2)$/, loader: 'url!limit=100000' }
		]
	},
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './app/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		})
    ]
}

module.exports = config;