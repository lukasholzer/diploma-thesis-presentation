const webpack = require('webpack')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      rules: [
        // {
        //     test: /\.(png|jpg)$/,
        //     include: path.resolve(__dirname, 'src'),
        //     use: [{
        //         loader: 'url-loader',
        //         options: { limit: 10000 } // Convert images < 10k to base64 strings
        //     }]
        // },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              query: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
        },
        {
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src'),
            loader: extractCSS.extract(['css-loader', 'sass-loader'])
        },
        {
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
      new CopyWebpackPlugin([
        { from: 'images/', to: 'images' },
      ]),
      extractCommons,
      extractCSS,
      new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 3000,
        files: ['*.html'],
        proxy: 'http://localhost:8080/'
      })
    ]
}

module.exports = config
