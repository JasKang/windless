import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { HtmlFC } from '@/shared/types'

export const Sidebar: HtmlFC<'div', {}> = props => {
  const location = useLocation()
  useEffect(() => {
    console.log(location)
  }, [location])
  return <div {...props}>Sidebar</div>
}
