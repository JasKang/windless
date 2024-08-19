import { type ComponentProps, forwardRef, type ReactNode } from 'react'
import { clsx } from 'kotl'
import useValue from '../hooks/useValue'

type InputBoxProps = ComponentProps<'div'> & {
  as?: 'div' | 'button'
  invalid?: boolean
  disabled?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

type InputProps = InputBoxProps & {
  value?: string
  placeholder?: string
  readOnly?: boolean
  allowClear?: boolean
  onChange?: (value: string) => void
}

export const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const { value: _, placeholder, readOnly, allowClear, onChange, invalid, disabled, prefix, suffix, ...others } = props

  const [value, setValue] = useValue(props, {
    defaultValue: '',
  })
  return (
    <InputBox invalid={invalid} disabled={disabled} prefix={prefix} suffix={suffix} {...others} ref={ref}>
      <input
        className={clsx([
          'placeholder:text-mute block w-full flex-1 cursor-[inherit] border-0 bg-transparent py-1.5 text-sm leading-snug outline-none focus:outline-none',
          { 'pl-3': !prefix, 'pr-3': !suffix },
        ])}
        style={{ boxShadow: 'none' }}
        autoComplete="off"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
      />
    </InputBox>
  )
})

export const InputBox = forwardRef<HTMLDivElement, InputBoxProps>((props, ref) => {
  const { as = 'div', invalid, disabled, prefix, suffix, children, className, ...others } = props
  const Component = as as any
  return (
    <Component
      {...others}
      ref={ref}
      className={clsx(className, [
        'bg-input-background flex h-9 appearance-none items-center overflow-hidden rounded-md border text-left focus-within:z-10 focus-within:ring-1 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60',
        invalid
          ? 'border-danger focus-within:ring-danger'
          : 'border-input-border focus-within:border-primary focus-within:ring-primary',
      ])}
      data-disabled={disabled}
    >
      {prefix && <span className="text-mute flex h-full min-w-8 items-center justify-center">{prefix}</span>}
      {children}
      {suffix && <span className="text-mute flex h-full min-w-8 items-center justify-center">{suffix}</span>}
    </Component>
  )
})
