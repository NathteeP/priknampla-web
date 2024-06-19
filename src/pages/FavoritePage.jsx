import { useEffect } from "react"
import favApi from "../apis/fav"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import RecipeBlock from "../components/RecipeBlock"
import { FavContext } from "../contexts/FavContext"

export default function FavoritePage () {
    const {authUser} = useContext(AuthContext)

    const {deleteFav, userFav, fetchAllFav} = useContext(FavContext)

    useEffect(() => {
        fetchAllFav()
    },[])

    return (<>
        <h1 className="text-2xl text-center font-semibold mb-4">เมนูโปรด</h1>
        <div className="grid grid-cols-2">
            
            {userFav.length > 0 ?
            userFav?.map(el => <RecipeBlock 
            key={el.recipeId}
            hasDelete
            recipeId={el.recipeId}
            picture={el.recipe.picture}
            header={el.recipe.name}
            owner={el.recipe.user.displayName}
            preparedTime={el.recipe.preparedTime}
            deleteFavorite={()=> deleteFav(authUser.id,el.recipeId)}
            isUserFav={true}
            />) :
            <h1 className="text-xl pl-4 text-green-600">ยังไม่มีเมนูโปรด</h1>
        }
            
        </div>
        </>
    )
}