import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { lazy } from 'react'
import HomePage from '../pages/HomePage'
import ProtectedRoute from '../features/authentication/components/ProtectedRoute'
import FavoritePage from '../pages/FavoritePage'

const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const MainContainer = lazy(() => import('../layouts/MainContainer'))
const CreateRecipePage = lazy(() => import('../pages/CreateRecipePage'))

const router = createBrowserRouter([
    {
        path: '/',
        element:<ProtectedRoute>
            <MainContainer />
        </ProtectedRoute>, 
        children: [
            {path: '/', element: <HomePage />},
            {path: 'favorite', element: <FavoritePage />},
            {path: 'create', element: <CreateRecipePage />}
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