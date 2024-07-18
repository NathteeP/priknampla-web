import { AuthContext } from "../contexts/AuthContext"
import { useState, useEffect, useContext } from "react"
import SearchBar from "../features/recipe/components/SearchBar"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import Carousel from "../components/Carousel"
import recipeApi from "../apis/recipe"

export default function HomePage () {
    const {authUser} = useContext(AuthContext)

    const [searchResult, setSearchResult] = useState([])
    const [carouselItems, setCarouselItems] = useState([])


    useEffect(() => {
        async function fetchRecipes() {
            const recipes = await recipeApi.search('')
            setCarouselItems(recipes.data[0].slice(0,11))
        }
        fetchRecipes()
    },[])

    const navigate = useNavigate()
    const navigateToRecipePage = (recipeId) => navigate(`/recipe/${recipeId}`)

    console.log(carouselItems)

    return (
        <div className="w-screen px-6">
        <h1>สวัสดี คุณ {authUser.displayName}</h1>
        <div
        className="flex flex-col items-center gap-8">
            <SearchBar
            setSearchResult={setSearchResult}
            />
            <div className="flex flex-col items-center">
                <h1>มีสูตรอาหารเด็ด ๆ อยู่ใช่มั้ย?</h1>
                <h1>อย่าเก็บไว้คนเดียว มีอีกหลายคนรอชิมอยู่นะ!</h1>
                <Button width='full'
                onClick={() => navigate('/create')}
                >เริ่มเขียนสูตรอาหาร</Button>
            </div>
            <Carousel items={carouselItems} onNavigate={navigateToRecipePage} />

        </div>
        </div>
    )
}