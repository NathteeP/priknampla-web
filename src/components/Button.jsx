const colorMap = {
    primary: 'bg-orange-500 hover:bg-orange-600',
    transparent: '',
    red: 'bg-red-500 hover:bg-red-600',
    green: 'bg-emerald-400 hover:bg-emerald-500',
    brown: 'bg-amber-800 hover:bg-amber-900 text-white',
    disabled: 'bg-amber-800 text-white cursor-default'
}

const textColorMap = {
    primary: 'text-black',
    white: 'text-white'
}

const widthMap = {
    full: 'w-full',
    40: 'w-40'
}



export default function Button ({children,color='primary',textColor,width,onClick,semibold,disabled}) {
    return <button
    className={`px-2 py-2 ${colorMap[color]} ${widthMap[width]} ${textColorMap[textColor]} ${
        semibold?'font-semibold text-xl':''} ${disabled? 'disabled': ''} rounded-md grow text-center`}
    onClick={onClick}
    >
        {children}
    </button>
}