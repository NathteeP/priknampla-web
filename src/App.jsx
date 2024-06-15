import { Suspense } from "react"
import Router from "./routes"
import AuthContextProvider from "./contexts/AuthContext"

function App() {


  return (
    <Suspense fallback = {<h1>Loading...</h1>}>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
    </Suspense>
  )
}

export default App
