import { createContext, useState, useContext, useEffect } from "react";
import favApi from "../apis/fav";
import { AuthContext } from "./AuthContext";
import { cloneDeep } from "lodash";

export const FavContext = createContext()

export default function FavContextProvider({children}) {
    const [userFav, setUserFav] = useState([])
    const {authUser, fetchUser} = useContext(AuthContext)

    const addToFav = async (userId, recipeId) => {
        try {
            const body = {'isFavorite': true}
            await favApi.modifyFav(userId,recipeId,body)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteFav = async(userId, recipeId) => {
        try {
            const body = {'isFavorite': false}
            await favApi.modifyFav(userId,recipeId,body)
            const newFav = cloneDeep(userFav).filter(el => 
                el.recipeId !== recipeId)

            setUserFav(newFav)
        } catch (err) {
            console.log(err)
        }
    }
    const fetchAllFav = async () => {
        if (!authUser?.id) await fetchUser()
        if (authUser?.id) {
            const res = await favApi.getUserFav(authUser?.id)
            if (res?.data)  setUserFav(res.data)
        }

    }
    useEffect(() => {
         if (authUser?.id) fetchAllFav()
    },[authUser])

    const contextValue = {addToFav, deleteFav, userFav, setUserFav,
        fetchAllFav
    }

    return <FavContext.Provider
        value={contextValue}>
            {children}
        </FavContext.Provider>
}