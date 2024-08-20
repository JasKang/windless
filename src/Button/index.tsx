import { forwardRef, type ReactNode } from 'react'
import { Button as HButton } from '@headlessui/react'
import { clsx } from 'kotl'
import LoadingIcon from '@/Icon/LoadingIcon'

type ButtonProps = {
  variant?: 'solid' | 'soft' | 'outline' | 'text' | 'pure'
  color?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  pill?: boolean
  square?: boolean
  block?: boolean
  loading?: boolean
  disabled?: boolean
  autoFocus?: boolean
  icon?: ReactNode
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'default',
    color = 'primary',
    size = 'md',
    pill,
    square,
    block,
    loading,
    disabled,
    autoFocus,
    icon,
    className,
    style,
    children,

    onClick,
  } = props
  return (
    <HButton
      ref={ref}
      autoFocus={autoFocus}
      disabled={disabled}
      style={style}
      onClick={onClick}
      className={clsx([
        'data-[focus]:ring-primary inline-flex cursor-pointer appearance-none items-center justify-center whitespace-nowrap text-center font-medium outline-none transition-all data-[focus]:ring-2 data-[focus]:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        {
          primary: 'data-[focus]:ring-primary',
          success: 'data-[focus]:ring-success',
          warning: 'data-[focus]:ring-warning',
          danger: 'data-[focus]:ring-danger',
        }[color],
        {
          default: `border-input-border text-foreground bg-input-background data-[hover]:bg-input-background-hover border shadow-sm`,
          outline: `bg-background border-2 shadow-sm ${
            {
              primary: 'data-[hover]:bg-primary-light border-primary text-primary',
              success: 'data-[hover]:bg-success-light border-success text-success',
              warning: 'data-[hover]:bg-warning-light border-warning text-warning',
              danger: 'data-[hover]:bg-danger-light border-danger text-danger',
            }[color]
          }`,
          solid: `text-white shadow-sm ${
            {
              primary: 'bg-primary data-[hover]:bg-primary-2',
              success: 'bg-success data-[hover]:bg-success-2',
              warning: 'bg-warning data-[hover]:bg-warning-2',
              danger: 'bg-danger data-[hover]:bg-danger-2',
            }[color]
          }`,
          soft: `shadow-sm ${
            {
              primary: 'bg-primary-light data-[hover]:bg-primary-light-2 text-primary',
              success: 'bg-success-light data-[hover]:bg-success-light-2 text-success',
              warning: 'bg-warning-light data-[hover]:bg-warning-light-2 text-warning',
              danger: 'bg-danger-light data-[hover]:bg-danger-light-2 text-danger',
            }[color]
          }`,
          text: `${
            {
              primary: 'data-[hover]:bg-primary-light text-primary',
              success: 'data-[hover]:bg-success-light text-success',
              warning: 'data-[hover]:bg-warning-light text-warning',
              danger: 'data-[hover]:bg-danger-light text-danger',
            }[color]
          }`,
          pure: '',
        }[variant],
        {
          sm: `h-7 text-xs ${props.square ? 'w-7' : 'py-1 px-2'}`,
          md: `h-9 text-sm ${props.square ? 'w-9' : 'py-1.5 px-3'}`,
          lg: `h-11 text-base ${props.square ? 'w-11' : 'py-2 px-4'}`,
        }[size],
        pill ? 'rounded-full' : 'rounded-md',
        !square && block ? 'w-full' : '',
        className,
      ])}
    >
      {(loading || icon) && (
        <span className={clsx(['*:h-[1em] *:w-[1em]', children && !square ? 'mr-1.5' : ''])}>
          {loading ? <LoadingIcon /> : icon}
        </span>
      )}
      {square && loading ? null : children}
    </HButton>
  )
})

export default Button
