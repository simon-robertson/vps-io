import ServiceState from "core/types/services/ServiceState"
import ServiceStateReceiver from "core/types/services/ServiceStateReceiver"

type ServiceConnector<S extends ServiceState> = (receiver: ServiceStateReceiver<S>) => void

export default ServiceConnector
