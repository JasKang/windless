import { createBrowserRouter } from 'react-router-dom'
import Button from './docs/button.mdx'
import Input from './docs/input.mdx'
import Switch from './docs/switch.mdx'
import App from './App'
import ErrorPage from './ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'components',
        children: [
          {
            path: 'button',
            element: <Button />,
          },
          {
            path: 'input',
            element: <Input />,
          },
          {
            path: 'switch',
            element: <Switch />,
          },
        ],
      },
    ],
  },
])
