import { type ComponentProps, forwardRef, type ReactNode } from 'react'
import { clsx } from 'kotl'
import LoadingIcon from '@/Icon/LoadingIcon'
import { createFocusStyle } from '@/theme'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'solid' | 'soft' | 'outline' | 'text' | 'pure'
  color?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  pill?: boolean
  square?: boolean
  block?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
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
    icon,
    children,
    ...others
  } = props
  return (
    <button
      {...others}
      ref={ref}
      className={clsx([
        'inline-flex cursor-pointer appearance-none items-center justify-center whitespace-nowrap text-center font-medium outline-none transition-all focus:z-10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        createFocusStyle('outline', color),
        others.className,
        {
          default: `border-input-border text-foreground bg-input-background enabled-hover:bg-input-background-hover border shadow-sm`,
          outline: `border-2 shadow-sm ${
            {
              primary: 'enabled-hover:bg-primary-light border-primary bg-background text-primary',
              success: 'enabled-hover:bg-success-light border-success bg-background text-success',
              warning: 'enabled-hover:bg-warning-light border-warning bg-background text-warning',
              danger: 'enabled-hover:bg-danger-light border-danger bg-background text-danger',
            }[color]
          }`,
          solid: `shadow-sm ${
            {
              primary: 'bg-primary enabled-hover:bg-primary-2 text-white',
              success: 'bg-success enabled-hover:bg-success-2 text-white',
              warning: 'bg-warning enabled-hover:bg-warning-2 text-white',
              danger: 'bg-danger enabled-hover:bg-danger-2 text-white',
            }[color]
          }`,
          soft: `shadow-sm ${
            {
              primary: 'bg-primary-light enabled-hover:bg-primary-light-2 text-primary',
              success: 'bg-success-light enabled-hover:bg-success-light-2 text-success',
              warning: 'bg-warning-light enabled-hover:bg-warning-light-2 text-warning',
              danger: 'bg-danger-light enabled-hover:bg-danger-light-2 text-danger',
            }[color]
          }`,
          text: `${
            {
              primary: 'enabled-hover:bg-primary-light text-primary',
              success: 'enabled-hover:bg-success-light text-success',
              warning: 'enabled-hover:bg-warning-light text-warning',
              danger: 'enabled-hover:bg-danger-light text-danger',
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
      ])}
      disabled={disabled}
    >
      {(loading || icon) && (
        <span className={clsx(['*:h-[1em] *:w-[1em]', children && !square ? 'mr-1.5' : ''])}>
          {loading ? <LoadingIcon /> : icon}
        </span>
      )}
      {square && loading ? null : children}
    </button>
  )
})

export default Button
