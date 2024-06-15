const colorMap = {
    primary: 'bg-orange-500 hover:bg-orange-600',
    transparent: '',
    red: 'bg-red-500 hover:bg-red-600',
    green: 'bg-emerald-400 hover:bg-emerald-500'
}

const textColorMap = {
    primary: 'text-black',
    white: 'text-white'
}

const widthMap = {
    full: 'w-full',
    40: 'w-40'
}



export default function Button ({children,color='primary',textColor='primary',width,onClick}) {
    return <button
    className={`px-2 py-2 ${colorMap[color]} ${widthMap[width]} ${textColorMap[textColor]} rounded-md grow`}
    onClick={onClick}
    >
        {children}
    </button>
}