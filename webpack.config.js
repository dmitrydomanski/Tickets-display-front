
const ExtractPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: `${__dirname}/src/main.jsx`,
    output: {
        filename: 'bundle-[hash].js',
        path: `${__dirname}/build`,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development',
    performance: {
        hints: false,
    },
    plugins: [
        new HTMLPlugin(),
        new ExtractPlugin('bundle-[hash].css'),
    ],
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_module/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                loader: ExtractPlugin.extract(['css-loader', 'sass-loader']),
            },
        ],
    },
};
