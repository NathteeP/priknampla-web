import { useState } from "react"
import Input from "../../../../components/Input"

export default function ClickableInput ({placeholder,name,value,onChange,label,isMainInput=false}) {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div 
        onClick={() => setIsEdit(true)}
        onKeyDown={e => e.key === 'Enter' || e.key === 'Escape' ? setIsEdit(false): undefined}
        className={`${isMainInput? 'col-span-3':'w-full'} flex items-center h-12`}
        >
            {isEdit? 
            <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            textCenter='left'
            label={label}
            /> :
           <p className="ml-2">{value}</p>
        }


        </div>
    )
}