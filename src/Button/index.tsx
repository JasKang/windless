import type { ComponentProps, FC, ReactNode } from 'react'
import { clsx } from 'kotl'
import { IconLoaderCircle } from '@/Icon/LoadingIcon'
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

export const Button: FC<ButtonProps> = props => {
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
      className={clsx([
        'inline-flex cursor-pointer appearance-none items-center justify-center whitespace-nowrap text-center font-medium outline-none transition-all focus:z-10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        createFocusStyle('outline', color),
        others.className,
        {
          default: `border-input-border text-foreground bg-input-background hover:bg-input-background-hover border shadow-sm`,
          outline: `border-2 shadow-sm ${
            {
              primary: 'hover:bg-primary-light border-primary bg-background text-primary',
              success: 'hover:bg-success-light border-success bg-background text-success',
              warning: 'hover:bg-warning-light border-warning bg-background text-warning',
              danger: 'hover:bg-danger-light border-danger bg-background text-danger',
            }[color]
          }`,
          solid: `shadow-sm ${
            {
              primary: 'bg-primary hover:bg-primary-2 text-white',
              success: 'bg-success hover:bg-success-2 text-white',
              warning: 'bg-warning hover:bg-warning-2 text-white',
              danger: 'bg-danger hover:bg-danger-2 text-white',
            }[color]
          }`,
          soft: `shadow-sm ${
            {
              primary: 'bg-primary-light hover:bg-primary-light-2 text-primary',
              success: 'bg-success-light hover:bg-success-light-2 text-success',
              warning: 'bg-warning-light hover:bg-warning-light-2 text-warning',
              danger: 'bg-danger-light hover:bg-danger-light-2 text-danger',
            }[color]
          }`,
          text: `${
            {
              primary: 'hover:bg-primary-light text-primary',
              success: 'hover:bg-success-light text-success',
              warning: 'hover:bg-warning-light text-warning',
              danger: 'hover:bg-danger-light text-danger',
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
          <IconLoaderCircle v-if="loading" className="animate-spin" />
          <slot v-else name="icon" />
        </span>
      )}
      {square && loading ? null : children}
    </button>
  )
}

export default Button
