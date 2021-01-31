import ServiceActions from "core/types/services/ServiceActions"
import ServiceActionsProvider from "core/types/services/ServiceActionsProvider"
import ServiceState from "core/types/services/ServiceState"
import ServiceStateProvider from "core/types/services/ServiceStateProvider"

type ServiceInput<A extends ServiceActions, S extends ServiceState> = {
    readonly createActions: ServiceActionsProvider<A, S>
    readonly createState: ServiceStateProvider<S>
}

export default ServiceInput
