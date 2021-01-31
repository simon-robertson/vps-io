import React from "react"

import Service from "core/types/services/Service"
import ServiceActions from "core/types/services/ServiceActions"
import ServiceState from "core/types/services/ServiceState"
import ServiceStateReceiver from "core/types/services/ServiceStateReceiver"
import ServiceStateSelector from "core/types/services/ServiceStateSelector"

const useServiceState = <S extends ServiceState, T>(service: Service<ServiceActions, S>, selector: ServiceStateSelector<S, T>): T => {
    const [value, setValue] = React.useState(() => {
        return selector(service.state)
    })

    React.useEffect(() => {
        const receiver: ServiceStateReceiver<S> = (state) => {
            setValue(selector(state))
        }

        service.connect(receiver)

        return () => {
            service.disconnect(receiver)
        }
    }, [])

    return value
}

export default useServiceState
