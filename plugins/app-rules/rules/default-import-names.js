const path = require("path")

const handleDefaultImport = (node, context) => {
    const importName = node.local.name
    const importPath = node.parent.source.value
    const moduleName = path.basename(importPath)

    const matchers = context.options[0]

    if (matchers !== undefined) {
        const result = matchers.find((base) => {
            return importPath.indexOf(base) === 0
        })

        if (result === undefined) {
            return
        }
    }

    if (importName !== moduleName) {
        context.report({
            node: node.local,
            data: {
                moduleName
            },
            message: "Import name must be {{moduleName}}"
        })
    }
}

module.exports = {
    meta: {
        type: "problem",
        schema: [
            {
                type: "array",
                items: {
                    type: "string"
                }
            }
        ]
    },
    create: (context) => {
        return {
            ImportDefaultSpecifier: (node) => handleDefaultImport(node, context)
        }
    }
}
