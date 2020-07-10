const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const package = require("./package.json");

module.exports = {
    entry: {
        index: "./src/index.js",
        detail: "./src/detail.js",
        vendor: Object.keys(package.dependencies),
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
            template: "./src/detail.html",
            filename: "detail.html",
            chunks: ["vendor", "detail"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/nav.html",
            filename: "nav.html"
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/service-worker.js')
        }),
        new ManifestPlugin({
            fileName: 'src/manifest.json'
        })
    ]
};