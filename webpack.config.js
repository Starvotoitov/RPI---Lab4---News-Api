const path = require('path')

module.exports = {
	entry: {
		model: './src/model.js',
		view: '.src/view.js',
		controller: './controller.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		}]
	}
	devServer: {
		overlay: true
	}
}