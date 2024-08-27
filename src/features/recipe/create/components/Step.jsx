import ClickableInput from "./ClickableInput"
import Textarea from "../../../../components/Textarea"
import { useContext } from "react"
import { CreateRecipeContext } from "../CreateRecipeContext"


export default function Step ({stepKey, header, description, error}) {

const {setRecipeBody, isEditForm} = useContext(CreateRecipeContext)

const handleChangeInput = e => {
    setRecipeBody(prev => {
        const newValue = {...prev}
        newValue.step[stepKey-1][e.target.name] = e.target.value
        return newValue
    })
}

const deleteStep = () => {
    setRecipeBody(prev => {
        const newValue = { ...prev }
        if (isEditForm) {
            newValue.step.splice(stepKey - 1, 1)
        } else {
            newValue.step[stepKey-1] = null
        }
        return newValue
})
}

    return <div className="flex flex-col gap-1">
    <div className="flex items-center gap-4 ml-2 relative">
        <ClickableInput 
        name='header'
        value={header} 
        onChange={handleChangeInput} 
        error={error?.header}
        />
        <button className="absolute right-2 top-2 text-2xl"
        onClick={deleteStep}
        >&#10005;</button>
    </div>
    <div className="ml-[-20px]">
    <Textarea name='description' placeholder="คำบรรยายขั้นตอน" 
    rows={2}
    value={description} 
    onChange={handleChangeInput}
    error={error?.description}
    />
    </div>
    </div>
    
    
}