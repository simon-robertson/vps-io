import ServiceState from "core/types/services/ServiceState"

type ServiceStateUpdater<S extends ServiceState> = (changes: Partial<S>) => void

export default ServiceStateUpdater
