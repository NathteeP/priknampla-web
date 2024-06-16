import { useContext } from "react";
import ClickableInput from "./ClickableInput";
import { CreateRecipeContext } from "../CreateRecipeContext";


export default function Ingredient ({name, amount, unit, ingredientsKey, tableKey}) {

const {setRecipeBody} = useContext(CreateRecipeContext)

const handleChangeInput = e => {
    setRecipeBody(prev => {
       const newValue = {...prev}
         newValue.ingredientsTable[tableKey-1]
         .ingredient[ingredientsKey-1][e.target.name] = e.target.value
         return newValue
    })
}

const deleteIngredient = () => {
    setRecipeBody(prev => {
        const newValue = {...prev}
        newValue.ingredientsTable[tableKey-1]
        .ingredient[ingredientsKey-1] = null
        return newValue
    })
}

    return <div className="relative">
    <div className="grid grid-cols-5">
        <ClickableInput isMainInput name='name'
        value={name} onChange={handleChangeInput}
        />
        <ClickableInput name='amount'
        value={amount} onChange={handleChangeInput}
        />
        <ClickableInput name='unit'
        value={unit} onChange={handleChangeInput}
        />
    </div>
        <button className="absolute right-2 top-3 text-xl text-red-600"
        onClick={deleteIngredient}
        >&#10005;</button>

    </div>
    
}