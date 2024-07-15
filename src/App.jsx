import { Suspense } from "react"
import Router from "./routes"
import AuthContextProvider from "./contexts/AuthContext"
import SearchContextProvider from "./contexts/SearchContext"
import FavContextProvider from "./contexts/FavContext"
import { Toaster } from "sonner"

function App() {


  return (
    <Suspense fallback = {<h1>Loading...</h1>}>
    <AuthContextProvider>
      <SearchContextProvider>
        <FavContextProvider>
      <Toaster 
        toastOptions={{
          unstyled: false,
          classNames: {
            error: 'text-red-500',
            success: 'text-green-500',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <Router />
        </FavContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
    </Suspense>
  )
}

export default App
