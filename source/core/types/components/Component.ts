import React from "react"

import ComponentElement from "core/types/components/ComponentElement"
import ComponentProps from "core/types/components/ComponentProps"

type Component<P extends ComponentProps = ComponentProps> = (props: React.PropsWithChildren<P>) => ComponentElement

export default Component
