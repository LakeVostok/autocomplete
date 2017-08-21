const { resolve } = require("path");

module.exports = {
    entry:  [
        "babel-polyfill",
        "react-hot-loader/patch",
        "./src/index"
    ],

    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test   : /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
                loader : "file-loader"
            },
            {
                test: /\.gif$/,
                loader: "file-loader"
            }
        ]
    },

    devServer: {
        noInfo: true,
        historyApiFallback: true,
        contentBase: resolve(__dirname, "dist"),
        host: "0.0.0.0",
        port: "8080",
        proxy: [{
            context: ["/searchcity"],
            target: "http://localhost:8081"
        }],
        disableHostCheck: true
    }
};