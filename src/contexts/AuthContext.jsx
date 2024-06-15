import { createContext, useEffect, useState } from "react";
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils/local-storage";
import authApi from "../apis/auth";


export const AuthContext = createContext()

export default function AuthContextProvider({children}) {
    const [authUser, setAuthUser] = useState(null)

useEffect(() => {
    const fetchUser = async () => {
        try {
            if (getAccessToken()) {
                const res = await authApi.getAuthUser()
                setAuthUser(res.data.user)
            }

        } catch (err) {
            console.log(err)
        }
    }
    fetchUser()
},[])

const login = async (credentials) => {
    const res = await authApi.login(credentials)
    setAccessToken(res.data.accessToken)
    const resGetAuthUser = await authApi.getAuthUser()
    setAuthUser(resGetAuthUser.data.user)
}

const logout = () => {
    removeAccessToken()
    setAuthUser(null)
}

const contextValue = {authUser, login, logout}

return <AuthContext.Provider
value={contextValue}>
    {children}
</AuthContext.Provider>

}