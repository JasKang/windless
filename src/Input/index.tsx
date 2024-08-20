import { type ReactNode } from 'react'
import { Input as HInput } from '@headlessui/react'
import { clsx } from 'kotl'
import useValue from '../hooks/useValue'

type InputProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  readOnly?: boolean
  allowClear?: boolean
  invalid?: boolean
  disabled?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

export const Input = (props: InputProps) => {
  const { prefix, suffix, invalid, disabled, readOnly } = props
  const [value, setValue] = useValue(props, { defaultValue: '' })
  return (
    <HInput
      as="div"
      invalid={invalid}
      disabled={disabled}
      className={clsx([
        'focus-within:border-primary data-[invalid]:border-danger data-[invalid]:focus-within:ring-danger border-input-border focus-within:ring-primary data-[disabled]:bg-accent flex h-9 appearance-none items-center overflow-hidden rounded-md border text-left focus-within:z-10 focus-within:ring-1 focus-within:ring-offset-0 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60',
      ])}
    >
      {prefix && <span className="text-mute flex h-full min-w-8 items-center justify-center">{prefix}</span>}
      <input
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        onChange={e => setValue(e.target.value)}
        className={clsx([
          'placeholder:text-mute block w-full flex-1 cursor-[inherit] border-0 bg-transparent py-1.5 text-sm leading-snug focus:outline-none',
          { 'pl-3': !prefix, 'pr-3': !suffix },
        ])}
      />
      {suffix && <span className="text-mute flex h-full min-w-8 items-center justify-center">{suffix}</span>}
    </HInput>
  )
}
