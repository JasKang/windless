import { type FC, useMemo } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, type ListboxProps } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { clsx } from 'kotl'
import useValue from '@/hooks/useValue'

type SelectProps = ListboxProps & {
  value?: string | number
  onChange?: (value: string | number) => void
  defaultValue?: string | number
  options: Array<{
    value: string | number
    label: string
  }>
  placeholder?: string
}

function compareOption(a: any, b: any) {
  return a.value === b.value
}

export const Select: FC<SelectProps> = props => {
  const { value: _, defaultValue: _defaultValue, onChange, options = [], placeholder = '请选择', ...others } = props
  const [value, setValue] = useValue(props)
  const current = options.find(options => options.value === value)
  const defaultValue = useMemo(() => options.find(options => options.value === _defaultValue), [_defaultValue, options])

  return (
    <Listbox
      by={compareOption}
      value={current}
      defaultValue={defaultValue}
      onChange={item => setValue(item.value)}
      {...others}
    >
      <ListboxButton
        className={clsx([
          'bg-input-background border-input-border data-[invalid]:border-danger data-[invalid]:data-[focus]:ring-danger flex h-9 cursor-pointer appearance-none items-center overflow-hidden rounded-md border pl-3 text-left data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60',
          'data-[focus]:border-primary data-[focus]:ring-primary data-[active]:border-primary data-[active]:ring-primary data-[focus]:ring-1 data-[active]:ring-1',
        ])}
      >
        <div className="flex flex-1 items-center overflow-hidden text-nowrap">
          {value ? (
            <span className="w-full text-ellipsis text-nowrap">{value}</span>
          ) : (
            <span className="text-mute">{placeholder}</span>
          )}
        </div>
        <ChevronDownIcon className="text-mute mr-2 h-4 w-4 shrink-0"></ChevronDownIcon>
      </ListboxButton>
      <ListboxOptions
        anchor="bottom start"
        className={clsx([
          'ring-line w-[var(--button-width)] rounded p-1 text-sm ring-1 shadow shadow-md [--anchor-gap:var(--spacing-1)] focus:outline-none',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
        ])}
      >
        {options.map(item => (
          <ListboxOption key={item.value} value={item.value} className="data-[focus]:bg-blue-100">
            {item.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}
