const fs = require("fs")
const path = require("path")

/**
 * @param {string} source
 * @param {object} loader
 * @returns {string}
 */
const exec = (source, loader) => {
    const options = loader.getOptions()

    if (options.output === undefined) {
        throw new Error("Output path has not been defined")
    }

    if (/\.tsx$/.test(loader.resourcePath)) {
        const cssPath = loader.resourcePath.replace(/\.tsx$/, ".css")

        if (fs.existsSync(cssPath)) {
            const css = fs.readFileSync(cssPath)
            const directory = path.dirname(options.output)

            if (fs.existsSync(directory) === false) {
                fs.mkdirSync(directory, {
                    recursive: true
                })
            }

            fs.writeFileSync(options.output, css, {
                flag: "as"
            })
        }
    }

    return source
}

module.exports = function(source) {
    return exec(source, this)
}
