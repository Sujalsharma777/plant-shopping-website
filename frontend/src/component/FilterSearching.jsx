import React from "react";
import { useFilterContext } from "../context/FilterContext";

const searching = () => {
    const { filter: { text }, updateFilterValue } = useFilterContext()
    return (
        <div className="border-2 border-black w-50"  >
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text"
                    name="text"
                    value={text}
                    onChange={updateFilterValue}
                    placeholder = "SEARCH" />
            </form>
        </div>
    );
};

export default searching;
