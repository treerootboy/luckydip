var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var config = {
	entry: {
		app: './app/entry.js',
		config: ['./app/config.json']
	},
	output: {
		path: './build',
		filename: '[name].js'
	},
	externals: {
		config: './app/config.js'
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
			{ test: /\.(mp3|wav)$/i, loader: 'file' },
			{ test: /\.json$/i, loader: 'json' },
			{ test: /\.(sql)$/i, loader: 'raw' }
		]
	},
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './app/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
        	exclude: /config\.js/i,
		    compress: {
		        warnings: false
		    }
		}),
	    new webpack.DefinePlugin({
	      'process.env': {
	        'NODE_ENV': '"production"'
	      }
	    })
    ]
}

module.exports = config;