import ServiceActions from "core/types/services/ServiceActions"
import ServiceConnector from "core/types/services/ServiceConnector"
import ServiceState from "core/types/services/ServiceState"

type Service<A extends ServiceActions, S extends ServiceState> = {
    readonly actions: A
    readonly state: S
    readonly connect: ServiceConnector<S>
    readonly disconnect: ServiceConnector<S>
}

export default Service
