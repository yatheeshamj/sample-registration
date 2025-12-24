const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const glob = require("glob")
var fs = require('fs');

/*
 *
 * This File is used as part of the build process to build into a single bundle.js
 * */
module.exports = {
    entry: {
        "bundle.js": glob.sync("build/static/?(js|css)/main.*.?(js|css)").map(f => path.resolve(__dirname, f)),
    },
    output: {
        filename: "build/static/js/bundle.min.js",
    },
    module: {
        rules: [
            {
                test: [/.css$|.scss$/],   
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false,
                            implementation: require('sass'),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new UglifyJsPlugin()]
}
