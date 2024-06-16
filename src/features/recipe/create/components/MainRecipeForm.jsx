import { useState } from "react";
import Input from "../../../../components/Input";
import Textarea from "../../../../components/Textarea";
import { useContext } from "react";
import { CreateRecipeContext } from "../CreateRecipeContext";


export default function MainRecipeForm ({pictures, setPictures}) {

const {recipeBody, setRecipeBody} = useContext(CreateRecipeContext)

const input = recipeBody?.recipe


const handleChangeInput = e => {
    setRecipeBody(prev => {
        const newValue = {...prev}
        newValue.recipe[e.target.name] = e.target.value
        return newValue
    })
    
}

    return (
        <div className="bg-lime-200 rounded-lg p-4 flex flex-col gap-4">
<Input textCenter="left" label="ชื่อสูตรอาหาร" name='name'
value={input.name} onChange={handleChangeInput}
/>
<div className="flex items-center gap-2">
<Input textCenter="left" label='เวลาเตรียมการ' name='preparedTime' 
value={input.preparedTime} onChange={handleChangeInput}
/>
<span className="w-1/2 text-center relative top-3">นาที</span>
</div>
<Textarea label="คำบรรยายเมนู" name='description'
value={input.description} onChange={handleChangeInput}
/>
<div>
    <label htmlFor="picture">ภาพประกอบ</label>
    {pictures? <img 
    src={URL.createObjectURL(pictures)} /> : null}
    <input type="file" 
    className="w-full"
    onChange={e => setPictures(e.target.files[0])}
    accept="image/*"
    name="picture"
    id="picture"
    ></input>
</div>
</div>
    )
}