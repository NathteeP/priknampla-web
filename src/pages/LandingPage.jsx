import { useEffect } from "react";
import SearchBar from "../features/recipe/components/SearchBar";
import { useContext } from "react";
import { FavContext } from "../contexts/FavContext";
import { useState } from "react";
import recipeApi from "../apis/recipe";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function LandingPage() {
const {setUserFav} = useContext(FavContext)
const [carouselItems, setCarouselItems] = useState([])
const navigate = useNavigate()
    useEffect(() => {
        setUserFav([])
        async function fetchRecipes() {
            const recipes = await recipeApi.search('')
            setCarouselItems(recipes.data[0].slice(0,11))
        }
        fetchRecipes()
    },[setUserFav])
    const navigateToRecipePage = (recipeId) => navigate(`/recipe/${recipeId}`)

    return (
        <div style={{height: 'calc(100vh - 92px)'}} 
        className="w-screen flex flex-col justify-center items-center gap-8">
            <h1 className="text-5xl font-semibold">
                แบ่งปันสูตรอาหารของคุณ
            </h1>
            <p className="text-2xl">กว่า .... สูตรอาหารทั่วโลก จากชุมชนของเรา</p>
            <SearchBar
            />
            <Carousel items={carouselItems} onNavigate={navigateToRecipePage} />

        </div>
    )
}