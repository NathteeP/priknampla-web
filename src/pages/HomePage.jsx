import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useState } from "react"
import SearchBar from "../features/recipe/components/SearchBar"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

export default function HomePage () {
    const {authUser} = useContext(AuthContext)

    const [searchResult, setSearchResult] = useState([])

    const navigate = useNavigate()

    return (
        <div className="px-6">
        <h1>สวัสดี คุณ {authUser.displayName}</h1>
        <div
        className="w-screen flex flex-col items-center gap-8">
            <SearchBar
            setSearchResult={setSearchResult}
            />
            <div className="flex flex-col items-center">
                <h1>มีสูตรอาหารเด็ด ๆ อยู่ใช่มั้ย?</h1>
                <h1>อย่าเก็บไว้คนเดียว มีอีกหลายคนรอชิมอยู่นะ!</h1>
                <Button width='full'
                onClick={() => navigate('/create')}
                >เริ่มเขียนสูตรอาหาร</Button>
            </div>

        </div>
        </div>
    )
}