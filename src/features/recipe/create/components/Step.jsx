import { useState } from "react"
import ClickableInput from "./ClickableInput"

const initInput = {
    header: 'คลิกเพื่อแก้ไข',
    description: '',
}

export default function Step ({stepNum}) {
const [stepInput, setStepInput] = useState(initInput)

const handleChangeInput = e => {
    setStepInput(prev => {
        return {...prev,
            [e.target.name]: e.target.value
        }
    })
}

    return <div className="flex items-center gap-4 ml-2 relative">
        <span>{stepNum}.</span>
        <ClickableInput name='header'
        value={stepInput.header} onChange={handleChangeInput} />
        <button className="absolute right-2 top-2 text-2xl"
        onClick=''
        >&#10005;</button>
    </div>
    
}