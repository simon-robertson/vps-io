import Service from "core/types/services/Service"
import ServiceActions from "core/types/services/ServiceActions"
import ServiceConnector from "core/types/services/ServiceConnector"
import ServiceInput from "core/types/services/ServiceInput"
import ServiceState from "core/types/services/ServiceState"
import ServiceStateReceiver from "core/types/services/ServiceStateReceiver"
import ServiceStateUpdater from "core/types/services/ServiceStateUpdater"

const createService = <A extends ServiceActions, S extends ServiceState>(input: ServiceInput<A, S>): Service<A, S> => {
    const stateReceivers = new Set<ServiceStateReceiver<S>>()

    const connect: ServiceConnector<S> = (receiver) => {
        stateReceivers.add(receiver)
    }

    const disconnect: ServiceConnector<S> = (receiver) => {
        stateReceivers.delete(receiver)
    }

    const state = input.createState()

    const updateState: ServiceStateUpdater<S> = (changes) => {
        let mutable = state as any
        let updated = false

        Object.keys(changes).forEach((key) => {
            if (mutable[key] !== changes[key]) {
                mutable[key] = changes[key]
                updated = true
            }
        })

        if (updated) {
            stateReceivers.forEach((receiver) => {
                receiver(state)
            })
        }
    }

    return {
        actions: input.createActions({
            state,
            updateState
        }),
        state,
        connect,
        disconnect
    }
}

export default createService
