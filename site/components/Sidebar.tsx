import { useEffect } from 'react'
import { Link, useLocation, useMatches } from 'react-router-dom'
import { clsx } from 'kotl'
import type { HtmlFC } from '@/shared/types'

export const Sidebar: HtmlFC<'div', {}> = props => {
  const location = useLocation()
  const matches = useMatches()

  const isActive = (path: string) => path === location.pathname
  useEffect(() => {
    console.log(location)
    console.log(matches)
  }, [location])

  const data = [
    { label: 'Button', path: '/components/button' },
    { label: 'Input', path: '/components/input' },
  ]
  return (
    <div {...props} className={clsx(['scrollbar overflow-y-scroll', props.className])}>
      <nav className="relative space-y-8 p-10">
        <div>
          <h5 className="mb-3 text-sm font-semibold text-gray-800 dark:text-neutral-200">Getting Started</h5>
          <ul className="ms-0.5 space-y-2 border-s-2 border-gray-100 dark:border-neutral-800">
            {data.map(item => (
              <li key={item.path}>
                <Link
                  className={clsx([
                    '-ms-px block border-s-2 ps-4 py-1 text-sm',
                    isActive(item.path)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-700 hover:border-gray-400 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300',
                  ])}
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
