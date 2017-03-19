'use strict'

const NODE_ENV = process.env.NODE_ENV;
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },

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
                loader: ExtractTextPlugin.extract('css!sass')
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
    },
    
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false,
                drop_console: true,
                unsafe:true
            }
        }),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ],
}