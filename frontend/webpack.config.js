const path = require('path');
const fs = require('fs');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { SourceMapDevToolPlugin } = require("webpack");
const Dotenv = require('dotenv-webpack');

let cleanOptions = {
    verbose: false,
    dry: false
};
const publicPath = '/';
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        path: resolveApp('build'),
        filename: 'static/js/[name].[hash].js',
        chunkFilename: 'static/js/[name].[hash].chunk.js',
        publicPath: publicPath,
    },
    devServer: {
	https: true,
    	//key: fs.readFileSync('./key.pem'),
    	//cert: fs.readFileSync('./cert.pem'),
        contentBase: './src/',
        host: '0.0.0.0',
        compress: true,
        port: 3000,
        historyApiFallback: true,
        //open: true,
        inline: true,
        hot: true
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            theme: resolveApp('src/theme/'),
            helpers: resolveApp('src/helpers/'),
            components: resolveApp('src/components/'),
            services: resolveApp('src/services/'),
            icons: resolveApp('src/icons/'),
            layouts: resolveApp('src/layouts/'),
            assets: resolveApp('src/assets/'),
            views: resolveApp('src/views/'),
            common: resolveApp('src/common/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {minimize: true}
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({
    //             terserOptions: {
    //                 parse: {
    //                     ecma: 8,
    //                 },
    //                 compress: {
    //                     ecma: 5,
    //                     warnings: false,
    //                     comparisons: false
    //                 },
    //                 mangle: true,
    //                 output: {
    //                     ecma: 5,
    //                     comments: false,
    //                     ascii_only: true,
    //                 },
    //                 safari10: true,
    //             },
    //             sourceMap: true
    //         })
    //     ]
    // },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new CleanWebpackPlugin(cleanOptions),
        new Dotenv(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: 'static/css/[name].[hash].css'
        }),
    ],
    target: 'web',
};
