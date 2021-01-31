const path = require("path")
const webpack = require("webpack")

const directories = require("./directories")
const options = require("./options")

const OUTPUT_TARGET_NODE = "node"
const OUTPUT_TARGET_WEB = "web"
const OUTPUT_TARGET_WEB_WORKER = "websorker"

/**
 * @param {string} sourceFile
 * @param {string} outputFile
 * @param {string} outputTarget
 * @returns {Promise<void>}
 */
const compile = (sourceFile, outputFile, outputTarget) => {
    const presetEnv = [
        "@babel/preset-env", {
            debug: false,
            modules: false,
            bugfixes: true,
            shippedProposals: true,
            useBuiltIns: "usage",
            corejs: {
                version: 3
            }
        }
    ]

    if (outputTarget === OUTPUT_TARGET_NODE) {
        presetEnv[1].targets = {
            node: "14"
        }
    }

    const presetReact = [
        "@babel/preset-react", {
            runtime: "classic"
        }
    ]

    const presetTypescript = [
        "@babel/preset-typescript"
    ]

    const loaderBabel = {
        loader: "babel-loader",
        options: {
            presets: [
                presetEnv,
                presetReact,
                presetTypescript
            ],
            cacheDirectory: directories.cache
        }
    }

    const loaderCss = {
        loader: "app-css-loader",
        options: {
            output: outputFile.replace(/\.js$/, ".css")
        }
    }

    const ruleCompile = {
        test: /\.tsx?$/,
        use: [
            loaderBabel,
            loaderCss
        ],
        sideEffects: false
    }

    const config = {
        entry: sourceFile,
        output: {
            path: path.dirname(outputFile),
            filename: path.basename(outputFile),
            chunkFilename: "chunks/[id]"
        },
        target: outputTarget,
        module: {
            rules: [
                ruleCompile
            ]
        },
        resolve: {
            alias: {
                app: path.join(directories.source, "app"),
                core: path.join(directories.source, "core"),
                editor: path.join(directories.source, "editor"),
                server: path.join(directories.source, "server")
            },
            extensions: [
                ".js", ".ts", ".tsx"
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                OUTPUT_MODE_PRODUCTION: JSON.stringify(options.production),
                OUTPUT_MODE_RELEASE: JSON.stringify(options.release)
            })
        ],
        bail: true
    }

    if (options.production) {
        config.mode = "production"

        if (options.release === false) {
            config.devtool = "source-map"
        }
    } else {
        config.mode = "development"
        config.devtool = "source-map"
    }

    return new Promise((resolve, reject) => {
        webpack(config, (error, stats) => {
            if (error) {
                reject(error.message)
                return
            }

            if (stats.hasErrors()) {
                reject(stats.toJson().errors[0].message)
                return
            }

            resolve()
        })
    })
}

module.exports = {
    OUTPUT_TARGET_NODE,
    OUTPUT_TARGET_WEB,
    OUTPUT_TARGET_WEB_WORKER,
    compile
}
