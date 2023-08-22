import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import ExistRoomPage from './pages/ExistRoomPage'
import NewRoomPage from './pages/NewRoomPage'
import ChatRoomPage from './pages/ChatRoomPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <IndexPage />
    },
    {
        path: '/newroom',
        element: <NewRoomPage />
    },
    {
        path: '/exroom',
        element: <ExistRoomPage />
    },
    {
        path: '/chat/:roomCode',
        element: <ChatRoomPage />
    }
])

function App() {
  return (
    <main className='App'>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App