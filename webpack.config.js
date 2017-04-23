const webpack = require('webpack')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js'
})

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('[name].bundle.css')

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.(png|jpg)$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'url-loader',
                options: { limit: 10000 } // Convert images < 10k to base64 strings
            }]
        }, {
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src'),
            loader: extractCSS.extract(['css-loader', 'sass-loader'])
        }, {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015'] }
            }]
        }]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      extractCommons,
      extractCSS,
      new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 3000,
        files: ['*.html'],
        proxy: 'http://localhost:8081/'
      })
    ]
}

module.exports = config
