import { useState } from "react";
import SearchBar from "../features/recipe/components/SearchBar";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import RecipeBlock from "../components/RecipeBlock";

export default function SearchResultPage () {
    const [searchResult, setSearchResult] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const {searchInput, setSearchInput} = useContext(SearchContext)

    useEffect(() => {
        setSearchInput(searchParams.get('search'))

    },[])


    return (
        <>
        <SearchBar 
        setSearchResult={setSearchResult}
        />
        <div>
            <RecipeBlock />
        </div>
        </>
    )
}