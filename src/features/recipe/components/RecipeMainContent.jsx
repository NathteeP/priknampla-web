import Button from "../../../components/Button";
import RatingButton from "./RatingButton";
import clocheLogo from "../../../assets/cloche.svg"
import plateLogo from "../../../assets/plate.svg"
import { useContext } from "react";
import { FavContext } from "../../../contexts/FavContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";

export default function RecipeMainContent ({recipe}) {

    const {addToFav, fetchAllFav, userFav} = useContext(FavContext)
    const {authUser} = useContext(AuthContext)
    const [isUserFav, setIsUserFav] = useState(false)

    useEffect(() => {
        fetchAllFav()
        if (userFav.find(el => el.recipeId = recipe.id)) {
            setIsUserFav(true)
        }
    },[recipe])

    return <div className="flex min-h-[50vh]">
    <div className="flex flex-col gap-2 w-3/5 pr-8 justify-between">
        <h1 className="text-3xl font-semibold">{recipe?.name}</h1>
        <div></div>
        <h2>โดย คุณ {recipe?.user?.displayName}</h2>
        <h2>เวลาเตรียม {recipe?.preparedTime} นาที</h2>
        <p>{recipe?.description}</p>
        <p></p>
        <div className="flex gap-2">
        {isUserFav? 
        <Button textColor='white'
        onClick={()=>addToFav(authUser.id, recipe.id)}
        >เพิ่มในเมนูโปรด</Button> :
        <Button disabled color="disabled">เมนูนี้เป็นเมนูโปรดของคุณ</Button> 
        
    }
        <RatingButton tooltip='ทำตามง่าย'><img className="max-w-10" src={clocheLogo} /><span className="text-xl font-semibold">5</span></RatingButton>
        <RatingButton tooltip='รสชาติดี'><img className="max-w-10" src={plateLogo} /><span className="text-xl font-semibold">5</span></RatingButton>
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