import { Children, cloneElement, type CSSProperties, type FC, type ReactElement, type ReactNode } from 'react'
import {
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react'
import useControllableValue from '../hooks/useControllableValue'

type PopperProps = {
  open: boolean
  defaultOpen: boolean
  onOpenChange?: (value: boolean) => void
  className?: string
  style?: CSSProperties
  children?: ReactElement
  content?: ReactNode
  trigger?: 'hover' | 'focus' | 'click'
}

const PopperComponent: FC<PopperProps> = props => {
  const { children, className, style } = props

  const element = Children.only(children) as ReactElement

  const [open, setOpen] = useControllableValue(props, {
    valuePropName: 'open',
    defaultValuePropName: 'defaultOpen',
    defaultValue: false,
    trigger: 'onOpenChange',
  })
  const nodeId = useFloatingNodeId()

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open,
    onOpenChange: setOpen,
  })
  const hover = useHover(context, {
    enabled: props.trigger === 'hover',
  })
  const focus = useFocus(context, {
    enabled: props.trigger === 'focus',
  })
  const click = useClick(context, {
    enabled: props.trigger === 'click',
  })

  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, click, dismiss])

  return (
    <>
      {cloneElement(element, { ref: refs.setReference, ...getReferenceProps() })}
      <FloatingNode id={nodeId}>
        {open && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              className={className}
              style={{ ...style, ...floatingStyles }}
              {...getFloatingProps()}
            >
              {props.content}
            </div>
          </FloatingPortal>
        )}
      </FloatingNode>
    </>
  )
}

const Popper: FC<PopperProps> = props => {
  const parentId = useFloatingParentNodeId()
  if (parentId === null) {
    return (
      <FloatingTree>
        <PopperComponent {...props} />
      </FloatingTree>
    )
  }
  return <PopperComponent {...props} />
}

export default Popper
