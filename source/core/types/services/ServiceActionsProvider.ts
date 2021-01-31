import ServiceActions from "core/types/services/ServiceActions"
import ServiceActionsInput from "core/types/services/ServiceActionsInput"
import ServiceState from "core/types/services/ServiceState"

type ServiceActionsProvider<A extends ServiceActions, S extends ServiceState> = (input: ServiceActionsInput<S>) => A

export default ServiceActionsProvider
