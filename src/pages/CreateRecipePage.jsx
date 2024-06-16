import { useContext } from "react";
import Button from "../components/Button";
import IngredientForm from "../features/recipe/create/components/IngredientForm";
import MainRecipeForm from "../features/recipe/create/components/MainRecipeForm";
import StepForm from "../features/recipe/create/components/StepForm";
import { CreateRecipeContext } from "../features/recipe/create/CreateRecipeContext";
import recipeBodyExample from "../features/recipe/create/recipe-body-example.json";
import recipeApi from "../apis/recipe";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";
import { useState } from "react";

export default function CreateRecipePage () {

const [pictures, setPictures] = useState(null)
const {recipeBody, setRecipeBody} = useContext(CreateRecipeContext)
const navigate = useNavigate()

const sanitizeRecipeBody = recipeBody => {
const sanitizedObj = cloneDeep(recipeBody)

for (let i in sanitizedObj.ingredientsTable) {
    const el = sanitizedObj.ingredientsTable[i]
    if (el) {
    delete el.tableKey
    for (let i in el.ingredient) {
        el.ingredient[i] 
        ? delete el.ingredient[i].ingredientsKey
        : el.ingredient.splice(i,1)
    }
    }
    else sanitizedObj.ingredientsTable.splice(i,1)
}
    
for (let i in sanitizedObj.step) {
    sanitizedObj.step[i]
    ? delete sanitizedObj.step[i].stepKey
    : sanitizedObj.step.splice(i,1)
}
sanitizedObj.recipe.preparedTime = +sanitizedObj.recipe.preparedTime

return sanitizedObj
}


const handleClickSaveRecipe = async () => {
    try{
        const sanitizedObj = sanitizeRecipeBody(recipeBody)
        const createRes = await recipeApi.create(sanitizedObj)
        const recipeId = createRes.data.step[0].recipeId

        const formData = new FormData()
        formData.append('picture', pictures)
        formData.append('recipeId', recipeId)
        await recipeApi.uploadImage(formData)

        const initState = cloneDeep(recipeBodyExample)
        setRecipeBody(initState)
        navigate(`/recipe/${recipeId}`)
    } catch (err) {
        console.log(err)
    }
}

    return (
<div className="px-8 flex flex-col gap-4">
<h1 className="text-3xl text-center font-semibold">เขียนสูตรอาหารใหม่</h1>
<MainRecipeForm 
pictures = {pictures}
setPictures = {setPictures}
/>
<IngredientForm />
<StepForm />
<Button 
onClick={handleClickSaveRecipe}
color="green" semibold>บันทึกสูตรอาหาร</Button>
</div>
)
}