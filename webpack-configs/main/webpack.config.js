//@ts-check
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DevServerMiddlewareConfig = require("../../proxy-server/proxy_server");
//The folder we'll have our assets emitted after build
const DIST_PATH_PUBLIC_ASSETS = "../../dist/public";
const { merge } = require("webpack-merge");
const DefaultOats_iConfig = require("../oats~i/default/webpack.config");
const DefaultOats_iLoadersConfig = require("../oats~i/main/webpack.config");

//@ts-expect-error
module.exports = merge(DefaultOats_iConfig, DefaultOats_iLoadersConfig, {

    mode: "development",
    devtool: "eval-source-map",
    output: {

        //Where we'll output public assets
        path: path.resolve(__dirname, `${DIST_PATH_PUBLIC_ASSETS}`),
        publicPath: "/",
        assetModuleFilename: 'assets/[name][ext]',
        filename: "js/[name].dev_bundle.js",
        clean: true
    },
    entry: {

        //The main entry (app)
        index: "./src/app/index/scripts/index.js",
    },
    plugins: [
        new HtmlWebpackPlugin({

            template: "./src/server/home/home.sv.hbs",
            filename: "../views/home.hbs",
            chunks: ["index"],
            minify: false
        })
    ],
    devServer: {

        devMiddleware: {

            writeToDisk: true, //Because of our configured server
        },
        
        //Testing to remove .html extensions
        setupMiddlewares: DevServerMiddlewareConfig,
    }
});