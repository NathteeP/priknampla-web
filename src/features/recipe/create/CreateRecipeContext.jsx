import { createContext } from "react";
import recipeBodyExample from "./recipe-body-example.json";
import { useState } from "react";
import { cloneDeep } from "lodash";

export const CreateRecipeContext = createContext()

export default function CreateRecipeContextProvider({children}) {
const initState = cloneDeep(recipeBodyExample)
const [recipeBody, setRecipeBody] = useState(initState)


const contextValue = {
    recipeBody,
    setRecipeBody
}

return <CreateRecipeContext.Provider
value = {contextValue}>
    {children}
</CreateRecipeContext.Provider>

}