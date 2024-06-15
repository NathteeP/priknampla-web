import { useState } from "react";
import SearchBar from "../features/recipe/components/SearchBar";

export default function LandingPage() {

    const [searchResult, setSearchResult] = useState([])
    return (
        <div style={{height: 'calc(100vh - 92px)'}} 
        className="w-screen flex flex-col justify-center items-center gap-8">
            <h1 className="text-5xl font-semibold">
                แบ่งปันสูตรอาหารของคุณ
            </h1>
            <p className="text-2xl">กว่า .... สูตรอาหารทั่วโลก จากชุมชนของเรา</p>
            <SearchBar
            setSearchResult={setSearchResult}
            />

            <div></div>


        </div>
    )
}