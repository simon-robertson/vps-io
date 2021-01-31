const fs = require("fs")
const path = require("path")

/**
 * @typedef {object} DirectorySearchOptions
 * @property {RegExp=} filter
 * @property {boolean=} recursive
 * @property {boolean=} relative
 */
undefined

/**
 * @param {string} sourceDirectory
 * @param {string} outputDirectory
 */
const copyDirectory = (sourceDirectory, outputDirectory) => {
    if (isDirectory(outputDirectory) === false) {
        createDirectory(outputDirectory)
    }

    searchDirectory(sourceDirectory, { relative: true }).forEach((entry) => {
        const sourceEntry = path.join(sourceDirectory, entry)
        const outputEntry = path.join(outputDirectory, entry)

        if (isDirectory(sourceEntry)) {
            copyDirectory(sourceEntry, outputEntry)
            return
        }

        copyFile(sourceEntry, outputEntry)
    })
}

/**
 * @param {string} sourceFile
 * @param {string} outputFile
 */
const copyFile = (sourceFile, outputFile) => {
    const outputDirectory = path.dirname(outputFile)

    if (isDirectory(outputDirectory) === false) {
        createDirectory(outputDirectory)
    }

    fs.copyFileSync(sourceFile, outputFile)
}

/**
 * @param {string} directory
 */
const createDirectory = (directory) => {
    fs.mkdirSync(directory, { recursive: true })
}

/**
 * @param {string} directory
 */
const deleteDirectory = (directory) => {
    searchDirectory(directory).forEach((entry) => {
        if (isDirectory(entry)) {
            deleteDirectory(entry)
            return
        }

        deleteFile(entry)
    })

    fs.rmdirSync(directory)
}

/**
 * @param {string} file
 */
const deleteFile = (file) => {
    fs.unlinkSync(file)
}

/**
 * @param {string} directory
 * @returns {boolean}
 */
const isDirectory = (directory) => {
    if (fs.existsSync(directory)) {
        return fs.statSync(directory).isDirectory()
    }

    return false
}

/**
 * @param {string} file}
 * @returns {boolean}
 */
const isFile = (file) => {
    if (fs.existsSync(file)) {
        return fs.statSync(file).isDirectory()
    }

    return false
}

/**
 * @param {string} directory
 * @param {DirectorySearchOptions} options
 * @param {string[]} output
 * @returns {string[]}
 */
const searchDirectory = (directory, options = {}, output = []) => {
    const filter = options.filter ?? null
    const recursive = options.recursive ?? false
    const relative = options.relative ?? false

    fs.readdirSync(directory).forEach((entry) => {
        entry = path.join(directory, entry)

        if (filter === null || filter.test(entry)) {
            if (relative) {
                output.push(path.relative(directory, entry))
            } else {
                output.push(entry)
            }
        }

        if (recursive && isDirectory(entry)) {
            searchDirectory(entry, options, output)
        }
    })

    return output
}

module.exports = {
    copyDirectory,
    copyFile,
    createDirectory,
    deleteDirectory,
    deleteFile,
    isDirectory,
    isFile,
    searchDirectory
}
