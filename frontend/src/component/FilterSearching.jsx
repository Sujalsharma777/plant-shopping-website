import React from "react";
import { useFilterContext } from "../context/FilterContext";

const Searching = () => {
    const {
        filter: { text, plantType },
        all_products,
        updateFilterValue,
    } = useFilterContext();

    const getUniqueData = (data, property) => {
        let newVal = data.map((item) => curElem[property]);
        return ["All", ...new Set(newVal)];
    };

    const categoryOnlyData = getUniqueData(all_products, "plantType");

    return (
        <>
            <div className="border-2 border-black w-50">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        name="text"
                        value={text}
                        onChange={updateFilterValue}
                        placeholder="SEARCH"
                    />
                </form>
            </div>

            <div className="filter-Category">
                <h3>Category</h3>
                <div>
                    {categoryOnlyData.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            name="plantType"
                            value={plantType}
                            onClick={updateFilterValue}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Searching