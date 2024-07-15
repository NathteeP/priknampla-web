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
import PulseDot from "../components/PulseDot";
import { toast } from "sonner";

export default function CreateRecipePage () {

const [pictures, setPictures] = useState(null)
const [submitLoading, setSubmitLoading] = useState(false)
const {
    recipeBody, 
    setRecipeBody, 
    recipeError,
    setRecipeError,
    validateRecipeBody,
} = useContext(CreateRecipeContext)
const navigate = useNavigate()

const sanitizeRecipeBody = recipeBody => {
const sanitizedObj = cloneDeep(recipeBody)

for (let i in sanitizedObj.ingredientsTable) {
    const el = sanitizedObj.ingredientsTable[i]
    if (el) {
    delete el.tableKey
    for (let j in el.ingredient) {
        el.ingredient[j] 
        ? delete el.ingredient[j].ingredientsKey
        : el.ingredient.splice(j,1)
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

const checkForErrors = (errorObj) => {
    if (typeof errorObj === 'string') {
        return errorObj !== "";
    }
    if (Array.isArray(errorObj)) {
        return errorObj.some(item => checkForErrors(item));
    }
    if (typeof errorObj === 'object') {
        return Object.values(errorObj).some(val => checkForErrors(val));
    }
    return false;
}


const handleClickSaveRecipe = async () => {
        setSubmitLoading(true)
        const errors = validateRecipeBody(recipeBody)
        setRecipeError(errors)

        const hasErrors = checkForErrors(errors)

        if (hasErrors) {
            console.log("Form has errors")
            if (!pictures) {
                console.log("No image uploaded");
                setRecipeError(prev => ({ ...prev, picture: "กรุณาอัปโหลดรูปภาพ" }));
            }
            toast.error('ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบเพิ่มเติม')
            setSubmitLoading(false)
            return
        }


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
        setSubmitLoading(false)
        toast.success('เพิ่มสูตรอาหารเรียบร้อย')
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
<button
    className={`px-2 py-2 bg-emerald-400 hover:bg-emerald-500 w-full font-semibold text-xl rounded-md grow flex justify-center items-center h-[52px]`}
    onClick={handleClickSaveRecipe}
    > {submitLoading? <PulseDot /> : "บันทึกสูตรอาหาร"}
    </button>
</div>
)
}