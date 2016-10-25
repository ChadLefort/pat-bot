const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, './../lib/web/public');
const mainPath = path.resolve(__dirname, '../src/web/client/index.tsx');
const config = {
    entry: [
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
    devtool: 'cheap-module-source-map',
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
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
}

module.exports = config;
