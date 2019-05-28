const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
// https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

babelOptions = {
    presets: ['babel-preset-env'],
    "plugins": [
        ["transform-runtime", {
            "polyfill": false,
            "regenerator": true
        }]
    ]
}

module.exports = {
    devtool: 'inline-source-map',
    stats: {
        errorDetails: true,
    },
    entry: {
        index: './src/js/index.ts',
        globals: './src/js/globals.ts',
        styles: './src/styles/index.sass',
    },
    output: {
        path: path.resolve('public/js'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(frag|vert|svg)$/,
                use: ['raw-loader']
            },
            {
                test: /\.(s*)(c|a)ss$/,
                use: ['style-loader', 'css-loader?url=false', 'sass-loader']
            },
            {
                test: /\.tsx?$/,
                // use: 'ts-loader',
                use: [{
                    loader: 'babel-loader',
                    options: babelOptions
                }, {
                    loader: 'ts-loader'
                }],
                exclude: [
                    // instead of /\/node_modules\//
                    path.join(process.cwd(), 'node_modules')
                ]
            },
            {
                test: /\.pug$/,
                use: [
                  //"file-loader?name=[path][name].html", for getting individual html files
                  //"extract-loader",
                  "raw-loader",
                  "pug-html-loader"
                ]
            }
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new CompressionPlugin({}),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js($|\?)/i
            })
        ]
    },
}
