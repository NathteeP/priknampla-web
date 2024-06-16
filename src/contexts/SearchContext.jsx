import { useState } from "react";
import { createContext } from "react";

export const SearchContext = createContext()

export default function SearchContextProvider({children}) {
    const [searchInput, setSearchInput] = useState('')

    const contextValue = {searchInput, setSearchInput}

    return <SearchContext.Provider
        value={contextValue}>
            {children}
        </SearchContext.Provider>
}