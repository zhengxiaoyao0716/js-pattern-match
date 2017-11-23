const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = [
    { // publish for browser.
        entry: './index.js',
        output: {
            filename: './dist/match.js',
            libraryTarget: 'umd'
        },
    },
    { // publish for browser (minify).
        entry: './index.js',
        output: {
            filename: './dist/match.min.js',
            libraryTarget: 'umd'
        },
        plugins: [
            new UglifyJsPlugin({ minimize: true, sourceMap: true })
        ],
    },
    { // test with node.
        entry: './src/match_test.js',
        output: {
            filename: './test/match_test.js',
            libraryTarget: 'commonjs'
        },
        target: 'node'
    },
    { // test with browser.
        entry: './src/index.js',
        output: {
            filename: './test/index.bundle.js',
            libraryTarget: 'umd'
        },
        target: 'web'
    },
].map(c => ({
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|es6)$/,
                exclude: /(node_modules|bower_components)/,
                use: { loader: 'babel-loader' }
            }
        ]
    },
    ...c,
}));
