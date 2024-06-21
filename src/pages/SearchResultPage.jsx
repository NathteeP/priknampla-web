import SearchBar from "../features/recipe/components/SearchBar";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import RecipeBlock from "../components/RecipeBlock";
import { FavContext } from "../contexts/FavContext";
import { AuthContext } from "../contexts/AuthContext";
import recipeApi from "../apis/recipe";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchResultPage () {
    const [searchParams, setSearchParams] = useSearchParams()
    const {searchInput, setSearchInput, searchResult, setSearchResult} = useContext(SearchContext)
    const {userFav, addToFav, fetchAllFav, setUserFav} = useContext(FavContext)
    const {authUser} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        setSearchInput(searchParams.get('search'))
        const fetchSearchResult = async () => {
        const res = await recipeApi.search(searchInput?.trim())
        setSearchResult(res.data)
        }
        fetchSearchResult()
    },[])

    const isRecipeUserFav = (recipeId) => {
        if (authUser && userFav) {
            for (let el of userFav) {
                if (el.recipeId === recipeId) return true 
            }
        }
        return false
    }

    const handleClickAddFav = (el) => {
        const AddtoFavorite = () => {
            addToFav(authUser.id,el.id)
        }

        return authUser ?
        AddtoFavorite :
        () => navigate('/login')

    }

    useEffect(() => {
        fetchAllFav()
    },[])

    return (<>
   
       <div className="w-screen flex flex-col gap-4 px-8">
        <SearchBar width='full'
        />
        </div>
        <div className="grid grid-cols-2 p-4 gap-4">
            {searchResult.length > 0 ?
            searchResult[0]?.map(el => <RecipeBlock 
                key={el.id}
                recipeId={el.id}
                picture={el.picture}
                header={el.name}
                owner={el.displayName}
                preparedTime={el.preparedTime}
                addFavorite={handleClickAddFav(el)}
                isUserFav={isRecipeUserFav(el.id)}
                />) :
                <h1 className="text-2xl pl-4">ไม่พบข้อมูล...</h1>
        }

        </div>
        </>
      
    )
}