const { resolve } = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry:  [
        "babel-polyfill",
        "./src/index"
    ],

    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    devtool: "cheap-module-source-map",

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader" ]
                })
            },
            {
                test: /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
                loader: "file-loader"
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("style.css")
    ]
};