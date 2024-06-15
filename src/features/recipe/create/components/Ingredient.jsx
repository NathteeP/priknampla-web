import { useState } from "react";
import ClickableInput from "./ClickableInput";

const initInput = {
    name: 'คลิกเพื่อแก้ไข',
    amount: '1',
    unit: 'ช้อนโต๊ะ'
}

export default function Ingredient () {
const [ingreInput, setIngreInput] = useState(initInput)

const handleChangeInput = e => {
    setIngreInput(prev => {return {...prev,[e.target.name]:e.target.value}})
}

    return <div className="grid grid-cols-5">
        <ClickableInput isMainInput name='name'
        value={ingreInput.name} onChange={handleChangeInput}
        />
        <ClickableInput name='amount'
        value={ingreInput.amount} onChange={handleChangeInput}
        />
        <ClickableInput name='unit'
        value={ingreInput.unit} onChange={handleChangeInput}
        />
    </div>
}