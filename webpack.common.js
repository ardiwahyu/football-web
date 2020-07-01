const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const package = require("./package.json");

module.exports = {
    entry: {
        index: "./src/index.js",
        vendor: Object.keys(package.dependencies)
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["vendor", "index"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/nav.html",
            filename: "nav.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/home.html",
            filename: "home.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/favorite.html",
            filename: "favorite.html"
        })
    ]
};