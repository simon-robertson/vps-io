import ServiceState from "core/types/services/ServiceState"

type ServiceStateSelector<S extends ServiceState, T> = (state: S) => T

export default ServiceStateSelector
