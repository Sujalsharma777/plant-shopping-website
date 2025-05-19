import React from 'react'
import { useFilterContext } from '../context/FilterContext'

export default function FilterSearching() {
    // Get the 'text' filter value and update function from the context
    const { filter: { text }, updateFilterValue } = useFilterContext()

    return (
        <div className="filter-search">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="text"
                    value={text}
                    className='w-70 h-10 p-3 border  rounded-2xl flex justify-center text-md font-medium hover:border-green-800  active:border-green-800 active:border-2 '
                    onChange={updateFilterValue}
                    placeholder="Search..."
                    autoComplete="true"
                />
            </form>
        </div>
    )
}