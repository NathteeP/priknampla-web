import { useState } from "react";
import IngredientsTable from "./IngredientsTable";
import Button from "../../../../components/Button";

const emptyTable = {
    tableId: '',
    recipeId: '',
    header: ''
}

const initTable = [
    {...emptyTable, tableId:1}
]


export default function IngredientForm () {

const [table, setTable] = useState(initTable)

const setTableHeader = (tableId,header) => {
    setTable(prev => {
        const newTableValue = [...prev]
        newTableValue[tableId-1].header = header
        return newTableValue
    })

}

    const createTable = () => {
    setTable(prev => {
        const newTableValue = [...prev]
        newTableValue.push({...emptyTable, tableId:table.length+1})
        return newTableValue
    })
}

    const deleteTable = tableId => {
        setTable(prev => {
            const newTableValue = [...prev]
            newTableValue[tableId-1] = null
            return newTableValue
        })
    }
        

    return <>
    <h1 className="text-center text-2xl">วัตถุดิบหรืออุปกรณ์</h1>
    {table.map(el => el? <IngredientsTable 
            header={el.header} 
            tableId={el.tableId} 
            key={el.tableId} 
            setTableHeader={setTableHeader}
            deleteTable={deleteTable} 
            />: null )}
    <div className="bg-lime-200 rounded-lg p-4 flex flex-col gap-4">
        <Button color='green' width='full'
        onClick={createTable}
        >เพิ่มตารางใหม่</Button>
    </div>
    </>

    
}