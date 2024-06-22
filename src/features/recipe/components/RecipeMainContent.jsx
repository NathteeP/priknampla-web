import Button from "../../../components/Button";
import RatingButton from "./RatingButton";
import clocheLogo from "../../../assets/cloche.svg"
import plateLogo from "../../../assets/plate.svg"
import { useContext } from "react";
import { FavContext } from "../../../contexts/FavContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import recipeApi from "../../../apis/recipe";

export default function RecipeMainContent ({recipe}) {

    const {addToFav, fetchAllFav, userFav, modifyRating} = useContext(FavContext)
    const {authUser, fetchUser} = useContext(AuthContext)
    const [isUserFav, setIsUserFav] = useState(false)
    const [recipeRating, setRecipeRating] = useState([])

    useEffect(() => {
        fetchUser()
 
    },[])

    useEffect(() => { 
       
        const handleRecipeRating = async () => {
        const res = await recipeApi.getRecipeRating(recipe.id)
        setRecipeRating(res.data)
        }
        if (recipe?.id) handleRecipeRating()

    },[recipe.id])

    useEffect(() => {
        if (authUser) {
            fetchAllFav()
            
        }
    }, [authUser])

    useEffect(() => {
        if (userFav.find(el => el.recipeId === recipe.id)) {
            setIsUserFav(true)
        }
    }, [userFav])

    const handleAddToFav = () => {
        addToFav(authUser.id, recipe.id)
        setIsUserFav(true)
    }

    const handleCountRating = (field) => {
        if (recipeRating) {
            return recipeRating.reduce((acc,el) => {
            if(el[field]) acc+=1
            return acc
        },0)
    }
    }
    
    const handleClickRatingButton = async (field) => {
        const curRating = recipeRating.find(el => el.userId === authUser.id) || {}
        const body = {
            isEasyToFollow: curRating.isEasyToFollow || false,
            isTasteGood: curRating.isTasteGood || false,
            [field]: !curRating[field],
        };
        await modifyRating(authUser.id, recipe.id, body)
        const res = await recipeApi.getRecipeRating(recipe.id)
        setRecipeRating(res.data)
        }




    

    return <div className="flex min-h-[50vh]">
    <div className="flex flex-col gap-2 w-3/5 pr-8 justify-between">
        <h1 className="text-3xl font-semibold">{recipe?.name}</h1>
        <div></div>
        <h2>โดย คุณ {recipe?.user?.displayName}</h2>
        <h2>เวลาเตรียม {recipe?.preparedTime} นาที</h2>
        <p>{recipe?.description}</p>
        <p className="font-semibold">เป็นเมนูโปรดของ <span>{handleCountRating('isFavorite')}</span> คน</p>
        <div className="flex gap-2">
        {isUserFav? 
        <Button disabled color="disabled">เมนูนี้เป็นเมนูโปรดของคุณ</Button> :
        <Button textColor='white'
        onClick={handleAddToFav}
        >เพิ่มในเมนูโปรด</Button> 
    }
        <RatingButton tooltip='ทำตามง่าย'
        onClick={()=>handleClickRatingButton('isEasyToFollow')}
        ><img className="max-w-10" src={clocheLogo} /><span className="text-xl font-semibold">
            {handleCountRating('isEasyToFollow')}
            </span></RatingButton>
        <RatingButton tooltip='รสชาติดี'
        onClick={()=>handleClickRatingButton('isTasteGood')}
        ><img className="max-w-10" src={plateLogo} /><span className="text-xl font-semibold">
            {handleCountRating('isTasteGood')}
            </span></RatingButton>
        </div>
        
    </div>
    <div className="flex w-2/5">
    <div
        className="flex-auto"
        style={{
            backgroundImage: `url(${recipe?.picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
    }}
        ></div>
    </div>
    </div>
}