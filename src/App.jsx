import { Suspense } from "react"
import Router from "./routes"
import AuthContextProvider from "./contexts/AuthContext"
import SearchContextProvider from "./contexts/SearchContext"

function App() {


  return (
    <Suspense fallback = {<h1>Loading...</h1>}>
    <AuthContextProvider>
      <SearchContextProvider>
      <Router />
      </SearchContextProvider>
    </AuthContextProvider>
    </Suspense>
  )
}

export default App
