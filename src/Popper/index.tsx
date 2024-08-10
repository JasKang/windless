import { Children, cloneElement, type ComponentProps, type FC, type ReactElement } from 'react'
import { useClick, useDismiss, useFloating, useFocus, useHover, useInteractions } from '@floating-ui/react'
import useControllableValue from '../hooks/useControllableValue'

type PopperProps = ComponentProps<'div'> & {
  open: boolean
  defaultOpen: boolean
  onOpenChange?: (value: boolean) => void
}

export const Popper: FC<PopperProps> = props => {
  const { open: _, children, className, style, ...others } = props

  const element = Children.only(children) as ReactElement

  const [value, setValue] = useControllableValue(props, {
    valuePropName: 'open',
    defaultValuePropName: 'defaultOpen',
    defaultValue: false,
    trigger: 'onOpenChange',
  })
  const { refs, floatingStyles, context } = useFloating()
  const hover = useHover(context)
  const focus = useFocus(context)
  const click = useClick(context)

  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, click, dismiss])

  const clickHandler = () => {
    setValue(!value)
  }
  return (
    <>
      {cloneElement(element, { ref: refs.setReference, ...getReferenceProps() })}
      <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} />
    </>
  )
}

export default Popper
