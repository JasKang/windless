import { createBrowserRouter } from 'react-router-dom'
import Button from './docs/button.mdx'
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
        ],
      },
    ],
  },
])
