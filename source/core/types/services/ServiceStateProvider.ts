import ServiceState from "core/types/services/ServiceState"

type ServiceStateProvider<S extends ServiceState> = () => S

export default ServiceStateProvider
