var path = require('path');
var fs = require('fs');


const {
    override,
    addDecoratorsLegacy,
    babelInclude,
    disableEsLint,
    tap
} = require("customize-cra");




module.exports = function (config, env) {
    let newConfig = Object.assign(config, override(
        disableEsLint(),
        addDecoratorsLegacy(),
        /*Make sure Babel compiles the stuff in the common folder*/
        babelInclude([

            fs.realpathSync('node_modules/spotify-shared'),
            fs.realpathSync('node_modules/spotify-shared-web'),
            path.resolve('src'), // don't forget this
        ])
    )(config, env));
    return {
        ...newConfig,
        /*
         optimization override to build react app in a single bundle js file
         */
        optimization: {
            ...newConfig.optimization,
            runtimeChunk: false,
            splitChunks: {
                cacheGroups: {
                    default: false
                }
            }
        },
        resolve: {
            ...newConfig.resolve,
            alias: {
                /*make sure all libraries point to a single REACT, this is to avoid conflicts with Hooks*/
                ...newConfig.resolve.alias,
                "react": path.resolve("./node_modules/react"),
                "formik": path.resolve("./node_modules/formik"),
                "react-dom": path.resolve("./node_modules/react-dom"),
                "redux": path.resolve("./node_modules/redux"),
                "css-loader": path.resolve("./node_modules/css-loader"),
            }
        }

    }
}
