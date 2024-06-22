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
    const {userFav, addToFav, fetchAllFav} = useContext(FavContext)
    const {authUser, fetchUser} = useContext(AuthContext)
    const [isFavArray, setIsFavArray] = useState([]) //array of true,false depending on search result

    const navigate = useNavigate()

    useEffect(() => {
        const searchQuery = searchParams.get('search')
        setIsFavArray([])
        if (searchQuery) setSearchInput(searchQuery)

        },[])

    useEffect(() => {
        const fetchSearchResult = async () => {
            
            const res = await recipeApi.search(searchInput.trim())
            setSearchResult(res.data)
            
        }

        fetchSearchResult()
            
        },[searchInput])
        
        useEffect(() => {
            fetchUser()
        },[])
        
        useEffect(() => {
            if (authUser) fetchAllFav()
                
    },[])

    useEffect(() => {
        const handleIsFavArray = () => {
            const objectTemplate = {recipeId: '', isFav: false}
            return searchResult[0]?.reduce((acc,el) => {
                acc.push(userFav?.find(favEl => favEl.recipeId === el.id)? 
            {...objectTemplate, recipeId: el.id, isFav: true} : 
            {...objectTemplate, recipeId: el.id, isFav: false})
            return acc
        },[])
    }
    if (searchResult.length > 0) {
        setIsFavArray(handleIsFavArray())
    }
    },[searchResult, userFav])



    const updateFavArray = (el) => {
        setIsFavArray(prev =>
            prev.map(favEl => (favEl.recipeId === el.id ? { ...favEl, isFav: true } : favEl))
        );
    };

    const addFavorite = (el) => {
        addToFav(authUser.id, el.id);
        updateFavArray(el);
    };

    const handleClickAddFav = (el) => {
        return authUser ? () => addFavorite(el) : () => navigate('/login');
    };

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
                isUserFav={isFavArray.find(favEl => el.id === favEl?.recipeId)?.isFav}
                />) :
                <h1 className="text-2xl pl-4">ไม่พบข้อมูล...</h1>
        }

        </div>
        </>
      
    )
}