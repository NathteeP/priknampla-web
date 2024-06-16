import Step from "./Step";
import Button from "../../../../components/Button";
import { useContext } from "react";
import { CreateRecipeContext } from "../CreateRecipeContext";

const emptyStep = {
    "stepKey": 1,
    "header": "ขั้นตอนการทำอาหาร",
    "description": ""
}


export default function StepForm () {

const {recipeBody, setRecipeBody} = useContext(CreateRecipeContext)
const steps = recipeBody?.step

const addStep = () => {
    setRecipeBody(prev => {
    const newValue = {...prev}
    newValue.step.push({...emptyStep, stepKey:steps.length+1})
    return newValue
    })
}

    return <>
    <h1 className="text-center text-2xl">ขั้นตอนการทำอาหาร</h1>
    <div className="bg-lime-200 rounded-lg p-4 flex flex-col gap-4">
    <ol className="list-decimal pl-5">
        {steps?.map(el => el ? (<li key={el.stepKey}>
            <Step
            stepKey={el.stepKey}
            header={el.header}
            description={el.description}
            /> 
        </li>) : null)}
    </ol>
    <Button color='primary' width='full'
        onClick={addStep}
        >เพิ่มขั้นตอน</Button>
    </div>

    </>
    
    
}