const path = require('path');
const autoprefixer = require('autoprefixer');

const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    entry: {
        'main': './main.ts'
    },

    output: {
        filename: '[name].bundle.js',
        path: DESTINATION
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    module: {
        rules: [
            /****************
             * PRE-LOADERS
             *****************/
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                    {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, syntax: 'postcss-scss', plugins: [autoprefixer()]}
                    },
                ]
            },
            {
                test: /\.(svg)$/,
                use: [
                    {loader: 'url-loader', options: {limit: 8192}},
                    {loader: 'svg-colorize-loader', options: {}}
                ]
            },

            /****************
             * LOADERS
             *****************/
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: 'awesome-typescript-loader'
            }
        ]
    },

    devtool: 'cheap-module-source-map',
    devServer: {}
};