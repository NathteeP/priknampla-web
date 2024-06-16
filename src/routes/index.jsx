import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { lazy } from 'react'
import HomePage from '../pages/HomePage'
import ProtectedRoute from '../features/authentication/components/ProtectedRoute'
import FavoritePage from '../pages/FavoritePage'
import CreateRecipeContextProvider from '../features/recipe/create/CreateRecipeContext'

const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const MainContainer = lazy(() => import('../layouts/MainContainer'))
const CreateRecipePage = lazy(() => import('../pages/CreateRecipePage'))
const RecipePage = lazy(() => import ('../pages/RecipePage'))
const SearchResultPage = lazy(() => import ('../pages/SearchResultPage'))

const router = createBrowserRouter([
    {
        path: '/',
        element:<ProtectedRoute>
            <MainContainer />
        </ProtectedRoute>, 
        children: [
            {path: '/', element: <HomePage />},
            {path: 'favorite', element: <FavoritePage />},
            {path: 'create', element: (
            <CreateRecipeContextProvider>
                <CreateRecipePage />
            </CreateRecipeContextProvider>)}
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/recipe',
        element: <MainContainer />,
        children: [
            {
                path: ':recipeId',
                element: <RecipePage />
            },
            {
                path: '',
                element: <SearchResultPage />
            }
        ]
    }
])

export default function Router() {
    return <RouterProvider router={router} />
}