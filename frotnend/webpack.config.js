// Needed for resolving directory paths
var path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

let mode = "development";

if (process.env.NODE_ENV === 'production') {
    mode = "production";
}

// Plugins
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
let extractPlugin = new MiniCssExtractPlugin({
    filename: '[name].css'
});
let esLint = new ESLintPlugin({
    "fix": true,
})

// Config
module.exports = {
    mode: mode,
    entry: {
        bundle: ["@babel/polyfill", './src/scripts/index.js', './src/styles/main.scss'],
    },
    resolve: {
        modules: [
            path.resolve('node_modules')
        ]
    },
    output: {
        path: path.resolve(__dirname, './../backend/public/assets/'),
        filename: '[name].js'
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                // SASS
                test: /\.(sa|sc|le)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                // CSS
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                // Fonts
                test: /\.(woff|woff2?|eot|ttf|otf|svg)$/,
                exclude: [/image/], // Don't treat font .svg files as images
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts'
                        }
                    }
                ]
            },
            {
                // Images
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'image'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractPlugin,
        esLint
    ]
}
