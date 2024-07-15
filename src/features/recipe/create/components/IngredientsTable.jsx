import Input from "../../../../components/Input";
import Ingredient from "./Ingredient";
import Button from "../../../../components/Button";
import { useContext } from "react";
import { CreateRecipeContext } from "../CreateRecipeContext";

const emptyIngredient =  {
    ingredientsKey: 1,
    name: 'คลิกเพื่อแก้ไข',
    amount: '',
    unit: ''
}

const emptyIngredientError = {
    ingredientsKey: 1,
    name: '',
    amount: '',
    unit: ''
}


export default function IngredientsTable({header,tableKey,setTableHeader,deleteTable,error}) {

const {recipeBody, setRecipeBody, recipeError, setRecipeError} = useContext(CreateRecipeContext)
const ingredients = recipeBody.ingredientsTable[tableKey-1]?.ingredient


const addIngredient = () => {
    setRecipeBody(prev => {
        const newValue = {...prev}
        newValue.ingredientsTable[tableKey-1].ingredient?.push({...emptyIngredient, ingredientsKey:ingredients.length+1})
        return newValue
    })

    setRecipeError(prev => {
        const newErrorValue = { ...prev };
        newErrorValue.ingredientsTable[tableKey - 1].ingredient?.push({ ...emptyIngredientError, ingredientsKey: ingredients.length + 1 });
        return newErrorValue;
    })
}

return     <div className="bg-lime-200 rounded-lg p-4 flex flex-col gap-4 relative">
<button className="absolute right-2 top-2 text-xl"
onClick={()=>deleteTable(tableKey)}
>&#10005;</button>
<Input 
label='ชื่อหัวตาราง' 
textCenter="left" 
name='header'
value={header} 
onChange={e => setTableHeader(tableKey,e.target.value)} 
error={error?.header}
/>
<ul className="flex flex-col gap-1">
    {ingredients?.map((el,i) => el? <li key={el.ingredientsKey}>
        <Ingredient 
        ingredientsKey={el.ingredientsKey}
        name={el.name}
        amount={el.amount}
        unit={el.unit}
        tableKey={tableKey}
        error={error?.ingredient[i]}
        />
    </li> : null)}
</ul>
<Button onClick={addIngredient}
>เพิ่มวัตถุดิบในตาราง</Button>
</div>

}