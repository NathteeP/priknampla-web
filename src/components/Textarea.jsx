export default function Textarea ({rows=4,name,label,placeholder,value,onChange,error}) {
    return (
        <div className="w-full">
            {label? <label htmlFor={name}>{label}</label> : null}
            <textarea rows={rows} name={name} id={name} placeholder={error ? error : placeholder}
            value={value} onChange={onChange}
            className={`w-full rounded-md border outline-orange-900 px-2 py-3 resize-none ${
                error? 'border-red-500 placeholder-red-500 font-semibold' : 'border-gray-400'
            }`}
            />
        </div>
    )
}