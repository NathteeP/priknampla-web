import { createContext } from "react";
import favApi from "../apis/fav";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { cloneDeep } from "lodash";
import { useEffect } from "react";

export const FavContext = createContext()

export default function FavContextProvider({children}) {
    const [userFav, setUserFav] = useState([])
    const {authUser} = useContext(AuthContext)

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
        let res
        authUser?.id ? res = await favApi.getUserFav(authUser?.id) : null
        res.data ? setUserFav(res.data) : null
    }
    useEffect(() => {
         fetchAllFav()
    },[])

    const contextValue = {addToFav, deleteFav, userFav, setUserFav,
        fetchAllFav
    }

    return <FavContext.Provider
        value={contextValue}>
            {children}
        </FavContext.Provider>
}