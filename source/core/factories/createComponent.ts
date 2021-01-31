import React from "react"

import Component from "core/types/components/Component"
import ComponentProps from "core/types/components/ComponentProps"

const createComponent = <P extends ComponentProps = ComponentProps>(name: string, func: Component<P>): Component<P> => {
    const meta = name.match(/^(?:(memo):)?(.+)$/)

    if (meta !== null) {
        if (meta[1] === "memo") {
            func = React.memo(func as React.FunctionComponent)
        }

        (func as React.FunctionComponent).displayName = meta[2]
    }

    return func
}

export default createComponent
