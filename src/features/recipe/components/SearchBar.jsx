
import Button from '../../../components/Button'
import searchicon from '../../../assets/searchicon.svg'
import { useState } from 'react'
import recipeApi from '../../../apis/recipe'

export default function SearchBar ({setSearchResult}) {
    const [searchInput, setSearchInput] = useState('')

    const handleSearch = async e => {
        e.preventDefault()
        const res = await recipeApi.search(searchInput)
        setSearchResult(res.data)
    }

    return (
    <form onSubmit={handleSearch}
    className="flex min-w-[500px] w-3/5 items-center gap-3">
    <img className="w-5 absolute ml-2" src={searchicon} alt='searchicon' />
    <input id='search' className="w-full border-[1px] pl-8 py-3 rounded-md px-2 border-gray-400 outline-orange-900 h-4/5"
    value={searchInput} onChange={e => setSearchInput(e.target.value)}
    />
    <Button width={40}
    >ค้นหาสูตรอาหาร</Button>
</form>
    )
}