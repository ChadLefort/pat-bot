const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, './../lib/web/public');
const mainPath = path.resolve(__dirname, '../src/web/client/index.tsx');
const config = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        'bootstrap-loader',
        mainPath
    ],
    output: {
        filename: 'bundle.js',
        path: buildPath,
        publicPath: '/public/'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        stats: 'errors-only',
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    'react-hot-loader/webpack',
                    'awesome-typescript-loader'
                ]
            },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;
