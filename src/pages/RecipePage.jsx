import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import recipeApi from "../apis/recipe";
import Button from "../components/Button";
import IngredientsTableRender from "../features/recipe/components/IngredientsTableRender";
import NotFoundPage from "./NotFoundPage";

export default function RecipePage () {
const {recipeId} = useParams()
const [recipe, setRecipe] = useState({})

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await recipeApi.getRecipe(recipeId)
                setRecipe(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchRecipe()

    },[recipeId])

    return <>
    {recipe? 
    <div>
        <div>
        <div>
            <h1>{recipe?.name}</h1>
            <h2>โดย คุณ {recipe?.user?.displayName}</h2>
            <h2>เวลาเตรียม {recipe?.preparedTime} นาที</h2>
            <p>{recipe?.description}</p>
            <p></p>
            <div>
            <Button>เพิ่มในเมนูโปรด</Button>
            <div role="button">ทำตามง่าย</div>
            <div role='button'>รสชาติดี</div>
            </div>
            
        </div>
        <div>
            <img src={recipe?.picture} alt={recipe?.name} />
        </div>
        </div>
        <div>
        <IngredientsTableRender
        recipe={recipe}
        />
        </div>
        <div>
        step block
        </div>
    </div> : <NotFoundPage />
    
}
    </>
}