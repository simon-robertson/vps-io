const path = require("path")

const compiler = require("./lib/compiler")
const directories = require("./lib/directories")
const encoder = require("./lib/encoder")
const filesystem = require("./lib/filesystem")

const main = async () => {
    // Remove the output directory is it exists
    if (filesystem.isDirectory(directories.output)) {
        filesystem.deleteDirectory(directories.output)
    }

    // Compile the modules
    try {
        await compiler.compile(
            path.join(directories.source, "app/index.tsx"),
            path.join(directories.output, "app/index.js"),
            compiler.OUTPUT_TARGET_WEB
        )
        await compiler.compile(
            path.join(directories.source, "editor/index.tsx"),
            path.join(directories.output, "editor/index.js"),
            compiler.OUTPUT_TARGET_WEB
        )
    } catch (reason) {
        console.error(reason)
        return
    }

    // Copy the template files to the output directory
    filesystem.copyDirectory(directories.template, directories.output)

    const encodableOptions = {
        filter: /\.(?:css|html|js|json|svg)$/,
        recursive: true
    }
    const encodableFiles = []

    // Search for encodable static files
    filesystem.searchDirectory(path.join(directories.output, "app"), encodableOptions, encodableFiles)
    filesystem.searchDirectory(path.join(directories.output, "editor"), encodableOptions, encodableFiles)

    // Encode the static files (no reason for the server to do this at runtime)
    for (const file of encodableFiles) {
        try {
            await encoder.encodeBrotli(file, file + ".br")
            await encoder.encodeDeflate(file, file + ".deflate")
        } catch (reason) {
            console.error(reason)
            return
        }
    }
}

main()
