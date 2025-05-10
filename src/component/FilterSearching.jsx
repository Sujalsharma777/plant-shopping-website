import React from "react";
import { useFilterContext } from "../context/FilterContext";

const searching = () => {
    const { filter: { text }, updateFilterValue } = useFilterContext()
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text"
                    name="text"
                    value={text}
                    onChange={updateFilterValue} />
            </form>
        </div>
    );
};

export default searching;
