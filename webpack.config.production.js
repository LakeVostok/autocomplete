const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: [
        "babel-polyfill",
        "./src/index.js"
    ],

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false
        })
    ]
};
