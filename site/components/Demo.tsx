import { clsx } from 'kotl'
import type { DomFC } from '@/shared/types'

export const Demo: DomFC<{
  code: string
}> = props => {
  const { children, className, style, code, ...others } = props
  return (
    <div className={clsx(className, 'rounded-md bg-white p-4 shadow')} style={style} {...others}>
      <div>{children}</div>
      <pre>{code}</pre>
    </div>
  )
}
