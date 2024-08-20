import { type FC } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, type ListboxProps } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { clsx } from 'kotl'
import useValue from '@/hooks/useValue'

type SelectProps = ListboxProps & {
  value?: string | number
  onChange?: (value: string | number) => void
  defaultValue?: string | number
  options: Array<{
    value: string | number
    label: string
    disabled?: boolean
  }>
  placeholder?: string
}

function compareOption(a: string, b: string) {
  return a === b
}

export const Select: FC<SelectProps> = props => {
  const { value: _, defaultValue = '', onChange, options = [], placeholder = '请选择', ...others } = props
  const [value, setValue] = useValue(props, {
    defaultValue,
  })
  const current = options.find(options => options.value === value)

  return (
    <Listbox by={compareOption} value={value} defaultValue={defaultValue} onChange={val => setValue(val)} {...others}>
      <ListboxButton
        className={clsx([
          'bg-input-background border-input-border flex h-9 cursor-pointer appearance-none items-center overflow-hidden rounded-md border pl-3 text-left transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60',
          'data-[focus]:ring-primary focus:outline-none data-[focus]:ring-2 data-[focus]:ring-offset-2',
          'data-[invalid]:border-danger data-[invalid]:data-[focus]:ring-danger',
        ])}
      >
        <div className="flex flex-1 items-center overflow-hidden text-nowrap">
          {current ? (
            <span className="w-full text-ellipsis text-nowrap">{current.label}</span>
          ) : (
            <span className="text-mute">{placeholder}</span>
          )}
        </div>
        <ChevronDownIcon className="text-mute mr-2 h-4 w-4 shrink-0"></ChevronDownIcon>
      </ListboxButton>
      <ListboxOptions
        anchor="bottom start"
        className={clsx([
          'ring-line w-[var(--button-width)] rounded bg-white p-1 text-sm ring-1 shadow shadow-md [--anchor-gap:var(--spacing-1)] focus:outline-none',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
        ])}
      >
        {options.map(item => (
          <>
            <ListboxOption
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className="group data-[focus]:bg-input-background-hover flex min-h-9 w-full items-center gap-1 rounded"
            >
              <div className="flex flex-1 items-center overflow-hidden text-nowrap pl-2">
                <span className="w-full text-ellipsis text-nowrap group-data-[selected]:font-medium">{item.label}</span>
              </div>
              <CheckIcon className="invisible mr-2 h-4 w-4 shrink-0 group-data-[selected]:visible" />
            </ListboxOption>
          </>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}
