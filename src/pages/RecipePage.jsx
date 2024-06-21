import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import recipeApi from "../apis/recipe";
import NotFoundPage from "./NotFoundPage";
import RecipeMainContent from "../features/recipe/components/RecipeMainContent";
import IngredientsRender from "../features/recipe/components/IngredientsRender";
import StepRender from "../features/recipe/components/StepRender";

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
    <div className="p-8">
        <RecipeMainContent 
        recipe={recipe}
        />
        <div>
        <IngredientsRender
        ingredientsTable={recipe.ingredientsTable}
        />
        </div>
        <div>
        <StepRender step={recipe.step} />
        </div>
    </div> : <NotFoundPage />
    
}
    </>
}