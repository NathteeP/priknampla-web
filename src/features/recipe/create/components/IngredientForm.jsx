import IngredientsTable from "./IngredientsTable";
import Button from "../../../../components/Button";
import { useContext } from "react";
import { CreateRecipeContext } from "../CreateRecipeContext";


export default function IngredientForm () {

const {recipeBody, setRecipeBody} = useContext(CreateRecipeContext)

const emptyTable = {
    "header": "",
    "tableKey": 1,
    "ingredient": [
        {
            ingredientsKey: 1,
            name: 'คลิกเพื่อแก้ไข',
            amount: '1',
            unit: 'ช้อนโต๊ะ'
        },
        {
            ingredientsKey: 2,
            name: 'วัตถุดิบ 2',
            amount: '1',
            unit: 'ช้อนโต๊ะ'
        }
    ]
}


const table = recipeBody?.ingredientsTable

const setTableHeader = (tableKey,header) => {
    setRecipeBody(prev => {
        const newTableValue = {...prev}
        newTableValue.ingredientsTable[tableKey-1].header = header
        return newTableValue
    })

}

const createTable = () => {
    setRecipeBody(prev => {
        const newTableValue = {...prev}
        newTableValue.ingredientsTable.push({...emptyTable, tableKey:table.length+1})
        return newTableValue
    })
}

    const deleteTable = tableKey => {
        setRecipeBody(prev => {
            const newTableValue = {...prev}
            newTableValue.ingredientsTable[tableKey-1] = null
            return newTableValue
        })
    }
        

    return <>
    <h1 className="text-center text-2xl">วัตถุดิบหรืออุปกรณ์</h1>
    {table?.map(el => el? <IngredientsTable 
            header={el.header} 
            tableKey={el.tableKey} 
            key={el.tableKey} 
            setTableHeader={setTableHeader}
            deleteTable={deleteTable} 
            />: null )}
    <div className="bg-lime-200 rounded-lg p-4 flex flex-col gap-4">
        <Button color='brown' width='full'
        onClick={createTable}
        >เพิ่มตารางใหม่</Button>
    </div>
    </>

    
}