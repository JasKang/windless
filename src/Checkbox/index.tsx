import type { FC } from 'react'
import { Checkbox as HCheckbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import useValue from '@/hooks/useValue'

type CheckProps = {
  checked: boolean
  defaultChecked: boolean
  onChange: (checked: boolean) => void
  value: string
}

export const Checkbox: FC<CheckProps> = props => {
  const [enabled, setEnabled] = useValue(props, {
    valuePropName: 'checked',
    defaultValuePropName: 'defaultChecked',
    defaultValue: false,
  })
  return (
    <HCheckbox checked={enabled} onChange={setEnabled} className="group bg-primary">
      <CheckIcon className="hidden size-4 fill-white group-data-[checked]:block" />
    </HCheckbox>
  )
}
