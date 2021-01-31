import React from "react"

import PageContent from "app/components/PageContent"
import PageFooter from "app/components/PageFooter"
import PageHeader from "app/components/PageHeader"

import createComponent from "core/factories/createComponent"

const Application = createComponent("memo:application", () => {
    return (
        <React.Fragment>
            <PageHeader />
            <PageContent />
            <PageFooter />
        </React.Fragment>
    )
})

export default Application
