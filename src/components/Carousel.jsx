import { useState, useEffect } from "react"
import './Carousel.css'

export default function Carousel({ items, onNavigate }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState("right")


    const nextItem = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }

    const prevItem = () => {
        setDirection("left");
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    }


    useEffect(() => {
        const interval = setInterval(nextItem, 10000) 
        return () => clearInterval(interval) 
    }, [items.length]);

    if (items.length === 0) return null

    const currentItem = items[currentIndex]

    console.log(currentItem)

    return (
        <>
        <div className="relative w-full h-[320px] flex justify-center items-center">
            <button onClick={prevItem} className="relative left-8 z-10 p-2 bg-gray-800/50 text-white rounded-full">
                {"<"}
            </button>
            <div
                key={currentItem.id}
                className={`w-1/2 max-w-[600px] h-full rounded-md cursor-pointer slide-${direction}`}
                onClick={() => onNavigate(currentItem.id)}
                style={{
                    backgroundImage: `url(${currentItem.picture})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
            </div>
            <button onClick={nextItem} className="relative right-8 z-10 p-2 bg-gray-800/50 text-white rounded-full">
                {">"}
            </button>
        </div>
        <h2 className="text-xl font-semibold">{currentItem.name}</h2>
        </>
    )
}