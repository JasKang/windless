import { type FC } from 'react'
import { Switch as HlSwitch } from '@headlessui/react'
import useValue from '../hooks/useValue'

type SwitchProps = {
  value: boolean
  defaultValue: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

export const Switch: FC<SwitchProps> = props => {
  const { disabled } = props

  const [value, setValue] = useValue(props, {
    defaultValue: false,
  })
  return (
    <HlSwitch
      checked={value}
      onChange={setValue}
      disabled={disabled}
      className="group data-[checked]:bg-primary bg-input-accent data-[focus]:ring-primary relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:ring-2 data-[focus]:ring-offset-2 data-[disabled]:opacity-50"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
      />
    </HlSwitch>
  )
}

export default Switch
