const { resolve } = require("path");
const PORT = process.env.PORT ? process.env.PORT : 8080;

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
                loaders: ["react-hot-loader/webpack", "babel-loader"]
            }
        ]
    },

    devServer: {
        publicPath: "/dist/",
        host: "127.0.0.1",
        port: PORT,
        noInfo: true
    }
};
