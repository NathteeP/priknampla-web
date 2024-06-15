import Step from "./Step";

export default function StepForm () {
    return <>
    <h1 className="text-center text-2xl">ขั้นตอนการทำอาหาร</h1>
    <div className="bg-lime-200 rounded-lg p-4 flex flex-col gap-4">
    <Step stepNum={1}/>
    </div>
    
    </>
    
    
}