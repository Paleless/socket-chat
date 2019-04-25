const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const webpack = require('webpack')
module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../dist',
        hot: true
    },
    plugins: [
        /*new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })*/
    ]
})