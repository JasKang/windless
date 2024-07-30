import './App.css'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
// import viteLogo from './assets/vite.svg'

export default function App() {
  return (
    <div className="app min-h-screen">
      <div className="header h-14 shadow">
        <div className="container mx-auto">header</div>
      </div>
      <div className="container mx-auto flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar className="w-80"></Sidebar>
        <div className="flex-auto p-12">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
