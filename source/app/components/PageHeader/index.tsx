import React from "react"

import createComponent from "core/factories/createComponent"

const PageHeader = createComponent("memo:page-header", () => {
    return (
        <header className="page-header"></header>
    )
})

export default PageHeader
