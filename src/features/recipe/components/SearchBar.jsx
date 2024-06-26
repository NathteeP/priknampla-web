
import Button from '../../../components/Button'
import searchicon from '../../../assets/searchicon.svg'
import recipeApi from '../../../apis/recipe'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { SearchContext } from '../../../contexts/SearchContext'

export default function SearchBar ({placeholder,width}) {
    const navigate = useNavigate()
    const {searchInput, setSearchInput, setSearchResult} = useContext(SearchContext)

    const handleSearch = async e => {
        e.preventDefault()
        const res = await recipeApi.search(searchInput?.trim())
        setSearchResult(res.data)
        navigate(`/recipe?search=${searchInput?.trim()}`)
    }


    return (
    <form onSubmit={handleSearch}
    className={`flex min-w-[500px] w-3/5 items-center gap-3 h-12 ${width === 'full' ? "w-full":''}`} >
    <img className="w-5 absolute ml-2" src={searchicon} alt='searchicon' />
    <input id='search' className="w-full border-[1px] pl-8 pr-2 py-3 rounded-md border-gray-400 outline-orange-900 h-4/5"
    value={searchInput} onChange={e => setSearchInput(e.target.value)}
    placeholder={placeholder}
    />
    <Button width={40}
    >ค้นหาสูตรอาหาร</Button>
</form>
    )
}