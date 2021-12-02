const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const meteorExternals = require('webpack-meteor-externals');
const { VueLoaderPlugin } = require('vue-loader')

const clientConfig = {
    entry: './client/main.js',
    output: {
        publicPath: '/',
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ],
        },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json']
    },
    externals: [meteorExternals()],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        hot: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './client/main.html',
            filename: 'main.html',
            inject: true
        }),
        new VueLoaderPlugin(),
    ]
};

const serverConfig = {
    entry: './server/main.js',
    target: 'node',
    externals: [meteorExternals()],
    devServer: {
        hot: true
    },
};

module.exports = [clientConfig, serverConfig];
