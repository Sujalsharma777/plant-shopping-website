import React from "react";
import { useFilterContext } from "../context/FilterContext";

const Searching = () => {
    const { filter: { text }, updateFilterValue } = useFilterContext();

    return (
        <div className="border-2 border-black w-[300px] p-2 rounded">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="text"
                    value={text}
                    onChange={updateFilterValue}
                    className="w-full p-2 border rounded"
                    placeholder="Search products..."
                />
            </form>
        </div>
    );
};

export default Searching;
