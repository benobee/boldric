const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PROD = JSON.parse(process.env.PROD_ENV || '0');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const config = {
	context: __dirname,
	entry: PROD ? ['./main.jsx', './main.less'] : ['./main.jsx', './main.less', 'webpack-dev-server/client?http://localhost:8080'],
	devtool: PROD ? '' : 'eval',
	output: {
		publicPath: '/',
		path: __dirname + "/template/assets",
		filename: PROD ? "bundle.min.js" : "bundle.js"
	},
	node: {
	dns: 'mock',
	net: 'mock'
	},
	module: {
  		loaders: [
    		{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    		{ test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] }},
		    {
		        test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
		        loader: 'imports?define=>false&this=>window'
		    },

    		PROD ? {
    			test: /\.less$/, 
    			exclude: /node_modules/, 
    			loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader!autoprefixer-loader") 

    		} : { 
    			
    			test: /\.less$/, 
    			exclude: /node_modules/, 
    			loader: "style!css!autoprefixer!less"
    		},
    		{ test: /\.css$/, exclude: /node_modules/, loader: "style!css!autoprefixer!less" },
    		{ test: /\.json$/, loader: "json-loader"} 		
  		]
	},
	plugins: PROD ? [
	  new webpack.optimize.UglifyJsPlugin({
	    compress: { 
	    	warnings: false 
	    },
	    output: {
    		comments: false
  		},
  		minimize: true,
  		debug: true,
  		sourceMap: true
	  }),
	  new ExtractTextPlugin("./bundle.min.css"),
	  new webpack.DefinePlugin({
	    'process.env': {
	      "NODE_ENV": JSON.stringify('production')
	    }
	  }),
	  new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
	] : [
	  new webpack.ProvidePlugin({
	      'Promise': 'es6-promise', 
	      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
	  })
	],
	debug: true
};

module.exports = config;