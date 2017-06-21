const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});


const reactModule = {
    loaders: [
        {
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }
    ]
};

const reactPlugins = [
    /* new UglifyJSPlugin({minimize: true, comments: false}),*/
];

const  reactClient = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../resources/static/js')
    },
    module: reactModule,
    plugins: reactPlugins
};

const reactServer = {
    entry: './app/server.js',
    output: {
        filename: 'server-bundle.js',
        library: 'MyApp',
        path: path.resolve(__dirname, '../resources/static/js')
    },
    module: reactModule,
    plugins: reactPlugins
};

const styles = {
    entry: './app/styles/main.scss',
    output: {
        filename: 'styles.css',
        path: path.resolve(__dirname, '../resources/static/css')
    },
    module: {
        rules: [{
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'url-loader?limit=100000'
        },{
            test: /\.scss$/,
            exclude: '/node_modules/',
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            }),
        }]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
};

module.exports = [reactClient, reactServer ,styles];