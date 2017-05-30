var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
    entry: ["./views/assets/js/script.js", './views/assets/sass/styles.sass'],


    output: {
        path: __dirname + "/public/js/",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
           {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
          }

        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
              filename: '../css/styles.bundle.css',
              allChunks: true,
            }),
    ]
}