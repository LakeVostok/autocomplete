'use strict'

const NODE_ENV = 'development';
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: '/dist/'
    },
    watch: true,

    devtool: 'cheap-source-map',

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.HotModuleReplacementPlugin()
    ],


    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", 'sass-loader']
            },
            {
                test   : /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
                loader : 'file-loader'
            },
            {
                test: /\.gif$/,
                loader: "file-loader"
            }
        ]
    }
}

