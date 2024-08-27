import { useState } from "react";
import IngredientForm from "../features/recipe/create/components/IngredientForm";
import MainRecipeForm from "../features/recipe/create/components/MainRecipeForm";
import StepForm from "../features/recipe/create/components/StepForm";
import { useContext } from "react";
import recipeBodyExample from "../features/recipe/create/recipe-body-example.json";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import recipeApi from "../apis/recipe";
import { CreateRecipeContext } from "../features/recipe/create/CreateRecipeContext";
import PulseDot from "../components/PulseDot";
import { toast } from "sonner";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";

export default function EditRecipePage () {
    const [pictures, setPictures] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const {recipeId} = useParams()
    const {
        recipeBody, 
        setRecipeBody, 
        recipeError,
        setRecipeError,
        setIsEditForm
    } = useContext(CreateRecipeContext)
    const navigate = useNavigate()
    
        useEffect(() => {
            setIsEditForm(true)
            const fetchRecipe = async () => {
                try {
                    const res = await recipeApi.getRecipe(recipeId)
                    setRecipeBody(res.data)
                }
                catch (err) {
                    console.log(err)
                }
            }
            fetchRecipe()
    
        },[recipeId])


    const sanitizeRecipeBody = recipeBody => {
        const sanitizedObj = cloneDeep(recipeBody)

        
        for (let i = sanitizedObj.ingredientsTable.length - 1; i >= 0; i--)  {
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
            
        for (let i = sanitizedObj.step.length - 1; i >= 0; i--) {
            sanitizedObj.step[i]
            ? delete sanitizedObj.step[i].stepKey
            : sanitizedObj.step.splice(i,1)
        }
        sanitizedObj.preparedTime = +sanitizedObj.preparedTime
        
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


        try{
        const sanitizedObj = sanitizeRecipeBody(recipeBody)
        console.log(sanitizedObj)
        const createRes = await recipeApi.editRecipe(sanitizedObj.id, sanitizedObj)

        // const formData = new FormData()
        // formData.append('picture', pictures)
        // formData.append('recipeId', recipeId)
        // await recipeApi.uploadImage(formData)

        const initState = cloneDeep(recipeBodyExample)
        setRecipeBody(initState)
        setSubmitLoading(false)
        toast.success('แก้ไขสูตรอาหารเรียบร้อย')
        navigate(`/recipe/${recipeId}`)
    } catch (err) {
        console.log(err)
    }
}
    
    return (
        <div className="px-8 flex flex-col gap-4">
        <h1 className="text-3xl text-center font-semibold">แก้ไขสูตรอาหาร</h1>
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
