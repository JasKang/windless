import { type ComponentProps, type FC } from 'react'
import useValue from '../hooks/useValue'

type SwitchProps = ComponentProps<'button'> & {
  value: boolean
  defaultValue: boolean
  onChange?: (value: boolean) => void
}

export const Switch: FC<SwitchProps> = props => {
  const { value: _, children, className, style, ...others } = props

  const [value, setValue] = useValue(props, {
    defaultValue: false,
  })
  const clickHandler = () => {
    setValue(!value)
  }
  return (
    <button
      type="button"
      className="data-[checked=true]:bg-primary focus-visible:ring-primary bg-input-accent focus-visible:ring-offset-background relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={clickHandler}
      data-checked={!!value}
      {...others}
    >
      <span
        data-checked={!!value}
        className="bg-background pointer-events-none relative inline-block h-5 w-5 transform rounded-full ring-0 shadow transition duration-200 ease-in-out data-[checked=true]:translate-x-5 data-[state=unchecked]:translate-x-0"
      ></span>
    </button>
  )
}

export default Switch
