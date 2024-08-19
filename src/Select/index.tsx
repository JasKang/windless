import type { FC } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { clsx } from 'kotl'
import useValue from '@/hooks/useValue'
import { InputBox } from '@/Input'
import { Listbox } from '@/Listbox'
import { Popper } from '@/Popper'

type SelectProps = {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  options: string[]
  disabled?: boolean
  multiple?: boolean
  placeholder?: string
}

export const Select: FC<SelectProps> = props => {
  const [value, setValue] = useValue(props)

  return (
    <Popper
      trigger="click"
      placement="bottom-start"
      sizeMode="reference-width"
      offset={10}
      content={() => {
        return (
          <Listbox
            items={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
            ]}
          ></Listbox>
        )
      }}
    >
      <InputBox as="button" suffix={<ChevronDownIcon className="mr-1 h-4 w-4 shrink-0" />}>
        <div
          className={clsx([
            'block w-full flex-1 cursor-[inherit] border-0 bg-transparent py-1.5 text-sm leading-snug outline-none focus:outline-none',
            { 'pl-3': true, 'text-mute': !props.value },
          ])}
        >
          {props.value || props.placeholder}
        </div>
      </InputBox>
    </Popper>
  )
}
