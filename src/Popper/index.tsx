import { Children, cloneElement, type FC, type ReactElement, type ReactNode } from 'react'
import {
  flip as flipMiddleware,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset as offsetMiddleware,
  type Placement,
  size as sizeMiddleware,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react'
import useValue from '../hooks/useValue'

type PopperProps = {
  open?: boolean
  onOpenChange?: (value: boolean) => void
  defaultOpen?: boolean
  trigger?: 'hover' | 'focus' | 'click'
  placement?: Placement
  offset?: number
  sizeMode?: 'reference-width'
  content: ReactNode | (() => ReactNode)
  children?: ReactNode
}

const PopperComponent: FC<PopperProps> = props => {
  const { trigger = 'click', placement, offset = 0, sizeMode, content, children } = props

  const element = Children.only(children) as ReactElement

  const [open, setOpen] = useValue(props, {
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
    placement,
    middleware: [
      offsetMiddleware(offset),
      flipMiddleware(),
      sizeMode &&
        sizeMiddleware({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            })
          },
        }),
    ],
  })
  const hover = useHover(context, {
    enabled: trigger === 'hover',
  })
  const focus = useFocus(context, {
    enabled: trigger === 'focus',
  })
  const click = useClick(context, {
    enabled: trigger === 'click',
  })

  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, click, dismiss])

  return (
    <>
      {cloneElement(element, { ref: refs.setReference, ...getReferenceProps() })}
      <FloatingNode id={nodeId}>
        {open && (
          <FloatingPortal>
            <div ref={refs.setFloating} className="bg-white shadow" style={floatingStyles} {...getFloatingProps()}>
              {typeof content === 'function' ? content() : content}
            </div>
          </FloatingPortal>
        )}
      </FloatingNode>
    </>
  )
}

export const Popper: FC<PopperProps> = props => {
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
