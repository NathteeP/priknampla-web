import { useState } from "react";
import Input from "../../../../components/Input";
import Textarea from "../../../../components/Textarea";

const initRecipeInput = {
    name: '',
    preparedTime: '',
    description: '',
    picture: ''
}

export default function MainRecipeForm () {
const [input,setInput] = useState(initRecipeInput)
const [pictures, setPictures] = useState(null)
const [pictureNum, setPictureNum] = useState(0)

const handleClickPicture = () => {
    if (pictureNum + 1 < pictures.length) setPictureNum(prev => prev+1)
    else setPictureNum(0)
}

const handleChangeInput = e => {
    setInput({...input, [e.target.name]: e.target.value})
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
    className={`${pictures.length > 1 ? "cursor-pointer" : ""}`}
    onClick={handleClickPicture}
    src={URL.createObjectURL(pictures[pictureNum])} /> : null}
    <input type="file" 
    className="w-full"
    onChange={e => setPictures(e.target.files)}
    multiple
    accept="image/*"
    name="picture"
    id="picture"
    ></input>
</div>
</div>
    )
}