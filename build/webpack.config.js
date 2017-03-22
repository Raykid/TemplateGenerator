var webpack = require('webpack');
var path = require('path');

module.exports = {
	target: 'node',
    entry: path.resolve(__dirname, '../src/Main.ts'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'TemplateGenerator.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: ['node_modules']
        }]
    },
    plugins: [
        //压缩打包的文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
}