import { createContext, useEffect, useState } from "react";
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils/local-storage";
import authApi from "../apis/auth";
import { toast } from "sonner";



export const AuthContext = createContext()

export default function AuthContextProvider({children}) {
    const [authUser, setAuthUser] = useState(null)

    const fetchUser = async () => {
        try {
            if (getAccessToken()) {
                const res = await authApi.getAuthUser()
                setAuthUser(res.data.user)
                console.log('fetching')
            }


        } catch (err) {
            console.log(err)
        }
    }

useEffect(() => {
    async () => await fetchUser()
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
    toast.success('ออกจากระบบสำเร็จ')
}

const contextValue = {authUser, login, logout, fetchUser}

return <AuthContext.Provider
value={contextValue}>
    {children}
</AuthContext.Provider>

}