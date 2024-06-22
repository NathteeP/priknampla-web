import { useState } from "react"

export default function RatingButton ({children,tooltip,onClick}) {
    const [isHovered, setIsHovered] = useState(false)
    return (
    <div role="button" className="bg-gray-300 hover:bg-gray-400 rounded-md flex items-center p-2 gap-3 pr-4 relative"
    onMouseOver={()=>setIsHovered(true)} onMouseOut={() => setIsHovered(false)}
    onClick={onClick}
    >
        {isHovered ? <div className="absolute bg-gray-800 text-white p-2 rounded-md bottom-16 right-1">{tooltip}
        <div className="absolute w-0 h-0 border-l-8 border-r-8 border-t-[16px] right-8 border-transparent border-t-gray-800"></div>
        </div> : null }
        
        {children}</div>
    )
}