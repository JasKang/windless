import { type ComponentProps, type FC, type ReactNode, useEffect } from 'react'
import { clsx } from 'kotl'
import useControllableValue from '../hooks/useControllableValue'

type InputProps = ComponentProps<'input'> & {
  value?: string
  status?: 'success' | 'warning' | 'danger'
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  allowClear?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  onChange?: (value: string) => void
}

export const Input: FC<InputProps> = props => {
  const {
    value: _,
    status,
    placeholder,
    readOnly,
    disabled,
    allowClear,
    prefix,
    suffix,
    children,
    className,
    style,
    ...others
  } = props

  const [value, setValue] = useControllableValue(props, {
    defaultValue: '',
  })
  useEffect(() => {
    console.log('useControllableValue:', value)
  }, [value])
  return (
    <div
      className={clsx(className, [
        'bg-input-background flex h-9 items-center overflow-hidden rounded-md border focus-within:z-10 focus-within:ring-1 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60',
        {
          normal: 'border-input-border focus-within:border-primary focus-within:ring-primary',
          success: 'border-success focus-within:ring-success',
          warning: 'border-warning focus-within:ring-warning',
          danger: 'border-danger focus-within:ring-danger',
        }[status || 'normal'],
      ])}
      style={style}
      data-disabled={disabled}
    >
      {prefix && <span className="text-mute-foreground flex h-full min-w-8 items-center justify-center">{prefix}</span>}

      <input
        className={clsx([
          'placeholder:text-mute-foreground block w-full flex-1 cursor-[inherit] border-0 bg-transparent py-1.5 text-sm leading-[1.375rem] outline-none focus:outline-none',
          { 'pl-3': !prefix, 'pr-3': !suffix },
        ])}
        style={{ boxShadow: 'none' }}
        autoComplete="off"
        {...others}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
      />
      {suffix && <span className="text-mute-foreground flex h-full min-w-8 items-center justify-center">{suffix}</span>}
    </div>
  )
}

export default Input
