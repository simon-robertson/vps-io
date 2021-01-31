const fs = require("fs")
const zlib = require("zlib")

/**
 * @internal
 * @param {string} sourceFile
 * @param {string} outputFile
 * @param {zlib.BrotliCompress | zlib.Deflate} encoder
 * @returns {Promise<void>}
 */
const encode = (sourceFile, outputFile, encoder) => {
    const source = fs.createReadStream(sourceFile)
    const output = fs.createWriteStream(outputFile)

    return new Promise((resolve) => {
        source.pipe(encoder).pipe(output).once("finish", () => {
            resolve()
        })
    })
}

/**
 * @param {string} sourceFile
 * @param {string} outputFile
 * @returns {Promise<void>}
 */
const encodeBrotli = (sourceFile, outputFile) => {
    return encode(sourceFile, outputFile, zlib.createBrotliCompress())
}

/**
 * @param {string} sourceFile
 * @param {string} outputFile
 * @returns {Promise<void>}
 */
const encodeDeflate = (sourceFile, outputFile) => {
    return encode(sourceFile, outputFile, zlib.createDeflate())
}

module.exports = {
    encodeBrotli,
    encodeDeflate
}
