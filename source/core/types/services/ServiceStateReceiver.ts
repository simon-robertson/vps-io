import ServiceState from "core/types/services/ServiceState"

type ServiceStateReceiver<S extends ServiceState> = (state: S) => void

export default ServiceStateReceiver
