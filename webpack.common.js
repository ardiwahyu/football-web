const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
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
            entry: path.join(__dirname, 'src/sw.js')
        }),
        new WebpackPwaManifest({
            filename: "manifest.json",
            fingerprints: false,
            name: "Football Match",
            gcm_sender_id: "1098468607644",
            short_name: "Football Match",
            description: "Aplikasi Football Match",
            start_url: "/index.html",
            display: "standalone",
            background_color: "#00897B",
            theme_color: "#00897B",
            icons: [
                {
                    src: "src/icon/icon.png",
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        })
    ]
};