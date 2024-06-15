export default function Textarea ({rows=4,name,label,placeholder,value,onChange}) {
    return (
        <div className="w-full">
            {label? <label htmlFor={name}>{label}</label> : null}
            <textarea rows={rows} name={name} id={name} placeholder={placeholder}
            value={value} onChange={onChange}
            className="w-full rounded-md border border-gray-400 outline-orange-900 px-2 py-3 resize-none"
            ></textarea>
        </div>
    )
}