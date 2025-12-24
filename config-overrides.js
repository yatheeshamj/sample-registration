var path = require('path');
var fs = require('fs');
const {
    override,
    addDecoratorsLegacy,
    babelInclude,
    disableEsLint,
} = require("customize-cra");

module.exports = function (config, env) {
    let _config = Object.assign(config, override(
        disableEsLint(),
        addDecoratorsLegacy(),
        /*Make sure Babel compiles the stuff in the common folder*/
        babelInclude([
            path.resolve('src'), // don't forget this
            fs.realpathSync('node_modules/spotify-shared'),
            fs.realpathSync('node_modules/spotify-shared-web')

        ])
    )(config, env));

  
    return {
        ..._config,
        resolve: {
            ..._config.resolve,
            alias: {
                /*make sure all libraries point to a single REACT, this is to avoid conflicts with Hooks*/
                ..._config.resolve.alias,
                "react": path.resolve("./node_modules/react"),
                "formik": path.resolve("./node_modules/formik"),
                "redux": path.resolve("./node_modules/redux"),
                "css-loader": path.resolve("./node_modules/css-loader"),
            }
        }

    }
}
