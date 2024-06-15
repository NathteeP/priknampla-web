import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { lazy } from 'react'
import LandingPage from '../pages/LandingPage'
import RegisterPage from '../pages/RegisterPage'
import FavortiePage from '../pages/FavoritePage'

const LoginPage = lazy(() => import('../pages/LoginPage'))
const MainContainer = lazy(() => import('../layouts/MainContainer'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainContainer />,
        children: [
            {path: '/', element: <LandingPage />},
            {path: 'favorite', element: <FavortiePage />}
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
])

export default function Router() {
    return <RouterProvider router={router} />
}