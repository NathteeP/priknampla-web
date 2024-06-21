import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useEffect } from "react";
import { useState } from "react";

export default function RecipeBlock ({header,owner,picture,preparedTime,addFavorite,hasDelete,deleteFavorite,isUserFav,recipeId}) {
    const navigate = useNavigate()
    const [isFavorite, setIsFavorite] = useState(false)

    const handleIsFavorite = () => {
       if (isUserFav) setIsFavorite(true)
    }

    useEffect(() => {
        handleIsFavorite()
    },[])

    return <div className=" flex rounded-lg h-60 p-4 relative bg-amber-100">
        <div
        className="w-1/2 rounded-md"
        style={{
            backgroundImage: `url(${picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
    }}
        >
        </div>
        <div className="flex flex-col justify-between p-2 pl-4 w-1/2">
            <div 
            className="flex flex-col gap-2"
            >
            <h2>{header}</h2>
            {hasDelete? 
            <button className="absolute right-2 top-2 text-xl"
            onClick={deleteFavorite}
            >&#10005;</button>:
            null}
            <p>โดย คุณ{owner}</p>
            </div>
            <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
                <span>เวลาเตรียม</span>
                <span>{preparedTime}</span>
                <span>นาที</span>
            </div>
            {isUserFav
            ? <Button textColor='white' width='full' color="red"
            onClick={()=> navigate(`/recipe/${recipeId}`)}
            >ดูสูตรอาหาร</Button> 
            : <Button textColor='white' width='full'
            onClick={addFavorite}
            >เพิ่มในเมนูโปรด</Button>
            }
            </div>
        </div>
    </div>
}