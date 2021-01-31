const production = process.argv.includes("production") || process.argv.includes("release")
const release = process.argv.includes("release")

module.exports = {
    production,
    release
}
