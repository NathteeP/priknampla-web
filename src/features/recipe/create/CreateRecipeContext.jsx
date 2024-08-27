import { createContext } from "react";
import recipeBodyExample from "./recipe-body-example.json";
import { useState } from "react";
import { cloneDeep } from "lodash";

export const CreateRecipeContext = createContext()

const initError =  {
    "recipe":
        {
        "name": "",
        "description": "",
        "preparedTime": ""
        } ,
    "ingredientsTable":[
        {
            "header": "",
            "tableKey": 1,
            "ingredient": [
                {
                    "ingredientsKey": 1,
                    "name": "",
                    "amount": "",
                    "unit": ""
                },
                {
                    "ingredientsKey": 2,
                    "name": "",
                    "amount": "",
                    "unit": ""
                }
            ]
        }
    ],
    "step":[
        {
            "stepKey": 1,
            "header": "",
            "description": ""
        }
    ]
        
    }

export default function CreateRecipeContextProvider({children}) {
const initState = cloneDeep(recipeBodyExample)
const [recipeBody, setRecipeBody] = useState(initState)
const [recipeError, setRecipeError] = useState(initError)
const [isEditForm, setIsEditForm] = useState(false)

const validateRecipeBody = (recipeBody) => {
    const errors = cloneDeep(initError);

    // Validate recipe name, description, and preparedTime
    if (!recipeBody.recipe?.name) errors.recipe.name = "กรุณาใส่ชื่อสูตรอาหาร";
    if (!recipeBody.recipe?.description) errors.recipe.description = "กรุณาใส่คำอธิบาย";
    if (!recipeBody.recipe?.preparedTime || isNaN(recipeBody.recipe?.preparedTime)) 
        errors.recipe.preparedTime = "กรุณาใส่เวลาเตรียม (ตัวเลข)";

    // Validate ingredients
    recipeBody.ingredientsTable.forEach((table, tableIndex) => {
        if (!table.header) errors.ingredientsTable[tableIndex].header = "กรุณาใส่ชื่อหัวข้อ";
    });


    // Validate steps
    recipeBody.step.forEach((step, stepIndex) => {
        if(step){
            if (!step.header) errors.step[stepIndex].header = "กรุณาใส่ชื่อขั้นตอน";

        }
    });

    return errors;
}



const contextValue = {
    recipeBody,
    setRecipeBody,
    recipeError,
    setRecipeError,
    validateRecipeBody,
    isEditForm,
    setIsEditForm
}

return <CreateRecipeContext.Provider
value = {contextValue}>
    {children}
</CreateRecipeContext.Provider>

}