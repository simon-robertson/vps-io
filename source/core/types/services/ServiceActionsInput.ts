import ServiceState from "core/types/services/ServiceState"
import ServiceStateUpdater from "core/types/services/ServiceStateUpdater"

type ServiceActionsInput<S extends ServiceState> = {
    readonly state: S
    readonly updateState: ServiceStateUpdater<S>
}

export default ServiceActionsInput
