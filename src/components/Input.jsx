const outlineMap = {
    primary: "outline-orange-900",
    error: "outline-red-500"
}

const textCenterMap = {
    center: "text-center",
    left: ""
}


export default function Input ({placeholder,type,value,error,onChange,name,textCenter="center"}) {
   return <div className="w-full">
   <input placeholder={placeholder} 
    type={type}
    className={`${textCenterMap[textCenter]} w-full border-[1px] ${error?'border-red-400':'border-gray-400'} py-3 rounded-md px-2
    ${outlineMap[error?'error':'primary']}`}
    value={value}
    onChange={onChange}
    name={name}
    />
    {error? <small className="text-red-500">{error}</small>: null}
   </div>
} 