import React from "react"
import ReactDOM from "react-dom"

import Application from "app/components/Application"

const main = (): void => {
    const element = (
        <Application />
    )
    const container = document.querySelector("main.application")

    ReactDOM.render(element, container)
}

main()
